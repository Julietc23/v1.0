import { NextResponse } from "next/server"
import sqlite3 from "sqlite3"
import { open } from "sqlite"

const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"

async function queryDatabase(dbPath: string, sqlQuery: string) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  try {
    const result = await db.all(sqlQuery)
    return result
  } finally {
    await db.close()
  }
}

async function getHuggingFaceResponse(prompt: string) {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()

  if (!Array.isArray(result) || result.length === 0 || !result[0].generated_text) {
    throw new Error("Unexpected response from the model")
  }

  return result[0].generated_text.trim()
}

export async function POST(req: Request) {
  try {
    const { question, databasePath, databaseType } = await req.json()

    // Step 1: Translate natural language to SQL
    const sqlPrompt = `<s>[INST] You are an AI assistant that translates natural language questions into SQL queries. The database type is ${databaseType}. Translate the following question into a SQL query: ${question} [/INST]`
    const sqlResponse = await getHuggingFaceResponse(sqlPrompt)
    const sqlQuery = sqlResponse.split("[/INST]").pop()?.trim() || ""

    if (!sqlQuery) {
      throw new Error("Failed to generate SQL query")
    }

    // Step 2: Execute the SQL query on the database
    const queryResult = await queryDatabase(databasePath, sqlQuery)

    // Step 3: Generate a friendly response
    const friendlyResponsePrompt = `<s>[INST] You are an AI assistant that provides friendly and natural language responses based on database query results. Given the following information, provide a concise and friendly response:

Original question: ${question}
SQL query: ${sqlQuery}
Query result: ${JSON.stringify(queryResult)}

Respond in a friendly and natural way, summarizing the key information from the query result. [/INST]`

    const friendlyResponse = await getHuggingFaceResponse(friendlyResponsePrompt)

    return NextResponse.json({ response: friendlyResponse })
  } catch (error) {
    console.error("Error in database query API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


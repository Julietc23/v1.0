import { NextResponse } from "next/server"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Helper function to open the database
async function openDb(dbPath: string) {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}

// Function to get the schema
async function getSchema(dbPath: string) {
  const db = await openDb(dbPath)
  const tables = await db.all("SELECT name, sql FROM sqlite_master WHERE type='table'")
  await db.close()
  return tables.map((table) => table.sql).join("\n")
}

// Function to execute a query
async function executeQuery(dbPath: string, query: string) {
  const db = await openDb(dbPath)
  const result = await db.all(query)
  await db.close()
  return result
}

export async function POST(req: Request) {
  try {
    const { question, dbPath } = await req.json()

    if (!question || !dbPath) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const schema = await getSchema(dbPath)

    // Get SQL query from OpenAI
    const sqlQueryCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert assistant that responds to natural language questions with SQLite3 queries, based on a database. If the message includes a question, respond in SQLite3 and only return the query necessary to answer the question. Don't return '``\`', 'sql', or 'sqlite3'. Just the SQL query. You must respect the structure and table names in your queries 100%. The database schema is: ${schema}.`,
        },
        { role: "user", content: question },
      ],
      temperature: 0,
    })

    const sqlQuery = sqlQueryCompletion.choices[0].message.content

    if (!sqlQuery) {
      throw new Error("Failed to generate SQL query")
    }

    // Execute the query
    const queryResult = await executeQuery(dbPath, sqlQuery)

    // Get friendly response from OpenAI
    const stream = await OpenAIStream(
      await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a friendly assistant that communicates data obtained from a database query. You should only return the data in a brief, coherent, and friendly manner. Don't ask questions or provide explanations.`,
          },
          {
            role: "user",
            content: `The natural language question was: ${question}. The SQL response: ${sqlQuery}. Your data is: ${JSON.stringify(queryResult)}.`,
          },
        ],
        stream: true,
      }),
    )

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 })
  }
}


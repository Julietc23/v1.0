import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente experto en atención al publico, una plataforma de gestión de bases de datos impulsada por IA. Proporciona respuestas concisas y útiles.",
        },
        { role: "user", content: question },
      ],
    })

    const answer = chatCompletion.choices[0].message.content

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Error in FAQ API:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


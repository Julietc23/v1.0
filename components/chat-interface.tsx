"use client"

import { useState } from "react"
import { AIInputWithSuggestions } from "@/components/ui/ai-input-with-suggestions"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  sqlQuery?: string
}

interface ChatInterfaceProps {
  databaseName: string
  databaseType: string
  databasePath: string
}

export function ChatInterface({ databaseName, databaseType, databasePath }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { role: "user", content: text }])

    try {
      const response = await fetch("/api/database-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
          databasePath,
          databaseType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from server")
      }

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          sqlQuery: data.sqlQuery,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, ha ocurrido un error al procesar tu solicitud." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-b from-gray-50/50 to-white dark:from-neutral-900/50 dark:to-neutral-900 rounded-lg p-4">
      <Card className="flex-1 overflow-auto p-4 mb-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border-black/5 dark:border-white/5">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>¡Hola! Estoy listo para ayudarte con tus consultas sobre la base de datos.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.role === "assistant" ? "mr-auto" : "ml-auto flex-row-reverse",
              )}
            >
              <div
                className={cn(
                  "size-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-blue-500 to-purple-500"
                    : "bg-gradient-to-br from-pink-500 to-purple-500",
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl p-4",
                  message.role === "assistant"
                    ? "bg-white dark:bg-neutral-800 shadow-sm"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
                )}
              >
                <div className="text-sm">{message.content}</div>
                {message.sqlQuery && (
                  <div className="mt-2 p-2 rounded bg-gray-50 dark:bg-neutral-900/50 text-xs font-mono text-muted-foreground">
                    <div className="font-semibold mb-1">SQL Query:</div>
                    {message.sqlQuery}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <AIInputWithSuggestions onSubmit={handleSubmit} disabled={isLoading} />
      <div className="text-center text-xs text-muted-foreground mt-2 opacity-70">
        <p>sQloudAI puede cometer errores. Verifica la información importante.</p>
      </div>
    </div>
  )
}


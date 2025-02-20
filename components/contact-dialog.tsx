"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function ContactDialog({ buttonText }: { buttonText: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold">¡Gracias por tu mensaje!</h3>
            <p>Nos pondremos en contacto contigo pronto.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <div>
                <Label htmlFor="company">Compañía</Label>
                <Input id="company" name="company" required />
              </div>
              <div>
                <Label htmlFor="query">Consulta</Label>
                <Textarea id="query" name="query" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CustomPlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomPlanDialog({ open, onOpenChange }: CustomPlanDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold">¡Gracias por tu interés!</h3>
            <p>Nos pondremos en contacto contigo pronto para diseñar tu plan personalizado.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="company">Compañía</Label>
              <Input id="company" name="company" required />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="requirements">Requerimientos específicos</Label>
              <Textarea id="requirements" name="requirements" required />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Solicitar Plan Personalizado"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}


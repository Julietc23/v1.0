"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LogOut } from "lucide-react"

export function LogoutDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., clear session, tokens, etc.)
    // For now, we'll just redirect to the home page
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-600/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-indigo-600/20 p-2.5 rounded-md w-9 h-9 flex items-center justify-center mr-2">
            <LogOut className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />
          </div>
          Cerrar Sesión
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar cierre de sesión</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres cerrar sesión? Serás redirigido a la página principal.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleLogout}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface AddDatabaseDialogProps {
  onAddDatabase: (database: any) => void
}

export function AddDatabaseDialog({ onAddDatabase }: AddDatabaseDialogProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [databaseType, setDatabaseType] = useState<"MySQL" | "SQLite" | "">("")
  const [formData, setFormData] = useState({
    host: "",
    port: "3306",
    name: "",
    user: "",
    password: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      let newDatabase
      if (databaseType === "MySQL") {
        newDatabase = { type: "MySQL", ...formData }
      } else if (databaseType === "SQLite" && file) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al subir el archivo")
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error("Error al procesar el archivo")
        }

        newDatabase = {
          type: "SQLite",
          name: file.name,
          path: data.path,
        }
      }

      if (newDatabase) {
        onAddDatabase(newDatabase)
        setIsOpen(false)
        setDatabaseType("")
        setFormData({
          host: "",
          port: "3306",
          name: "",
          user: "",
          password: "",
        })
        setFile(null)
        toast({
          title: "Base de datos añadida",
          description: "La base de datos se ha añadido correctamente.",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al procesar la solicitud",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Añadir base de datos</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir base de datos</DialogTitle>
          <DialogDescription>Ingresa los detalles de la nueva base de datos.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="databaseType">Tipo de base de datos</Label>
            <Select value={databaseType} onValueChange={(value: "MySQL" | "SQLite") => setDatabaseType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de base de datos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MySQL">MySQL</SelectItem>
                <SelectItem value="SQLite">SQLite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {databaseType === "MySQL" && (
            <>
              <div>
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="port">Puerto</Label>
                <Input
                  id="port"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Nombre de la base de datos</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="user">Usuario</Label>
                <Input
                  id="user"
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          {databaseType === "SQLite" && (
            <div>
              <Label htmlFor="sqliteFile">Archivo SQLite</Label>
              <Input
                id="sqliteFile"
                type="file"
                accept=".sqlite,.db,.sqlite3"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isLoading}
              />
              {file && <p className="mt-2 text-sm text-muted-foreground">Archivo seleccionado: {file.name}</p>}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Añadiendo..." : "Añadir"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [language, setLanguage] = useState("es")
  const [theme, setTheme] = useState("dark")
  const [notifications, setNotifications] = useState(true)
  const [databases, setDatabases] = useState<any[]>([])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuraciones Generales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">Inglés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Tema</Label>
              <Switch
                id="theme"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferencias del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notificaciones</Label>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestión de Seguridad</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Cambiar Contraseña</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bases de Datos Conectadas</CardTitle>
          </CardHeader>
          <CardContent>
            {databases.length > 0 ? (
              databases.map((db) => (
                <div key={db.id} className="flex items-center justify-between mb-2">
                  <span>{db.name}</span>
                  <Button variant="destructive" size="sm">
                    Eliminar Conexión
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No has cargado bases de datos aún</p>
            )}
          </CardContent>
        </Card>

        <Button className="w-full">Guardar Cambios</Button>
      </div>
    </div>
  )
}


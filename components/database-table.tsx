"use client"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

interface Database {
  id: string
  name: string
  type: string
  host?: string
  port?: string
  user?: string
  file?: string
}

interface DatabaseTableProps {
  databases: Database[]
  selectedDatabase: string | null
  onSelectDatabase: (id: string | null) => void
}

export function DatabaseTable({ databases, selectedDatabase, onSelectDatabase }: DatabaseTableProps) {
  if (databases.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No has cargado bases de datos aún</div>
  }

  return (
    <Table>
      <TableCaption>Lista de bases de datos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Host/Archivo</TableHead>
          <TableHead>Puerto</TableHead>
          <TableHead>Usuario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {databases.map((database) => (
          <TableRow key={database.id}>
            <TableCell>
              <Checkbox
                checked={selectedDatabase === database.id}
                onCheckedChange={(checked) => {
                  onSelectDatabase(checked ? database.id : null)
                }}
              />
            </TableCell>
            <TableCell className="font-medium">{database.name}</TableCell>
            <TableCell>{database.type}</TableCell>
            <TableCell>{database.host || database.file || "-"}</TableCell>
            <TableCell>{database.port || "-"}</TableCell>
            <TableCell>{database.user || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


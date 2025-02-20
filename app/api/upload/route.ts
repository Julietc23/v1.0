import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Crear el directorio uploads si no existe
    const uploadDir = join(process.cwd(), "uploads")
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = join(uploadDir, file.name)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      path: filePath,
      success: true,
    })
  } catch (error) {
    console.error("Error al subir el archivo:", error)
    return NextResponse.json({ error: "Error al procesar el archivo", details: error }, { status: 500 })
  }
}


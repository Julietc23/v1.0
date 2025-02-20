import { DemoRequestForm } from "@/components/demo-request-form"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Gestiona tu base de datos
          <br />
          <span className="text-gray-400">con inteligencia artificial</span>
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          sQloudAI te permite interactuar con tu base de datos utilizando lenguaje natural, simplificando consultas y
          análisis de datos.
        </p>
      </div>
      <div className="flex gap-4">
        <DemoRequestForm />
      </div>
    </section>
  )
}


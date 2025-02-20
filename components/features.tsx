import { Brain, Shield, Zap, ArrowDownToDot } from "lucide-react"

const features = [
  {
    name: "Consultas en Lenguaje Natural",
    description: "Interactúa con tu base de datos usando preguntas en español.",
    icon: Brain,
  },
  {
    name: "Análisis de Datos Inteligente",
    description: "Obtén insights profundos de tus datos con IA avanzada.",
    icon: Zap,
  },
  {
    name: "Seguridad de Datos",
    description: "Protección de alto nivel para tu información sensible.",
    icon: Shield,
  },
  {
    name: "Integración Sencilla",
    description: "Conecta fácilmente con múltiples bases de datos.",
    icon: ArrowDownToDot,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Características Principales</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Descubre cómo sQloudAI puede transformar la gestión de tu base de datos.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


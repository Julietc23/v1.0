import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import { PricingSection } from "@/components/pricing-section"
import { FAQ } from "@/components/ui/faq-section"
import Footer from "@/components/footer"
import { Zap, ArrowDownToDot } from "lucide-react"
import HomeClient from "./home-client"

const pricingTiers = [
  {
    name: "Pro",
    price: {
      monthly: 20,
      yearly: 200,
    },
    description: "Acceso completo a todas las funcionalidades",
    highlight: true,
    icon: <ArrowDownToDot className="w-6 h-6" />,
    features: [
      {
        name: "Conexiones ilimitadas",
        description: "Gestiona todas tus bases de datos",
        included: true,
      },
      {
        name: "Consultas avanzadas",
        description: "Análisis profundo de datos",
        included: true,
      },
      {
        name: "Soporte prioritario 24/7",
        description: "Asistencia inmediata",
        included: true,
      },
      {
        name: "Personalización avanzada",
        description: "Adapta la herramienta a tus necesidades",
        included: true,
      },
    ],
  },
  {
    name: "Plan Flexible",
    description: "Solución personalizada para grandes empresas",
    icon: <Zap className="w-6 h-6" />,
    features: [
      {
        name: "Plan a medida",
        description: "Adaptado a tus necesidades específicas",
        included: true,
      },
      {
        name: "Soporte dedicado",
        description: "Equipo de soporte exclusivo",
        included: true,
      },
      {
        name: "Integración personalizada",
        description: "Adaptación a tu infraestructura existente",
        included: true,
      },
      {
        name: "Consultoría estratégica",
        description: "Asesoramiento para optimizar tu uso de IA",
        included: true,
      },
    ],
  },
]

export default function Home() {
  return (
    <HomeClient>
      <div className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <PricingSection id="pricing" tiers={pricingTiers} />
          <FAQ />
          <Footer />
        </div>
      </div>
    </HomeClient>
  )
}


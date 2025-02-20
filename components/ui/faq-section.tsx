import { PhoneCall } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ContactDialog } from "@/components/contact-dialog"

function FAQ() {
  const faqItems = [
    {
      question: "¿Qué es sQloudAI?",
      answer:
        "sQloudAI es una plataforma de gestión de bases de datos impulsada por inteligencia artificial que simplifica las consultas y el análisis de datos utilizando lenguaje natural.",
    },
    {
      question: "¿Es seguro usar sQloudAI con mis datos sensibles?",
      answer:
        "sQloudAI solo se comunica con tus aplicaciones conectadas cuando solicitas datos en el chat. No entrenamos con tus datos ni accedemos o almacenamos ningún dato sin tu solicitud y supervisión.",
    },
    {
      question: "¿Qué tipos de bases de datos son compatibles con sQloudAI?",
      answer:
        "sQloudAI es compatible con una amplia gama de sistemas de gestión de bases de datos, incluyendo MySQL, PostgreSQL, y SQL Server. Estamos constantemente expandiendo nuestra lista de compatibilidad.",
    },
    {
      question: "¿Necesito conocimientos técnicos para usar sQloudAI?",
      answer:
        "No, sQloudAI está diseñado para ser intuitivo y fácil de usar, incluso para aquellos sin experiencia técnica en bases de datos. Nuestra interfaz amigable y el procesamiento de lenguaje natural hacen que la interacción con tus datos sea sencilla.",
    },
    {
      question: "¿Ofrecen soporte técnico?",
      answer:
        "Sí, ofrecemos soporte técnico completo para todos nuestros clientes. Dependiendo de tu plan, puedes acceder a soporte por correo electrónico, chat en vivo o incluso soporte telefónico dedicado.",
    },
    {
      question: "¿Cómo puedo empezar a usar sQloudAI?",
      answer:
        "Puedes comenzar solicitando una demo gratuita a través de nuestro sitio web. Un miembro de nuestro equipo te guiará a través del proceso de configuración y te mostrará cómo sQloudAI puede transformar tu gestión de datos.",
    },
  ]

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Preguntas frecuentes sobre sQloudAI
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  Descubre cómo sQloudAI está revolucionando la interacción con bases de datos, haciendo que la gestión
                  y análisis de datos sea más accesible y eficiente que nunca.
                </p>
              </div>
              <div className="">
                <ContactDialog buttonText="¿Más preguntas? Contáctanos">
                  <Button className="gap-2" variant="default">
                    ¿Más preguntas? Contáctanos <PhoneCall className="w-4 h-4" />
                  </Button>
                </ContactDialog>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export { FAQ }


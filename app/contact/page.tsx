import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}


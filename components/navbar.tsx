"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SignInDialog } from "@/components/sign-in-dialog"
import { ContactDialog } from "@/components/contact-dialog"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToPlans = () => {
    const plansSection = document.getElementById("pricing")
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">sQloud</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={scrollToPlans}>
            Planes
          </Button>
          <ContactDialog buttonText="Contacto" />
          <SignInDialog />
        </div>
      </div>
    </header>
  )
}


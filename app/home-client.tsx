"use client"

import type React from "react"

import MouseMoveEffect from "@/components/mouse-move-effect"

export default function HomeClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MouseMoveEffect />
      {children}
    </>
  )
}


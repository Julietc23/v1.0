"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { CustomPlanDialog } from "@/components/custom-plan-dialog"
import type React from "react"

interface Feature {
  name: string
  description: string
  included: boolean
}

interface PricingTier {
  name: string
  price?: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
  buttonText?: string
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [isCustomPlanOpen, setIsCustomPlanOpen] = useState(false)

  const buttonStyles = {
    default: cn(
      "h-12 bg-white dark:bg-zinc-900",
      "hover:bg-zinc-50 dark:hover:bg-zinc-800",
      "text-zinc-900 dark:text-zinc-100",
      "border border-zinc-200 dark:border-zinc-800",
      "hover:border-zinc-300 dark:hover:border-zinc-700",
      "shadow-sm hover:shadow-md",
      "text-sm font-medium",
    ),
    highlight: cn(
      "h-12 bg-zinc-900 dark:bg-zinc-100",
      "hover:bg-zinc-800 dark:hover:bg-zinc-300",
      "text-white dark:text-zinc-900",
      "shadow-[0_1px_15px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_1px_20px_rgba(0,0,0,0.15)]",
      "font-semibold text-base",
    ),
  }

  const badgeStyles = cn(
    "px-4 py-1.5 text-sm font-medium",
    "bg-zinc-900 dark:bg-zinc-100",
    "text-white dark:text-zinc-900",
    "border-none shadow-lg",
  )

  return (
    <section
      id="pricing"
      className={cn(
        "relative bg-background text-foreground",
        "py-12 px-4 md:py-24 lg:py-32",
        "overflow-hidden",
        className,
      )}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Planes simples y transparentes</h2>
          <div className="inline-flex items-center p-1.5 bg-white dark:bg-zinc-800/50 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
            {["Mensual", "Anual"].map((period) => (
              <button
                key={period}
                onClick={() => setIsYearly(period === "Anual")}
                className={cn(
                  "px-8 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                  (period === "Anual") === isYearly
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative group backdrop-blur-sm",
                "rounded-3xl transition-all duration-300",
                "flex flex-col",
                tier.highlight
                  ? "bg-gradient-to-b from-zinc-100/80 to-transparent dark:from-zinc-400/[0.15]"
                  : "bg-white dark:bg-zinc-800/50",
                "border",
                tier.highlight
                  ? "border-zinc-400/50 dark:border-zinc-400/20 shadow-xl"
                  : "border-zinc-200 dark:border-zinc-700 shadow-md",
                "hover:translate-y-0 hover:shadow-lg",
              )}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-6">
                  <Badge className={badgeStyles}>{tier.badge}</Badge>
                </div>
              )}

              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      tier.highlight
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                    )}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {tier.name === "Plan Flexible" ? "Plan Flex" : tier.name}
                  </h3>
                </div>

                <div className="mb-6">
                  {tier.name === "Plan Flex" ? (
                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Plan Flex</div>
                  ) : tier.price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                        ${isYearly ? tier.price.yearly : tier.price.monthly}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">/{isYearly ? "año" : "mes"}</span>
                    </div>
                  ) : null}
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{tier.description}</p>
                </div>

                <div className="space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex gap-4">
                      <div
                        className={cn(
                          "mt-1 p-0.5 rounded-full transition-colors duration-200",
                          feature.included
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-400 dark:text-zinc-600",
                        )}
                      >
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{feature.name}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-0 mt-auto">
                {tier.name === "Plan Flexible" ? (
                  <Button
                    className={cn("w-full relative transition-all duration-300", buttonStyles.highlight)}
                    onClick={() => setIsCustomPlanOpen(true)}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Solicitar Plan Personalizado
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full relative transition-all duration-300",
                      tier.highlight ? buttonStyles.highlight : buttonStyles.default,
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Comenzar
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CustomPlanDialog open={isCustomPlanOpen} onOpenChange={setIsCustomPlanOpen} />
    </section>
  )
}

export { PricingSection }


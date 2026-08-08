"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SalesModal } from "./sales-modal"

const tiers = [
  {
    id: "open-source",
    name: "Open Source",
    price: "Free",
    cadence: " forever",
    blurb: "Evaluate post-quantum cryptography on your own local nodes.",
    features: [
      "B2B SDK Access",
      "Local containerized Fabric",
      "Basic PQC signing",
      "Community Support",
    ],
    cta: "View GitHub",
    inquiryType: "general",
    highlighted: false,
    isModal: false,
    href: "https://github.com",
  },
  {
    id: "per-verification",
    name: "Pay-As-You-Go",
    price: "Volume",
    cadence: " / verification",
    blurb: "For universities and early-stage fintechs starting out.",
    features: [
      "Verification API",
      "Hosted PQC signing",
      "Reconstruction-less verification",
      "Email Support",
    ],
    cta: "Contact Us",
    inquiryType: "general",
    highlighted: false,
    isModal: true,
    href: undefined,
  },
  {
    id: "enterprise",
    name: "Enterprise Pilot",
    price: "Custom",
    cadence: " / month",
    blurb: "Dedicated infrastructure for high-volume KYC providers.",
    features: [
      "Dedicated Fabric nodes",
      "24/7 Cryptographic SLA",
      "Custom Sharding (k/n)",
      "Priority Integration",
    ],
    cta: "Start Pilot",
    inquiryType: "pilot_cohort",
    highlighted: true,
    isModal: true,
    href: undefined,
  }
]

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inquiryType, setInquiryType] = useState<"pilot_cohort" | "crypto_audit" | "cofounder" | "general">("general")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pricing")
      if (element) {
        const rect = element.getBoundingClientRect()
        setIsScrolled(rect.top < -100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = isScrolled ? "pricing" : "roadmap"
    const target = document.getElementById(targetId)
    if (target) {
      const offset = target.offsetTop - 64
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <section id="pricing" className="bg-background flex flex-col justify-between scroll-mt-[64px] min-h-[calc(100vh-64px)]">
        {/* Body container - fully centered content */}
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center space-y-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-mono text-sm uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Production Infrastructure &amp; Tiers
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Flexible Deployment Models
            </h2>
            <p className="mt-3 text-pretty text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Deploy open-source verification tools or partner with us for dedicated enterprise pilot deployment.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col justify-between rounded-xl border p-6 sm:p-7 transition-all duration-200 ${
                  t.highlighted
                    ? "border-primary bg-card shadow-[0_0_30px_rgba(16,185,129,0.12)] ring-1 ring-primary"
                    : "border-border bg-card/60 hover:border-primary/40"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                    {t.highlighted && (
                      <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-primary">
                        Pilot Cohort
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-foreground">{t.price}</span>
                    <span className="text-xs font-mono text-muted-foreground">{t.cadence}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{t.blurb}</p>

                  <ul className="space-y-2.5 border-t border-border/60 pt-4">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {t.isModal ? (
                    <Button
                      onClick={() => {
                        setInquiryType(t.inquiryType as any);
                        setModalOpen(true);
                      }}
                      className={`w-full py-2.5 font-semibold text-sm ${
                        t.highlighted 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(16,185,129,0.25)]" 
                          : "variant-outline border border-border hover:border-primary/50"
                      }`}
                    >
                      {t.cta}
                    </Button>
                  ) : (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 flex items-center justify-center font-semibold text-sm rounded-lg border border-border hover:border-primary/50 hover:bg-muted text-foreground transition-all select-none outline-none active:translate-y-px text-center"
                    >
                      {t.cta}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <SalesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

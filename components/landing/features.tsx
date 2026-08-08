"use client"

import { useState, useEffect } from "react"
import { ShieldAlert, Layers, Database, Activity, Key, ShieldCheck, ChevronDown } from "lucide-react"

const features = [
  {
    icon: ShieldAlert,
    title: "NIST ML-DSA-65 Signatures",
    body: "FIPS 204 standardized post-quantum signatures using ML-DSA-65 over SHA3-256.",
  },
  {
    icon: Layers,
    title: "Shamir Threshold Sharding",
    body: "Splits credentials across 5 nodes requiring 3 shares to verify, eliminating single points of failure.",
  },
  {
    icon: ShieldCheck,
    title: "Reconstruction-Less Verification",
    body: "Verifies identity claims directly at the share level without reconstructing secrets.",
  },
  {
    icon: Database,
    title: "Hyperledger Fabric Ledger",
    body: "Private permissioned blockchain with Raft consensus and MSP access control.",
  },
  {
    icon: Key,
    title: "Zero Raw Data at Rest",
    body: "PII is processed transiently in memory and never written to disk or ledger state.",
  },
  {
    icon: Activity,
    title: "SDK & REST API Integration",
    body: "Native JS and Python SDKs wrapping OpenAPI 3.0 endpoints for rapid setup.",
  },
]

export function Features() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("tech")
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
    const targetId = isScrolled ? "tech" : "integration"
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
    <section id="tech" className="bg-background flex flex-col justify-between scroll-mt-[64px] min-h-[calc(100vh-64px)]">
      {/* Body container - fully centered content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center space-y-6 py-12">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-sm uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Core Technology Architecture
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Quantum-Safe Architecture
          </h2>
          <p className="mt-3 text-pretty text-lg sm:text-xl leading-relaxed text-muted-foreground">
            Enterprise post-quantum cryptographic primitives built to seamlessly integrate into your existing identity stack.
          </p>
        </div>

        {/* Feature grid - 2x3 or 3x2 matrix layout */}
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col justify-between gap-3 sm:gap-4 rounded-xl border border-border bg-card/60 p-4 sm:p-6 lg:p-7 transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-[0_10px_30px_-15px_rgba(16,185,129,0.15)]"
            >
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary group-hover:scale-105 transition-transform">
                  <f.icon className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

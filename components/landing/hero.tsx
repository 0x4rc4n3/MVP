"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Mail, ChevronDown, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SalesModal } from "./sales-modal"

export function Hero() {
  const [salesOpen, setSalesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (isScrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const target = document.getElementById("problem")
      if (target) {
        const offset = target.offsetTop - 64
        window.scrollTo({ top: offset, behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-background flex flex-col justify-between scroll-mt-[64px] min-h-[calc(100vh-64px)]">
        {/* Fine, subtle tech grid dot matrix backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.696 0.17 162.4 / 0.35) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 65% 55% at 50% 35%, black 25%, transparent 100%)",
          }}
        />

        {/* Soft, refined central emerald/teal ambient light bloom */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-gradient-to-tr from-primary/10 via-emerald-500/5 to-teal-500/5 blur-[140px]" 
        />

        {/* Dynamic, floating cryptographic lattice background */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25 select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1ad298" stopOpacity="1" />
              <stop offset="100%" stopColor="#1ad298" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M150,220 L300,100 L450,220 Z M300,100 L300,340" stroke="#1ad298" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M600,180 L750,300 L900,180 Z" stroke="#1ad298" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M100,500 L250,580 L400,500 Z" stroke="#1ad298" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M800,450 L950,550 M950,550 L1100,450" stroke="#1ad298" strokeWidth="0.5" fill="none" opacity="0.15" />
          
          <circle cx="300" cy="100" r="12" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3s" }} />
          <circle cx="150" cy="220" r="8" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "4s" }} />
          <circle cx="450" cy="220" r="8" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "5s" }} />
          <circle cx="300" cy="340" r="10" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "3.5s" }} />
          <circle cx="750" cy="300" r="12" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "4.5s" }} />
          <circle cx="950" cy="550" r="10" fill="url(#dotGlow)" className="animate-pulse" style={{ animationDuration: "5.5s" }} />
        </svg>

        {/* Body container - fully centered content */}
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full text-center flex-1 flex flex-col items-center justify-center space-y-6 py-12">
          <div>
            <a
              href="#problem"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById("problem")
                if (target) {
                  window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" })
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-mono font-medium text-primary hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(26,210,152,0.15)]"
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">Quantum-Resilient Trust</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </a>
          </div>

          {/* Centered Brand Title with styled logo theme gradient on "ID" */}
          <div className="relative flex flex-col items-center justify-center py-4 select-none w-full max-w-5xl mx-auto">
            <h1 className="relative z-10 text-6xl sm:text-8xl lg:text-[10rem] font-extrabold tracking-tighter text-foreground drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] w-full text-center leading-none">
              Scatter<span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(26,210,152,0.45)]">ID</span>
            </h1>
          </div>

          <p className="mx-auto max-w-2xl text-pretty text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground pt-2">
            Post-quantum identity verification powered by NIST ML-DSA-65 signatures, Shamir threshold secret-sharing, and distributed ledgers.
          </p>

          <div className="pt-2 flex flex-row flex-wrap items-center justify-center gap-3 w-full">
            <a
              href="https://demo.scatterid.tech"
              className="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap outline-none select-none active:translate-y-px h-10 px-10 font-semibold text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all rounded-lg text-center"
            >
              Demo
            </a>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setSalesOpen(true)}
              className="h-10 px-6 font-semibold text-sm sm:text-base border-primary/40 bg-card/60 hover:bg-primary/10 hover:border-primary text-foreground transition-all rounded-lg"
            >
              <Mail className="h-4 w-4 mr-2 text-primary" />
              Book Now
            </Button>
          </div>
        </div>
      </section>

      <SalesModal isOpen={salesOpen} onClose={() => setSalesOpen(false)} />
    </>
  )
}

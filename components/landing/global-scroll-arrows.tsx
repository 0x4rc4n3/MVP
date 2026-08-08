"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const sections = ['top', 'problem', 'tech', 'integration', 'pricing', 'roadmap']

export function GlobalScrollArrows() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)

  useEffect(() => {
    const handleScroll = () => {
      let foundIdx = null;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          // Navbar is 64px. If top is close to 64, it's considered centered.
          if (Math.abs(rect.top - 64) < 150) {
            foundIdx = i
            break
          }
        }
      }
      setActiveIdx(foundIdx)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (idx: number) => {
    if (idx < 0 || idx >= sections.length) return;
    const target = document.getElementById(sections[idx])
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: "smooth"
      })
    }
  }

  return (
    <div 
      className={`fixed inset-x-0 inset-y-0 z-40 pointer-events-none flex flex-col justify-between pt-[70px] pb-4 transition-opacity duration-500 ${
        activeIdx !== null ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Top Arrow Area */}
      <div className="flex justify-center items-start h-16 w-full">
        {activeIdx !== null && activeIdx > 0 && (
          <button
            onClick={() => scrollToSection(activeIdx - 1)}
            className="pointer-events-auto p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-muted/20 text-muted-foreground/60 hover:text-primary transition-all duration-300 shadow-sm"
            aria-label="Scroll up"
          >
            <ChevronUp className="h-6 w-6 animate-pulse" />
          </button>
        )}
      </div>

      {/* Bottom Arrow Area */}
      <div className="flex justify-center items-end h-16 w-full">
        {activeIdx !== null && activeIdx < sections.length - 1 && (
          <button
            onClick={() => scrollToSection(activeIdx + 1)}
            className="pointer-events-auto p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-muted/20 text-muted-foreground/60 hover:text-primary transition-all duration-300 shadow-sm"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </button>
        )}
      </div>
    </div>
  )
}

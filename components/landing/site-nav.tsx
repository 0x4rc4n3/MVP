"use client"

import { useState, useEffect } from "react"
import { Menu, X, Shield, FileText, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { GithubIcon } from "@/components/ui/github-icon"
import { auth, initAuth } from "@/lib/firebase"

const links = [
  { label: "Overview", href: "#problem" },
  { label: "Technology", href: "#tech" },
  { label: "Integration", href: "#integration" },
  { label: "Pricing", href: "#pricing" },
  { label: "Join Us", href: "#roadmap" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(auth.currentUser)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const unsubscribe = initAuth(
      (usr) => setUser(usr),
      () => setUser(null)
    )
    return () => unsubscribe()
  }, [])

  // Scroll progress & active section tracking
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/demo") {
      setActiveSection("/demo")
      return
    }

    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }

      // Determine active section
      const sectionIds = ["problem", "tech", "integration", "pricing", "roadmap"]
      const headerEl = document.querySelector("header")
      const headerHeight = headerEl ? headerEl.offsetHeight : 64
      const scrollPos = window.scrollY + headerHeight + 20

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(`#${id}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    if (href.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        e.preventDefault()
        window.location.href = `/${href}`
        return
      }
      e.preventDefault()
      const targetId = href.replace("#", "")
      const targetEl = targetId === "top" ? document.body : document.getElementById(targetId)
      if (targetEl) {
        const headerEl = document.querySelector("header")
        const headerHeight = headerEl ? headerEl.offsetHeight : 64
        // Scroll exactly to the section boundary tucking it right under the sticky header
        const headerOffset = headerHeight
        const elementPosition = targetEl.getBoundingClientRect().top
        const offsetPosition = targetId === "top"
          ? 0
          : elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
        {/* Subtle Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-muted/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary/80 via-primary to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-8">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              aria-label="ScatterID Home"
              className="focus:outline-none"
            >
              <Logo />
            </a>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {links.map((l) => {
                const isActive = activeSection === l.href
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className={`text-base font-medium transition-colors hover:text-primary relative py-1 ${
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                    )}
                  </a>
                )
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://demo.scatterid.tech"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-[0.8rem] font-semibold whitespace-nowrap transition-all outline-none select-none active:translate-y-px bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(16,185,129,0.2)] h-7 px-6"
            >
              Demo
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="border-t border-border/70 bg-card px-6 py-4 md:hidden animate-fade-in shadow-xl">
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {links.map((l) => {
                const isActive = activeSection === l.href
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                )
              })}
              <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-border">
                <a
                  href="https://demo.scatterid.tech"
                  onClick={() => setOpen(false)}
                  className="w-full bg-primary text-primary-foreground font-semibold justify-center inline-flex shrink-0 items-center rounded-lg border border-transparent bg-clip-padding text-sm whitespace-nowrap transition-all outline-none select-none active:translate-y-px hover:bg-primary/90 h-8"
                >
                  Demo
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}



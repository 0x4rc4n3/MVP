"use client"

import { useState } from "react"
import { Mail, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SalesModal } from "./sales-modal"

export function CTA() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inquiryType, setInquiryType] = useState<"pilot_cohort" | "crypto_audit" | "cofounder" | "general">("cofounder")

  return (
    <>
      {/* 
        The final section body occupies exactly 90vh (no scroll down arrow container below it).
        We center the CTA card within this 90vh window.
      */}
      <section id="roadmap" className="bg-background flex flex-col justify-center scroll-mt-[64px] h-[90vh] min-h-[90vh]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full py-2 my-auto">
          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card p-8 sm:p-12 md:p-16 text-center text-foreground shadow-[0_0_50px_rgba(16,185,129,0.15)]">
            {/* Subtle grid accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to right, oklch(0.696 0.17 162.4 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.696 0.17 162.4 / 0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 90%)",
              }}
            />

            <div className="relative mx-auto max-w-3xl space-y-6">
              <p className="font-mono text-sm uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Roadmap &amp; Leadership Call
              </p>

              <h2 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Want to Build the Post-Quantum Future?
              </h2>

              <p className="mt-4 text-pretty text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                Foundational architecture is live. Join as a technical Co-Founder or enterprise pilot partner as we scale quantum-resilient identity.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => { setInquiryType("cofounder"); setModalOpen(true); }}
                  className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(16,185,129,0.3)] px-8 text-base"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Join Us
                </Button>
              </div>
            </div>
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

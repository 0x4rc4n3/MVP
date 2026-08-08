"use client"

import { useState, useEffect } from "react"
import { Send, X, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SalesModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [orgName, setOrgName] = useState("")
  const [inquiryType, setInquiryType] = useState("pilot_cohort")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (isOpen) {
      setInquiryType("pilot_cohort")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border border-border hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            Get in Touch
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get in touch for enterprise pilots, cryptographic audits, or B2B integration.
          </p>
        </div>

        <form action="https://formsubmit.co/thescatterid@gmail.com" method="POST" className="mt-5 space-y-4">
          <input type="hidden" name="_subject" value={`Sales Inquiry from ${orgName}`} />
          <input type="hidden" name="_captcha" value="false" />

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1">
              Work Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                name="organization"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                Inquiry Type *
              </label>
              <select
                name="type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              >
                <option value="pilot_cohort">Enterprise Pilot Partner</option>
                <option value="crypto_audit">Cryptographic Audit</option>
                <option value="general">General Sales Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-sans leading-relaxed"
            />
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

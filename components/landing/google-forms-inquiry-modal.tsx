"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle2, RefreshCw, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoogleFormsInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  formType?: "sales" | "join"
}

export function GoogleFormsInquiryModal({
  isOpen,
  onClose,
  formType = "sales",
}: GoogleFormsInquiryModalProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [inquiryType, setInquiryType] = useState(formType === "sales" ? "pilot_cohort" : "cofounder")
  const [linkedIn, setLinkedIn] = useState("")
  const [message, setMessage] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setInquiryType(formType === "sales" ? "pilot_cohort" : "cofounder")
      setSubmitSuccess(false)
    }
  }, [isOpen, formType])

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !email.trim()) {
      alert("Please fill in required fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const payload: any = {
        email: email.trim(),
        type: inquiryType,
        message: message.trim(),
        _subject: formType === "sales" ? `Sales Inquiry from ${orgName.trim() || email.trim()}` : `Join Inquiry from ${name.trim() || email.trim()}`,
      }

      if (formType === "sales") {
        payload.organization = orgName.trim()
      } else {
        payload.name = name.trim()
        payload.linkedin = linkedIn.trim()
      }

      const response = await fetch("https://formsubmit.co/ajax/thesactterid@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitSuccess(true)
        setEmail("")
        setName("")
        setOrgName("")
        setLinkedIn("")
        setMessage("")
      } else {
        throw new Error("Form submission failed")
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err)
      alert("An error occurred while sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border border-border hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
            <Mail className="h-3.5 w-3.5" />
            {formType === "sales" ? "Enterprise Solutions" : "Join the Team"}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {formType === "sales" ? "Sales & Partnerships" : "Join ScatterID"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {formType === "sales" 
              ? "Get in touch for enterprise pilots, cryptographic audits, or B2B integration."
              : "We are looking for exceptional cryptographers, engineers, and co-founders."}
          </p>
        </div>

        <form onSubmit={handleSubmitInquiry} className="mt-5 space-y-4">
          {submitSuccess && (
            <div className="p-4 rounded-xl border border-primary/40 bg-primary/10 space-y-2 animate-fade-in font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold">
                <CheckCircle2 className="h-4 w-4" />
                Message Sent Successfully!
              </div>
              <div className="text-muted-foreground">
                We will get back to you shortly.
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formType === "sales" ? (
              <>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
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
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                  >
                    <option value="pilot_cohort">Enterprise Pilot Partner</option>
                    <option value="crypto_audit">Cryptographic Audit</option>
                    <option value="general">General Sales Inquiry</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">
                    LinkedIn / Portfolio URL
                  </label>
                  <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-xs text-muted-foreground mb-1">
                    Role Interest *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
                  >
                    <option value="cofounder">Co-Founder</option>
                    <option value="cryptography_engineer">Cryptography Engineer</option>
                    <option value="fullstack_engineer">Full Stack Engineer</option>
                    <option value="general">Other</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1">
              Message *
            </label>
            <textarea
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
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

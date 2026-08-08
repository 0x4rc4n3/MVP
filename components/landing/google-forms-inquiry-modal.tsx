"use client"

import { useState, useEffect } from "react"
import {
  ShieldCheck,
  Send,
  ExternalLink,
  FileText,
  CheckCircle2,
  RefreshCw,
  X,
  Lock,
  User,
  LogOut,
  Clock,
  Sparkles,
  PlusCircle,
  Database,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  saveInquiryToFirestore,
  type InquiryData,
} from "@/lib/firebase"
import { createEnterpriseGoogleForm } from "@/lib/google-forms"

interface GoogleFormsInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  defaultInquiryType?: "pilot_cohort" | "crypto_audit" | "cofounder" | "general"
}

export function GoogleFormsInquiryModal({
  isOpen,
  onClose,
  defaultInquiryType = "pilot_cohort",
}: GoogleFormsInquiryModalProps) {
  const [email, setEmail] = useState("")
  const [orgName, setOrgName] = useState("")
  const [inquiryType, setInquiryType] = useState<
    "pilot_cohort" | "crypto_audit" | "cofounder" | "general"
  >(defaultInquiryType)
  const [message, setMessage] = useState("")
  const [syncToGoogleForms, setSyncToGoogleForms] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<{
    firestoreId?: string
    googleFormUrl?: string
    responderUri?: string
  } | null>(null)
  useEffect(() => {
    if (isOpen) {
      setInquiryType(defaultInquiryType)
      setSubmitSuccess(null)
    }
  }, [isOpen, defaultInquiryType])

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orgName.trim() || !message.trim() || !email.trim()) {
      alert("Please fill in your Email, Organization name and inquiry details.")
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(null)

    try {
      let createdFormUrl = ""
      let createdResponderUri = ""
      let createdFormId = ""

      // 1. Save inquiry to Firestore database directly
      const newInquiry: Omit<InquiryData, "id"> = {
        userId: "anonymous",
        userEmail: email.trim(),
        userName: "Anonymous User",
        orgName: orgName.trim(),
        inquiryType,
        message: message.trim(),
        status: "submitted",
        googleFormId: createdFormId || undefined,
        googleFormUrl: createdFormUrl || undefined,
        createdAt: new Date().toISOString(),
      }

      const savedDoc = await saveInquiryToFirestore(newInquiry)

      setSubmitSuccess({
        firestoreId: savedDoc?.id,
        googleFormUrl: createdFormUrl,
        responderUri: createdResponderUri,
      })

      // Refresh list
      setEmail("")
      setOrgName("")
      setMessage("")
    } catch (err) {
      console.error("Error submitting inquiry:", err)
      alert("An error occurred while saving your inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full border border-border hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
            <Mail className="h-3.5 w-3.5" />
            Contact & Inquiries
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get in touch for enterprise pilots, cryptographic audits, or partnership opportunities.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitInquiry} className="mt-5 space-y-4">
          {submitSuccess && (
            <div className="p-4 rounded-xl border border-primary/40 bg-primary/10 space-y-2 animate-fade-in font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold">
                <CheckCircle2 className="h-4 w-4" />
                Message Sent Successfully!
              </div>
              <div className="text-muted-foreground space-y-1">
                <p>
                  Reference ID: <span className="text-foreground font-semibold">{submitSuccess.firestoreId}</span>
                </p>
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
              placeholder="e.g. you@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                Organization / Name *
              </label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                Inquiry Type *
              </label>
              <select
                value={inquiryType}
                onChange={(e) =>
                  setInquiryType(
                    e.target.value as "pilot_cohort" | "crypto_audit" | "cofounder" | "general"
                  )
                }
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              >
                <option value="pilot_cohort">Enterprise Pilot Partner</option>
                <option value="crypto_audit">Cryptographic Audit</option>
                <option value="cofounder">Co-Founder Inquiry</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
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
              placeholder="How can we help you?"
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

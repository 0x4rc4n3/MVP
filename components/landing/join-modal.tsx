"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle2, RefreshCw, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JoinModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [role, setRole] = useState("cofounder")
  const [message, setMessage] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setRole("cofounder")
      setSubmitSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !email.trim() || !name.trim()) {
      alert("Please fill in required fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const response = await fetch("https://formsubmit.co/ajax/thesactterid@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          linkedin: linkedIn.trim(),
          role: role,
          message: message.trim(),
          _subject: `Join Inquiry from ${name.trim()}`,
        })
      });

      if (response.ok) {
        setSubmitSuccess(true)
        setEmail("")
        setName("")
        setLinkedIn("")
        setMessage("")
      } else {
        throw new Error("Form submission failed")
      }
    } catch (err) {
      console.error("Error:", err)
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
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
            <User className="h-3.5 w-3.5" />
            Join the Team
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Join ScatterID
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We are looking for exceptional cryptographers, engineers, and co-founders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                LinkedIn / Portfolio
              </label>
              <input
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-1">
                Role Interest *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono"
              >
                <option value="cofounder">Co-Founder</option>
                <option value="cryptography_engineer">Cryptography Engineer</option>
                <option value="fullstack_engineer">Full Stack Engineer</option>
                <option value="general">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-1">
              Why ScatterID? *
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
                  Apply / Contact
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Key, Database, ShieldCheck, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuantumSandbox() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // State for the demo data
  const [credentialId, setCredentialId] = useState<string | null>(null)
  const [shards, setShards] = useState<string[]>([])
  const [anchored, setAnchored] = useState(false)
  const [verified, setVerified] = useState<boolean | null>(null)

  const steps = [
    { num: 1, title: "1. Issue & Shard", icon: Key },
    { num: 2, title: "2. Anchor", icon: Database },
    { num: 3, title: "3. Verify", icon: ShieldCheck },
  ]

  const handleIssue = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Generate standard RFC4122 v4 UUID
      const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
      setCredentialId(newUuid)
      setShards(["Node A (Share 1)", "Node B (Share 2)", "Node C (Share 3)", "Node D (Share 4)", "Node E (Share 5)"])
      setIsProcessing(false)
    }, 800)
  }

  const handleAnchor = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setAnchored(true)
      setIsProcessing(false)
    }, 800)
  }

  const handleVerify = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setVerified(true)
      setIsProcessing(false)
    }, 800)
  }

  const reset = () => {
    setCredentialId(null)
    setShards([])
    setAnchored(false)
    setVerified(null)
    setCurrentStep(1)
  }

  return (
    <section id="sandbox" className="bg-background pt-10 pb-24 sm:pt-12 sm:pb-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Interactive Demo
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            Understand the complete lifecycle of a post-quantum sharded credential.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pb-6">
          {steps.map((s) => {
            const Icon = s.icon
            const isActive = currentStep === s.num
            const isCompleted = currentStep > s.num
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num as 1 | 2 | 3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : isCompleted
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{s.title}</span>
                {isCompleted && <CheckCircle2 className="h-3 w-3 text-primary ml-1" />}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[300px] flex flex-col justify-center items-center">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-2">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Key className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Issue & Shard Credential</h3>
                <p className="text-sm text-muted-foreground px-4">
                  Claims are hashed, signed with ML-DSA-65 (Post-Quantum), and split into 5 Shamir shares.
                </p>
              </div>
              
              {!credentialId ? (
                <Button onClick={handleIssue} disabled={isProcessing} className="w-full h-12 text-sm font-semibold">
                  {isProcessing ? (
                    <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Key className="mr-2 h-4 w-4" /> Generate Credential</>
                  )}
                </Button>
              ) : (
                <div className="space-y-4 text-sm font-mono p-5 bg-card rounded-xl border border-border shadow-sm">
                  <p className="text-primary font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Credential Issued
                  </p>
                  <p className="text-muted-foreground text-center text-xs break-all">ID: {credentialId}</p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-muted-foreground mb-3 text-xs uppercase tracking-wider text-center">Distributed to Nodes</p>
                    <div className="grid grid-cols-2 gap-2">
                      {shards.map((s, i) => (
                        <div key={i} className={`bg-muted/30 border border-border/50 p-2 text-xs rounded-md flex items-center justify-center text-center ${i === 4 ? "col-span-2" : ""}`}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => setCurrentStep(2)} className="w-full mt-2 h-10 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Next: Anchor to Ledger <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-2">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Anchor to Private Blockchain</h3>
                <p className="text-sm text-muted-foreground px-4">
                  A tamper-evident proof hash is written to the Hyperledger Fabric channel.
                </p>
              </div>

              {!anchored ? (
                <Button onClick={handleAnchor} disabled={isProcessing || !credentialId} className="w-full h-12 text-sm font-semibold">
                  {isProcessing ? (
                    <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Anchoring...</>
                  ) : (
                    <><Database className="mr-2 h-4 w-4" /> {credentialId ? "Anchor Proof" : "Please complete Step 1 first"}</>
                  )}
                </Button>
              ) : (
                <div className="space-y-4 text-sm font-mono p-5 bg-card rounded-xl border border-border shadow-sm text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-primary mb-2" />
                  <p className="text-primary font-bold">Proof Anchored to Ledger</p>
                  <p className="text-muted-foreground text-xs break-all pt-2">
                    TxID: 0x8a92b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2
                  </p>
                  <Button onClick={() => setCurrentStep(3)} className="w-full mt-4 h-10 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    Next: Verify <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="text-center space-y-2">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Reconstruction-less Verification</h3>
                <p className="text-sm text-muted-foreground px-4">
                  Verify the credential's validity via API without reconstructing the underlying data.
                </p>
              </div>

              {!verified ? (
                <Button onClick={handleVerify} disabled={isProcessing || !anchored} className="w-full h-12 text-sm font-semibold">
                  {isProcessing ? (
                    <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
                  ) : (
                    <><ShieldCheck className="mr-2 h-4 w-4" /> {anchored ? "Verify Credential" : "Please complete Step 2 first"}</>
                  )}
                </Button>
              ) : (
                <div className="space-y-4 text-sm font-mono p-6 bg-primary/10 border-primary/30 rounded-xl border text-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-2" />
                  <p className="text-primary font-bold text-lg">Valid & Secure</p>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    The credential was verified successfully without ever bringing the 5 scattered shares back together.
                  </p>
                  
                  <Button onClick={reset} variant="outline" className="w-full mt-6 h-10 border-primary/30 text-primary hover:bg-primary/5">
                    Restart Demo <RefreshCw className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

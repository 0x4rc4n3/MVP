"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, FileWarning, ShieldAlert, ChevronDown } from "lucide-react"

export function ThreatModel() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("problem")
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
    const targetId = isScrolled ? "problem" : "tech"
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
    <section id="problem" className="bg-background flex flex-col justify-between scroll-mt-[64px] min-h-[calc(100vh-64px)]">
      {/* Body container - fully centered content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center space-y-6 py-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-sm uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Quantum Threat Horizon
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            The &ldquo;Harvest Now, Decrypt Later&rdquo; Threat
          </h2>
          <p className="mt-3 text-pretty text-lg sm:text-xl leading-relaxed text-muted-foreground">
            Adversaries are actively intercepting and storing encrypted identity payloads today, waiting for cryptanalytically relevant quantum computers (CRQCs) to factor RSA and ECC keys retroactively.
          </p>
        </div>

        {/* Side-by-Side: The Threat Pipeline vs. The ScatterID Defense */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side: The Threat Pipeline */}
          <div className="rounded-xl border border-border bg-card/25 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border/80 text-sm font-mono font-bold text-red-400">
              <ShieldAlert className="h-5 w-5" />
              THE QUANTUM EXPLOIT PIPELINE
            </div>
            
            <div className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="relative pl-6 border-l border-red-500/20 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-red-400" />
                <span className="font-mono text-xs font-bold text-red-400">01. INTERCEPT (Today)</span>
                <h4 className="text-base font-bold text-foreground">Passive Wiretapping</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Syndicates tap TLS streams and database replication channels, saving raw identity transactions and encrypted blobs.
                </p>
              </div>

              <div className="relative pl-6 border-l border-red-500/20 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-red-400" />
                <span className="font-mono text-xs font-bold text-red-400">02. STORE (Interim)</span>
                <h4 className="text-base font-bold text-foreground">Cold Repository Archive</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Captured payload files are stored in massive state-sponsored server farms, waiting until computing hardware matures.
                </p>
              </div>

              <div className="relative pl-6 border-l border-red-500/20 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-red-400" />
                <span className="font-mono text-xs font-bold text-red-400">03. CRACK (Future)</span>
                <h4 className="text-base font-bold text-foreground">Shor's Algorithm Execution</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Once quantum computers reach sufficient logical qubits, Shor's algorithm instantly factors centralized credentials and decrypts all archived data.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The ScatterID Defense */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-primary/10 text-sm font-mono font-bold text-primary">
              <ShieldCheck className="h-5 w-5" />
              THE SCATTERID SECURITY MATRIX
            </div>
            
            <div className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="relative pl-6 border-l border-primary/30 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-primary" />
                <span className="font-mono text-xs font-bold text-primary">01. SHARD (Threshold SSS)</span>
                <h4 className="text-base font-bold text-foreground">Information-Theoretic Security</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Credentials are sharded using Shamir Secret Sharing (k=3, n=5). Even if some storage nodes are wiretapped, raw files remain mathematically secure below the threshold.
                </p>
              </div>

              <div className="relative pl-6 border-l border-primary/30 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-primary" />
                <span className="font-mono text-xs font-bold text-primary">02. SIGN (NIST ML-DSA-65)</span>
                <h4 className="text-base font-bold text-foreground">Post-Quantum Cryptography</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  Identity transactions use NIST FIPS 204 Crystals-Dilithium signatures. They are inherently resilient against Shor's algorithm, securing verification processes.
                </p>
              </div>

              <div className="relative pl-6 border-l border-primary/30 space-y-1">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-[4px] rounded-full bg-primary" />
                <span className="font-mono text-xs font-bold text-primary">03. ANCHOR (Ledger Proofs)</span>
                <h4 className="text-base font-bold text-foreground">Hyperledger Fabric Anchor</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  One-way transaction hashes are logged to a private permissioned blockchain. Past proofs cannot be retroactively tampered with, forged, or altered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

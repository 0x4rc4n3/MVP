import { Shield, Lock, Cpu, Server, Network, CheckCircle2 } from "lucide-react"

const standards = [
  { name: "Shamir Threshold SSS", icon: Shield },
  { name: "NIST FIPS 204 (ML-DSA)", icon: Lock },
  { name: "Private Blockchain Ledger", icon: Network },
  { name: "Dual-Stack Auth Bridge", icon: Cpu },
  { name: "Post-Quantum Cryptography", icon: Server },
]

export function LogoBar() {
  return (
    <section className="border-b border-border bg-muted/20 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Built for post-quantum compliance & enterprise trust
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {standards.map((s) => (
            <div key={s.name} className="flex items-center gap-2 text-xs font-mono font-medium text-foreground/80 bg-card border border-border/70 rounded-full px-3.5 py-1.5 shadow-sm">
              <s.icon className="h-3.5 w-3.5 text-primary" />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

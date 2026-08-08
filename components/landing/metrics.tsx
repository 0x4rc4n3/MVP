const stats = [
  { value: "k=3 / n=5", label: "Shamir Threshold Sharding", note: "Tolerates 2 node failures with zero data loss or reconstruction risk" },
  { value: "ML-DSA-65", label: "NIST FIPS 204 Standard", note: "Audited liboqs CRYSTALS-Dilithium post-quantum signatures" },
  { value: "0 Bytes", label: "Raw PII Persisted at Rest", note: "Transient memory hashing & signing; zero claim storage on disk/ledger" },
  { value: "< 2s", label: "Verification Latency", note: "Reconstruction-less share comparison & Hyperledger Fabric check" },
]

export function Metrics() {
  return (
    <section id="metrics" className="border-b border-border bg-card text-foreground py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Active Benchmarking & Performance
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Quantum Resilience Without Performance Overhead.
          </h2>
          <p className="mt-3 text-muted-foreground text-base">
            Benchmarking lattice-based cryptographic primitives on real enterprise workloads proves that post-quantum security doesn&apos;t require sacrificing user response speed.
          </p>
        </div>

        <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <dd className="font-mono text-3xl font-extrabold tracking-tight text-primary">{s.value}</dd>
              <dt className="mt-3 text-sm font-bold text-foreground">{s.label}</dt>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

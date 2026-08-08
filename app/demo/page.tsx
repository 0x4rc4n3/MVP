import { Metadata } from "next"
import { SiteNav } from "@/components/landing/site-nav"
import { QuantumSandbox } from "@/components/landing/quantum-sandbox"
import { SiteFooter } from "@/components/landing/site-footer"

export const metadata: Metadata = {
  title: "Demo | ScatterID Post-Quantum Identity Verification",
  description: "Interactive demo of ScatterID post-quantum credential issuance, Shamir threshold secret-sharing, and Hyperledger Fabric verification.",
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip">
      <SiteNav />
      <main className="py-6 sm:py-10">
        <QuantumSandbox />
      </main>
      <SiteFooter />
    </div>
  )
}

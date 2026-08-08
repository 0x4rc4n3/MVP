import { SiteNav } from "@/components/landing/site-nav"
import { Hero } from "@/components/landing/hero"
import { ThreatModel } from "@/components/landing/threat-model"
import { Features } from "@/components/landing/features"
import { DeveloperIntegration } from "@/components/landing/code-sample"
import { Pricing } from "@/components/landing/pricing"
import { CTA } from "@/components/landing/cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip">
      <SiteNav />
      <main>
        <Hero />
        <ThreatModel />
        <Features />
        <DeveloperIntegration />
        <Pricing />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}




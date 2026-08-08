"use client"

import { useState, useEffect } from "react"
import { Check, Copy, Key, ChevronDown } from "lucide-react"

const snippets: Record<string, { label: string; lang: string; code: string }> = {
  ts: {
    label: "TypeScript / JS",
    lang: "typescript",
    code: `import { ScatterID } from "@scatterid/sdk"

const scatter = new ScatterID({ apiKey: "SCATTER_KEY" })
const credential = await scatter.verifyCredential("d3b07384-d113-4956-a5cc-9c606b2512f4")

console.log("Verification state:", credential.isValid ? "VALID" : "REVOKED")`
  },
  python: {
    label: "Python",
    lang: "python",
    code: `from scatterid import ScatterClient

client = ScatterClient(api_key="SCATTER_KEY")
credential = client.verify_credential("d3b07384-d113-4956-a5cc-9c606b2512f4")

print(f"Verification state: {'VALID' if credential.is_valid else 'REVOKED'}")`
  },
  curl: {
    label: "cURL",
    lang: "bash",
    code: `curl -X POST https://api.scatterid.tech/v1/verify \\
  -H "Authorization: Bearer $SCATTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"credentialId": "d3b07384-d113-4956-a5cc-9c606b2512f4"}'`
  }
}

export function CodeSample() {
  const tabs = Object.keys(snippets)
  const [active, setActive] = useState(tabs[0])
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(snippets[active].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between border-b border-border bg-neutral-900/35 px-4 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto" role="tablist" aria-label="Code language">
          <div className="flex items-center gap-1.5 px-3 py-1.5 mr-2 text-sm font-mono text-primary font-bold border-r border-border/80">
            <Key className="h-4 w-4" />
            SDK
          </div>
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`relative px-3 py-1.5 font-mono text-sm transition-colors rounded-md ${
                active === t 
                  ? "text-primary bg-primary/10 font-bold border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {snippets[t].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="h-[260px] min-h-[260px] overflow-x-auto p-5 font-mono text-[14px] leading-7 text-foreground/90 selection:bg-primary/20 bg-black/20 flex items-center">
        <code>{snippets[active].code}</code>
      </pre>
    </div>
  )
}

export function DeveloperIntegration() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("integration")
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
    const targetId = isScrolled ? "integration" : "pricing"
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
    <section id="integration" className="bg-background flex flex-col justify-between scroll-mt-[64px] min-h-[calc(100vh-64px)]">
      {/* Body container - fully centered content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 my-auto w-full flex-1 flex flex-col justify-center space-y-6 py-12">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <p className="font-mono text-sm uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Polyglot Developer Integration
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Multi-Language Verification
          </h2>
          <p className="mt-3 text-pretty text-lg sm:text-xl leading-relaxed text-muted-foreground">
            Integrate post-quantum verification in seconds using our ultra-lightweight native SDKs.
          </p>
        </div>

        {/* Code Sample Box */}
        <div className="max-w-5xl mx-auto w-full">
          <CodeSample />
        </div>
      </div>

    </section>
  )
}

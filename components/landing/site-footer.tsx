"use client"
import { Logo } from "./logo"

const groups = [
  { title: "Architecture", links: [
    { label: "Overview", href: "#problem" },
    { label: "Core Technology", href: "#tech" },
    { label: "Interactive Demo", href: "#sandbox" },
    { label: "Deployment Tiers", href: "#pricing" }
  ]},
  { title: "Cryptography", links: [
    { label: "Shamir Secret Sharing", href: "https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing", external: true },
    { label: "NIST FIPS 204 (ML-DSA)", href: "https://csrc.nist.gov/pubs/fips/204/final", external: true },
    { label: "Private Blockchain Ledger", href: "#tech" },
    { label: "Dual-Stack Bridge", href: "#tech" }
  ]},
  { title: "Organization", links: [
    { label: "GitHub", href: "https://github.com/0x4rc4n3", external: true },
    { label: "Join Us", href: "mailto:join@scatterid.tech?subject=Join%20ScatterID" },
    { label: "Pilot Program", href: "mailto:founder@scatterid.tech?subject=Pilot%20Program" },
    { label: "Contact Us", href: "mailto:founder@scatterid.tech" }
  ]},
]

export function SiteFooter() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) {
        const offset = target.offsetTop - 64;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
          <Logo iconSize="md" />
          <p className="text-xs font-mono text-muted-foreground">
            Post-Quantum Decentralized Identity Infrastructure
          </p>
        </div>

        {/* 3 Columns Footer Links */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-2">
          {groups.map((g) => (
            <div key={g.title} className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {g.title}
              </h3>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground font-sans block"
                      onClick={(e) => handleClick(e, l.href)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

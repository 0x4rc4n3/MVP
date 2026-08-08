interface LogoProps {
  className?: string
  showText?: boolean
  iconSize?: "sm" | "md" | "lg"
}

export function ScatterIDMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Fingerprint Arch Network */}
      {/* Inner loop */}
      <path
        d="M 50 60 V 50 C 50 43 44 43 44 49 V 57"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Middle arch */}
      <path
        d="M 50 68 V 49 C 50 37 36 37 36 49 C 36 58 30 58 24 58"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outer arch */}
      <path
        d="M 60 62 V 47 C 60 31 28 31 28 47 C 28 53 22 53 16 53"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Outermost arch */}
      <path
        d="M 68 54 V 45 C 68 25 20 25 20 45"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Radiating Circuit Traces */}
      <path d="M 50 25 V 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 58 27 L 68 17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 42 27 L 32 17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 68 38 L 78 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 68 54 L 80 54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 60 62 L 72 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 50 68 V 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M 40 64 L 30 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

      {/* Terminal Node Dots */}
      <circle cx="50" cy="13" r="3.5" fill="currentColor" />
      <circle cx="70" cy="15" r="3.5" fill="currentColor" />
      <circle cx="30" cy="15" r="3.5" fill="currentColor" />
      <circle cx="80" cy="28" r="3.5" fill="currentColor" />
      <circle cx="82" cy="54" r="3.5" fill="currentColor" />
      <circle cx="74" cy="74" r="3.5" fill="currentColor" />
      <circle cx="50" cy="80" r="3.5" fill="currentColor" />
      <circle cx="28" cy="76" r="3.5" fill="currentColor" />
      <circle cx="24" cy="58" r="3.5" fill="currentColor" />
      <circle cx="14" cy="53" r="3.5" fill="currentColor" />

      {/* Scattered Nodes */}
      <circle cx="44" cy="10" r="2.8" fill="currentColor" />
      <circle cx="70" cy="45" r="2.8" fill="currentColor" />
      <circle cx="31" cy="44" r="2.8" fill="currentColor" />
      <circle cx="58" cy="86" r="2.8" fill="currentColor" />
      <circle cx="18" cy="38" r="2.8" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className, showText = true, iconSize = "md" }: LogoProps) {
  const iconDimensions = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }[iconSize]

  return (
    <div className={`flex items-center gap-2.5 select-none ${className ?? ""}`}>
      {/* Icon Mark with glowing backdrop */}
      <div className="relative flex items-center justify-center text-primary transition-transform duration-200 hover:scale-105">
        <ScatterIDMark className={iconDimensions} />
      </div>

      {showText && (
        <div className="flex items-center tracking-wider font-extrabold text-foreground font-sans text-lg sm:text-xl">
          <span className="text-foreground tracking-tight uppercase font-extrabold">SCATTER</span>
          <span className="text-primary tracking-tight uppercase font-extrabold ml-0.5">ID</span>
        </div>
      )}
    </div>
  )
}

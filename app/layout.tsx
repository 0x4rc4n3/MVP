import type { Metadata, Viewport } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-roboto' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-roboto-mono' })

export const metadata: Metadata = {
  title: 'ScatterID — Post-Quantum Decentralized Identity',
  description:
    'Decentralized identity platform engineered to protect enterprise infrastructure from quantum decryption. Powered by private blockchain and dual-stack post-quantum authentication.',
  generator: 'ScatterID',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background text-foreground ${roboto.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        {children}
      </body>
    </html>
  )
}

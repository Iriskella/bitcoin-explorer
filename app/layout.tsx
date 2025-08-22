
import ThemeToggle from '../components/ThemeToggle'
import '../styles/globals.css'
import '../styles/theme.css'
import type { Metadata } from 'next'
import { Barlow_Semi_Condensed } from 'next/font/google'

const brand = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['300','400','600','700'],
  variable: '--font-brand',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Bitcoin Explorer',
  description: 'Search a Bitcoin address or transaction with a Simpliance-style UI'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={brand.variable}>
      <body className="font-brand antialiased min-h-screen">
        {/* Prevent theme flash: set data-theme ASAP from localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                var t = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch (e) {}
            })();`,
          }}
        />
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-20 border-b border-base-border/60 bg-[color:var(--color-bg)]/90 backdrop-blur">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-[color:var(--color-accent-primary)]" />
                <span className="text-sm md:text-base tracking-wide text-base-muted">Simpliance • Bitcoin Explorer</span>
              </div>
              <nav className="hidden md:flex items-center gap-4 text-sm text-base-muted">
                <a className="hover:text-[color:var(--color-text)] transition" href="https://simpliance.ltd/#services" target="_blank">Reference Style</a>
                <nav className="hidden md:flex items-center gap-4 text-sm text-base-muted">
              <ThemeToggle />
            </nav>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-base-border/60">
            <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-6 text-xs text-base-muted">
              Built for the Simpliance home assignment • Centralized tokens in <code>/styles/theme.css</code>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

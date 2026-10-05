import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

import { Inter, Syncopate } from "next/font/google";

// variable: creates a CSS variable we can use in Tailwind
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-syncopate" });

export const metadata = {
  title: "Autobahn Garage",
  description: "Luxury pre-owned cars. Browse our inventory and calculate financing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${syncopate.variable} antialiased`}>
        {/* Header: logo on the left, nav link on the right */}
        <header className="sticky top-0 z-50 border-b border-brand-gray/20 bg-brand-black/80 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link href="/">
              <img src="/logos/header-logo.svg" alt="Autobahn Garage" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/inventory" className="text-brand-gray transition hover:text-brand-cyan">
                Inventory
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        {children}
        <footer className="mt-24 border-t border-brand-gray/20 bg-brand-black text-brand-gray">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
            <div>
              <img src="/logos/full-logo.svg" alt="Autobahn Garage" className="mb-3 h-16 w-auto" />
              <p className="text-sm">Performance and prestige vehicles, hand-selected.</p>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white">Explore</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/inventory" className="hover:text-brand-cyan">
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link href="/inventory?body=SUV" className="hover:text-brand-cyan">
                    SUVs
                  </Link>
                </li>
                <li>
                  <Link href="/inventory?body=Coupe" className="hover:text-brand-cyan">
                    Coupes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white">Contact</p>
              <p className="text-sm">spencersamra@gmail.com</p>
              <p className="text-sm">Toronto, ON</p>
            </div>
          </div>
          <div className="border-t border-brand-gray/20 py-4 text-center text-xs">© {new Date().getFullYear()} Autobahn Garage. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}

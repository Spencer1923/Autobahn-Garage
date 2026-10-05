import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Autobahn Garage",
  description:
    "Luxury pre-owned cars. Browse our inventory and calculate financing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Header: logo on the left, nav link on the right */}
        <header className="border-b border-brand-gray/20 bg-brand-black px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link href="/">
              <img
                src="/logos/header-logo.svg"
                alt="Autobahn Garage"
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/inventory"
              className="text-brand-gray transition hover:text-brand-cyan"
            >
              Inventory
            </Link>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-brand-gray/20 py-8 text-center text-sm text-brand-gray">
          <img
            src="/logos/full-logo.svg"
            alt="Autobahn Garage"
            className="mx-auto mb-3 h-16 w-auto"
          />
          © {new Date().getFullYear()} Autobahn Garage
        </footer>
      </body>
    </html>
  );
}

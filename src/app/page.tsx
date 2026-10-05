import Link from "next/link";
import CarCard from "@/components/CarCard";
import { getCars, getBodies } from "@/lib/cars";

export default function Home() {
  // "Featured" = the 6 most powerful cars (reuses our existing sort logic)
  const featured = getCars({ sort: "hp-desc" }).slice(0, 6);
  const all = getCars();
  const stats = [
    { label: "Vehicles in stock", value: all.length },
    { label: "Brands", value: new Set(all.map((c) => c.make)).size },
    { label: "Newest model year", value: Math.max(...all.map((c) => c.year)) },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        {/* Soft cyan glow behind the text (decorative only) */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-cyan/20 blur-3xl" />

        <div className="fade-up relative mx-auto max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-cyan">Performance · Prestige · Precision</p>
          <h1 className="text-5xl font-bold md:text-7xl">
            Exceptional <span className="bg-linear-to-r from-cyan-text to-brand-cyan bg-clip-text text-transparent">Automobiles</span> driven by{" "}
            <span className="bg-linear-to-r from-cyan-text to-brand-cyan bg-clip-text text-transparent">Prestige</span>
          </h1>
          {/* Small red accent bar */}
          <span className="mx-auto mt-6 block h-1 w-14 bg-brand-red" />
          <p className="mt-6 text-lg text-muted">Hand-selected German performance, super SUVs, and exotics.</p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href="/inventory" className="rounded bg-brand-cyan px-6 py-3 font-semibold text-brand-black transition hover:brightness-110">
              Browse inventory
            </Link>
            <Link href="/inventory?sort=hp-desc" className="rounded border border-brand-gray/40 px-6 py-3 transition hover:border-brand-cyan hover:text-brand-cyan">
              Most powerful
            </Link>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="mx-auto mb-16 grid max-w-4xl grid-cols-3 divide-x divide-brand-gray/20 border-y border-brand-gray/20 py-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-cyan-text">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      {/* BROWSE BY BODY TYPE: links use the filter URLs we already built */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {getBodies().map((b) => (
            <Link key={b} href={`/inventory?body=${b}`} className="rounded-full border border-brand-gray/30 px-5 py-2 text-muted transition hover:border-brand-cyan hover:text-brand-cyan">
              {b}s
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured</h2>
          <Link href="/inventory" className="text-brand-cyan hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

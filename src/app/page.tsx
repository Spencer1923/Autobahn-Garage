import Link from "next/link";
import CarCard from "@/components/CarCard";
import { getCars, getBodies, getMakes } from "@/lib/cars";
import HeroRotator from "@/components/HeroRotator";

export default function Home() {
  const all = getCars();

  const featured = getCars({ sort: "price-desc" }).slice(0, 8);

  const stats = [
    { label: "Vehicles in stock", value: all.length },
    { label: "Brands", value: new Set(all.map((c) => c.make)).size },
    { label: "Newest model year", value: Math.max(...all.map((c) => c.year)) },
  ];

  const perks = [
    { n: "01", title: "Hand-selected inventory", text: "Every vehicle is chosen for condition, provenance, and presence." },
    { n: "02", title: "Transparent pricing", text: "Clear pricing and a built-in financing calculator on every listing." },
    { n: "03", title: "White-glove service", text: "One point of contact from first inquiry to delivery." },
  ];

  return (
    <main>
      {/* HERO: text left, featured car right */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {/* LEFT: headline and buttons */}
          <div className="fade-up">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-cyan-text">Performance · Prestige · Precision</p>
            <h1 className="font-display text-3xl font-bold uppercase leading-[1.15] md:text-4xl lg:text-5xl">
              Exceptional <br /> Automobiles
            </h1>
            <p className="mt-4 font-display text-sm uppercase tracking-[0.35em] text-cyan-text md:text-base">Driven by the Exceptional</p>
            <span className="mt-6 block h-1 w-14 bg-brand-red" />
            <p className="mt-6 max-w-md text-lg text-muted">Performance cars and luxury SUVs, curated for the discerning driver.</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/inventory" className="rounded bg-brand-cyan px-6 py-3 font-semibold text-brand-black transition hover:brightness-110">
                Browse inventory
              </Link>
              <a href="mailto:your@email.com?subject=Book a viewing" className="rounded border border-brand-gray/40 px-6 py-3 transition hover:border-brand-cyan hover:text-cyan-text">
                Book a viewing
              </a>
            </div>
          </div>

          {/* RIGHT: automatically rotating featured car */}
          {/* RIGHT: rotating featured cars */}
          <HeroRotator cars={featured} />
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

      {/* BRANDS */}
      <section className="mx-auto mb-16 max-w-6xl px-6">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted">Marques we carry</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {getMakes().map((m) => (
            <Link key={m} href={`/inventory?make=${encodeURIComponent(m)}`} className="text-lg font-semibold uppercase tracking-widest text-muted/70 transition hover:text-cyan-text">
              {m}
            </Link>
          ))}
        </div>
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

      {/* WHY US */}
      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-xl border border-brand-gray/20 bg-brand-gray/20 md:grid-cols-3">
          {perks.map((p) => (
            <div key={p.n} className="bg-background p-8">
              <p className="text-sm font-bold text-cyan-text">{p.n}</p>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

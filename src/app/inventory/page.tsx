import CarCard from "@/components/CarCard";
import { getCars, getMakes, getBodies } from "@/lib/cars";
import Link from "next/link";

// In recent Next.js versions, searchParams is a Promise, so we await it
export default async function InventoryPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;

  // URL values are always strings; convert to numbers (or undefined if blank)
  const num = (v?: string) => (v ? Number(v) : undefined);

  const cars = getCars({
    make: p.make,
    model: p.model,
    minPrice: num(p.minPrice),
    maxPrice: num(p.maxPrice),
    minYear: num(p.minYear),
    maxMileage: num(p.maxMileage),
    body: p.body,
    sort: p.sort,
  });

  const input = "rounded border border-brand-gray/30 bg-background p-2 text-foreground placeholder:text-muted focus:border-brand-cyan focus:outline-none";
  // Active filters (ignoring sort) for the chips, with friendly prefixes
  const active = Object.entries(p).filter(([k, v]) => v && k !== "sort");
  const labels: Record<string, string> = {
    minPrice: "Min $",
    maxPrice: "Max $",
    minYear: "From ",
    maxMileage: "Max km ",
  };

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-text">Inventory</p>
        <h1 className="mt-1 text-4xl font-bold">Our collection</h1>
        <span className="mt-3 block h-1 w-12 bg-brand-red" />
      </div>
      {/* method="get" puts the values in the URL when submitted */}
      <form method="get" className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-brand-gray/20 bg-card p-4 md:grid-cols-4">
        <select name="make" defaultValue={p.make ?? ""} className={input}>
          <option value="">All makes</option>
          {getMakes().map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <input name="model" placeholder="Model" defaultValue={p.model} className={input} />
        {/* Body type filter */}
        <select name="body" defaultValue={p.body ?? ""} className={input}>
          <option value="">All body types</option>
          {getBodies().map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        {/* Sort order: value is what goes in the URL, text is what users see */}
        <select name="sort" defaultValue={p.sort ?? ""} className={input}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="year-desc">Newest</option>
          <option value="mileage-asc">Lowest mileage</option>
        </select>
        <input name="minPrice" type="number" placeholder="Min price" defaultValue={p.minPrice} className={input} />
        <input name="maxPrice" type="number" placeholder="Max price" defaultValue={p.maxPrice} className={input} />
        <input name="minYear" type="number" placeholder="Min year" defaultValue={p.minYear} className={input} />
        <input name="maxMileage" type="number" placeholder="Max km" defaultValue={p.maxMileage} className={input} />
        <button className="rounded bg-brand-cyan p-2 font-semibold text-brand-black transition hover:brightness-110">Search</button>
      </form>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-muted">
          {cars.length} {cars.length === 1 ? "vehicle" : "vehicles"}
        </p>
        {active.map(([k, v]) => (
          <span key={k} className="rounded-full border border-brand-cyan/40 px-3 py-1 text-sm text-cyan-text">
            {labels[k] ?? ""}
            {v}
          </span>
        ))}
        {active.length > 0 && (
          <Link href="/inventory" className="text-sm text-muted underline hover:text-cyan-text">
            Clear all
          </Link>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>
      {cars.length === 0 && (
        <div className="rounded-xl border border-dashed border-brand-gray/30 py-16 text-center">
          <p className="text-xl font-semibold">No vehicles match your search</p>
          <p className="mt-2 text-muted">Try widening your filters.</p>
          <Link href="/inventory" className="mt-6 inline-block rounded bg-brand-cyan px-6 py-3 font-semibold text-brand-black">
            Reset filters
          </Link>
        </div>
      )}
    </main>
  );
}

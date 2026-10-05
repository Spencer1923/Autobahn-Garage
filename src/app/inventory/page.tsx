import CarCard from "@/components/CarCard";
import { getCars, getMakes, getBodies } from "@/lib/cars";

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

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* method="get" puts the values in the URL when submitted */}
      <form method="get" className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
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
          <option value="hp-desc">Most horsepower</option>
          <option value="year-desc">Newest</option>
          <option value="mileage-asc">Lowest mileage</option>
        </select>
        <input name="minPrice" type="number" placeholder="Min price" defaultValue={p.minPrice} className={input} />
        <input name="maxPrice" type="number" placeholder="Max price" defaultValue={p.maxPrice} className={input} />
        <input name="minYear" type="number" placeholder="Min year" defaultValue={p.minYear} className={input} />
        <input name="maxMileage" type="number" placeholder="Max km" defaultValue={p.maxMileage} className={input} />
        <button className="rounded bg-brand-cyan p-2 font-semibold text-brand-black transition hover:brightness-110">Search</button>
      </form>

      <p className="mb-4">{cars.length} cars found</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>
    </main>
  );
}

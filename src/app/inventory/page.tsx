import CarCard from "@/components/CarCard";
import { getCars, getMakes } from "@/lib/cars";

// In recent Next.js versions, searchParams is a Promise, so we await it
export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
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
  });

  const input = "rounded border p-2";

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* method="get" puts the values in the URL when submitted */}
      <form method="get" className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
        <select name="make" defaultValue={p.make ?? ""} className={input}>
          <option value="">All makes</option>
          {getMakes().map((m) => <option key={m}>{m}</option>)}
        </select>
        <input name="model" placeholder="Model" defaultValue={p.model} className={input} />
        <input name="minPrice" type="number" placeholder="Min price" defaultValue={p.minPrice} className={input} />
        <input name="maxPrice" type="number" placeholder="Max price" defaultValue={p.maxPrice} className={input} />
        <input name="minYear" type="number" placeholder="Min year" defaultValue={p.minYear} className={input} />
        <input name="maxMileage" type="number" placeholder="Max km" defaultValue={p.maxMileage} className={input} />
        <button className="rounded bg-blue-600 p-2 text-white">Search</button>
      </form>

      <p className="mb-4">{cars.length} cars found</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => <CarCard key={car.id} car={car} />)}
      </div>
    </main>
  );
}
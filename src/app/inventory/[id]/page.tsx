import { notFound } from "next/navigation";
import FinanceCalculator from "@/components/FinanceCalculator";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import { getCarById, getSimilar } from "@/lib/cars";

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // the [id] from the URL
  const car = getCarById(id);
  if (!car) notFound(); // shows Next.js's 404 page for bad ids

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/inventory" className="mb-4 inline-block text-muted transition hover:text-cyan-text">
        ← Back to inventory
      </Link>
      <img src={car.image} alt={car.model} className="aspect-[3/2] w-full rounded object-cover" />
      <h1 className="mt-4 text-3xl font-bold">
        {car.year} {car.make} {car.model}
      </h1>
      <p className="mt-1 text-3xl font-bold text-cyan-text">${car.price.toLocaleString()}</p>

      {/* Spec chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[car.year, `${car.mileage.toLocaleString()} km`, car.body, car.make].map((t) => (
          <span key={t} className="rounded-full border border-brand-gray/30 px-3 py-1 text-sm text-muted">
            {t}
          </span>
        ))}
      </div>

      {/* Opens the visitor's email app with the car's name pre-filled; swap in your real email */}
      <a
        href={`mailto:your@email.com?subject=Inquiry: ${car.year} ${car.make} ${car.model}`}
        className="mt-6 inline-block rounded bg-brand-cyan px-6 py-3 font-semibold text-brand-black transition hover:brightness-110">
        Inquire about this car
      </a>
      <FinanceCalculator price={car.price} />

      <h2 className="mb-4 mt-16 text-xl font-semibold">You may also like</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {getSimilar(car).map((c, i) => (
          <CarCard key={c.id} car={c} index={i} />
        ))}
      </div>
    </main>
  );
}

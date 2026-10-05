import { notFound } from "next/navigation";
import { getCarById } from "@/lib/cars";
import FinanceCalculator from "@/components/FinanceCalculator";

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;       // the [id] from the URL
  const car = getCarById(id);
  if (!car) notFound();              // shows Next.js's 404 page for bad ids

  return (
    <main className="mx-auto max-w-3xl p-6">
      <img src={car.image} alt={car.model} className="aspect-[3/2] w-full rounded object-cover" />
      <h1 className="mt-4 text-3xl font-bold">{car.year} {car.make} {car.model}</h1>
      <p className="text-xl">${car.price.toLocaleString()}</p>
      <p>{car.mileage.toLocaleString()} km</p>
     <FinanceCalculator price={car.price} />
    </main>
  );
}
import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    // The whole card links to that car's detail page
    <Link href={`/inventory/${car.id}`} className="block rounded-lg border p-4 hover:shadow-lg">
      <img src={car.image} alt={`${car.make} ${car.model}`} className="h-40 w-full rounded object-cover" />
      <h2 className="mt-2 font-semibold">{car.year} {car.make} {car.model}</h2>
      <p>${car.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{car.mileage.toLocaleString()} km</p>
    </Link>
  );
}
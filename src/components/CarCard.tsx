import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    // The whole card links to that car's detail page
    <Link
      href={`/inventory/${car.id}`}
      className="block rounded-lg border border-brand-gray/20 bg-white/5 p-4 transition hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(8,217,234,0.25)]"
    >
      {/* Red badge only shows for cars under 10,000 km */}
      {car.mileage < 10000 && (
        <span className="mb-2 inline-block rounded bg-brand-red px-2 py-0.5 text-xs font-bold uppercase text-white">
          Low km
        </span>
      )}
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="aspect-[3/2] w-full rounded object-cover"
      />
      <h2 className="mt-2 font-semibold">
        {car.year} {car.make} {car.model}
      </h2>
      <p className="font-semibold text-brand-cyan">
        ${car.price.toLocaleString()}
      </p>
      {/* Quick spec line: power and body style */}
      <p className="text-sm font-medium text-brand-gray">
        {car.hp} hp · {car.body}
      </p>
      <p className="text-sm text-brand-gray">
        {car.mileage.toLocaleString()} km
      </p>
    </Link>
  );
}

import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  return (
    // The whole card links to that car's detail page
    <Link
      href={`/inventory/${car.id}`}
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
      className="group fade-up block overflow-hidden rounded-xl border border-brand-gray/20 bg-card transition duration-300 hover:-translate-y-1 hover:border-brand-cyan hover:shadow-[0_8px_30px_rgba(8,217,234,0.2)]">
      <div className="relative overflow-hidden">
        <img src={car.image} alt={`${car.make} ${car.model}`} className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105" />
        {/* Red badge sits on top of the photo (absolute = positioned inside the wrapper) */}
        {car.mileage < 10000 && <span className="absolute left-3 top-3 rounded bg-brand-red px-2 py-0.5 text-xs font-bold uppercase text-white">Low km</span>}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-muted">{car.make}</p>
        <h2 className="text-lg font-semibold">
          {car.year} {car.model}
        </h2>
        <div className="mt-3 flex items-end justify-between border-t border-brand-gray/20 pt-3">
          <p className="text-xl font-bold text-cyan-text">${car.price.toLocaleString()}</p>
          <p className="text-sm text-muted">
            {car.mileage.toLocaleString()} km · {car.body}
          </p>
        </div>
      </div>
    </Link>
  );
}

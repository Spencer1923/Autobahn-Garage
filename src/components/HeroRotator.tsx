"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function HeroRotator({ cars }: { cars: Car[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Don't auto-rotate while hovering, or if the visitor prefers reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;

    // A timeout (not an interval): it re-runs whenever `index` changes,
    // so clicking a dot restarts the 5-second countdown
    const t = setTimeout(() => setIndex((i) => (i + 1) % cars.length), 8000);
    return () => clearTimeout(t);
  }, [index, paused, cars.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-brand-gray/20 shadow-[0_0_40px_rgba(8,217,234,0.15)]">
      {/* All slides are stacked; only the active one is visible, so they crossfade */}
      {cars.map((car, i) => (
        <Link
          key={car.id}
          href={`/inventory/${car.id}`}
          tabIndex={i === index ? 0 : -1}
          aria-hidden={i !== index}
          className={`group absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <img src={car.image} alt={`${car.make} ${car.model}`} className={`h-full w-full object-cover ${i === index ? "ken-burns" : ""}`} />
          <div style={{ animationDelay: "400ms" }} className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-5 ${i === index ? "fade-up" : ""}`}>
            <p className="text-xs uppercase tracking-widest text-brand-cyan">Featured</p>
            <p className="text-lg font-semibold text-white">
              {car.year} {car.make} {car.model}
            </p>
            <p className="mt-1 text-sm text-white/70">
              ${car.price.toLocaleString()} · {car.mileage.toLocaleString()} km
            </p>
          </div>
        </Link>
      ))}

      {/* Clickable dots (buttons, so they sit outside the links) */}
      <div className="absolute right-3 top-3 z-10 flex">
        {cars.map((car, i) => (
          <button
            key={car.id}
            onClick={() => setIndex(i)}
            aria-label={`Show ${car.make} ${car.model}`}
            className="p-1" // extra padding makes the tap target bigger
          >
            <span className={`block h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-brand-cyan" : "w-1.5 bg-white/50"}`} />
          </button>
        ))}
      </div>
      {/* Only shown when not hovering; remounts on every slide (key), so it restarts at 0 */}
      {!paused && <div key={index} className="hero-progress absolute bottom-0 left-0 z-10 h-0.5 bg-brand-cyan" />}
    </div>
  );
}

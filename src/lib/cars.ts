import carsData from "@/data/cars.json";

// Describes the shape of one car (TypeScript catches typos for us)
export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  hp: number;     // horsepower, shown on the card
  body: string;   // "SUV", "Coupe", "Sedan", "Wagon"
};

// Every filter is optional (?) because the user may leave any blank
export type Filters = {
  make?: string;
  model?: string;
  body?: string;       // "SUV", "Coupe", etc.
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
  sort?: string;       // e.g. "price-asc"
};

const cars: Car[] = carsData;

export function getCars(f: Filters = {}): Car[] {
  const results = cars.filter((car) =>
    (!f.make || car.make.toLowerCase() === f.make.toLowerCase()) &&
    (!f.model || car.model.toLowerCase().includes(f.model.toLowerCase())) &&
    (!f.body || car.body === f.body) &&                      // NEW
    (f.minPrice === undefined || car.price >= f.minPrice) &&
    (f.maxPrice === undefined || car.price <= f.maxPrice) &&
    (f.minYear === undefined || car.year >= f.minYear) &&
    (f.maxMileage === undefined || car.mileage <= f.maxMileage)
  );

  // sort() compares two cars (a, b): negative = a first, positive = b first
  switch (f.sort) {
    case "price-asc":   results.sort((a, b) => a.price - b.price); break;
    case "price-desc":  results.sort((a, b) => b.price - a.price); break;
    case "hp-desc":     results.sort((a, b) => b.hp - a.hp); break;
    case "year-desc":   results.sort((a, b) => b.year - a.year); break;
    case "mileage-asc": results.sort((a, b) => a.mileage - b.mileage); break;
  }
  return results;
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

// Unique makes for the dropdown (Set removes duplicates)
export function getMakes(): string[] {
  return [...new Set(cars.map((c) => c.make))].sort();
}

export function getBodies(): string[] {
  return [...new Set(cars.map((c) => c.body))].sort();
}
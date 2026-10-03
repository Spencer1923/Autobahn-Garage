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
};

// Every filter is optional (?) because the user may leave any blank
export type Filters = {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
};

const cars: Car[] = carsData;

export function getCars(f: Filters = {}): Car[] {
  return cars.filter((car) =>
    // Each line passes if the filter is empty OR the car matches it
    (!f.make || car.make.toLowerCase() === f.make.toLowerCase()) &&
    (!f.model || car.model.toLowerCase().includes(f.model.toLowerCase())) &&
    (f.minPrice === undefined || car.price >= f.minPrice) &&
    (f.maxPrice === undefined || car.price <= f.maxPrice) &&
    (f.minYear === undefined || car.year >= f.minYear) &&
    (f.maxMileage === undefined || car.mileage <= f.maxMileage)
  );
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

// Unique makes for the dropdown (Set removes duplicates)
export function getMakes(): string[] {
  return [...new Set(cars.map((c) => c.make))].sort();
}
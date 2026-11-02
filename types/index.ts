export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  transmission: string;
  drive: string;
  color: string;
  images: string[];
  description: string;
  isFeatured: boolean;
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  transmission?: string;
  yearMin?: number;
  yearMax?: number;
}

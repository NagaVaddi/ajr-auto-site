export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;        // USD
  priceJpy?: number;   // JPY (secondary display)
  mileage: number;     // km
  engine: string;
  transmission: string;
  drive: string;
  color: string;
  origin: 'Japan' | 'Korea';
  location?: string;   // city, e.g. "Tokyo", "Hiroshima"
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
  origin?: 'Japan' | 'Korea';
}

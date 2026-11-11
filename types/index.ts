export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  depositAmount: number;
  priceJpy?: number;
  status: 'Available' | 'Reserved' | 'Sold';
  mileage: number;
  engine: string;
  transmission: string;
  drive: string;
  color: string;
  origin: 'Japan' | 'Korea';
  location: string;
  auctionGrade: string;
  chassisCode?: string;
  images: string[];
  description: string;
  isFeatured: boolean;
}

import { NextResponse } from 'next/server';
import { Car } from '@/types';

const cars: Car[] = [
  {
    id: '1',
    brand: 'Porsche',
    model: '911 Carrera Cabrio Speedster',
    year: 1995,
    price: 284310,
    priceJpy: 45000000,
    mileage: 38000,
    engine: '3.6L / 272hp / Gasoline',
    transmission: 'Automatic 4AT',
    drive: 'Rear (FR)',
    color: 'Guards Red',
    origin: 'Japan',
    location: 'Hiroshima',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
    ],
    description:
      'Porsche 911 Carrera Cabrio Speedster 1995 — a rare classic with 22 service records, warranty booklet, and official Japanese import documentation. Limited to 74 units in Japan, German specification (Hiroshima). Open body style, Guards Red, Automatic 4AT transmission. Fully inspected, all history documented. A collector-grade icon in exceptional original condition.',
    isFeatured: true,
  },
  {
    id: '2',
    brand: 'Porsche',
    model: '911 Turbo 4WD',
    year: 1996,
    price: 315900,
    priceJpy: 50000000,
    mileage: 76000,
    engine: '3.6L / 408hp / Gasoline Premium',
    transmission: 'Manual 6MT',
    drive: 'AWD (4WD)',
    color: 'Speed Yellow',
    origin: 'Japan',
    location: 'Tokyo',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    ],
    description:
      'Porsche 911 Turbo 1996 in iconic Speed Yellow — AWD (4WD) coupe from Tokyo. Manual 6-speed, 3.6-litre twin-turbo flat-six producing 408hp. Coupe body, premium gasoline. 76,000 km with full maintenance history. One of the most sought-after air-cooled 993 Turbos available from Japan. All documentation in order.',
    isFeatured: true,
  },
  {
    id: '3',
    brand: 'Ferrari',
    model: '812 Superfast F1 DCT OP1065',
    year: 2020,
    price: 314636,
    priceJpy: 49800000,
    mileage: 4000,
    engine: '6.5L V12 / 800hp / Gasoline',
    transmission: '7-Speed F1 DCT',
    drive: 'Rear (FR)',
    color: 'Giallo Triplo Strato',
    origin: 'Japan',
    location: 'Kanagawa',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    ],
    description:
      'Ferrari 812 Superfast 2020 in exclusive Giallo Triplo Strato — OP1065 special order spec with 11-piece carbon package. F1 DCT 7-speed, 6.5L V12 making 800hp. Only 4,000 km from new. Rear-wheel drive coupe in Kanagawa. Pristine condition, never tracked. Full Ferrari service history. Extremely rare factory colour and carbon specification.',
    isFeatured: true,
  },
  {
    id: '4',
    brand: 'Ferrari',
    model: 'F8 Spider F1 DCT Carbon 7-Point',
    year: 2022,
    price: 305159,
    priceJpy: 48300000,
    mileage: 4000,
    engine: '3.9L V8 Twin-Turbo / 720hp',
    transmission: '7-Speed F1 DCT',
    drive: 'Rear (MR)',
    color: 'Grigio Scuro',
    origin: 'Japan',
    location: 'Kanagawa',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
    ],
    description:
      'Ferrari F8 Spider 2022 in Grigio Scuro — Carbon 7-Point package with Apple CarPlay. F1 DCT 7-speed, 3.9L twin-turbo V8 producing 720hp, mid-rear layout. Only 4,000 km, open-top spider body. Kanagawa-sourced with full Ferrari Japan service history. Premium gasoline. A stunning modern Ferrari in a sophisticated dark grey with extensive carbon trim.',
    isFeatured: true,
  },
  {
    id: '5',
    brand: 'Ferrari',
    model: 'F8 Spider F1 DCT Bianco Avus Rosso',
    year: 2023,
    price: 300737,
    priceJpy: 47600000,
    mileage: 2000,
    engine: '3.9L V8 Twin-Turbo / 720hp',
    transmission: '7-Speed F1 DCT',
    drive: 'Rear (MR)',
    color: 'Bianco Avus',
    origin: 'Japan',
    location: 'Tokyo',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    description:
      'Ferrari F8 Spider 2023 — Bianco Avus with Rosso Ferrari interior, front lift system. F1 DCT 7-speed, 3.9L twin-turbo V8 / 720hp. Only 2,000 km since new. Open-top spider, mid-rear drive. Tokyo sourced, full Ferrari Japan documentation. The white/red combination is one of the most classic and desirable Ferrari colour pairings.',
    isFeatured: true,
  },
  {
    id: '6',
    brand: 'Porsche',
    model: '911 Dakar PDK 4WD Sport Chrome',
    year: 2023,
    price: 287469,
    priceJpy: 45500000,
    mileage: 3000,
    engine: '3.0L Flat-6 Turbo / 480hp',
    transmission: 'PDK 8AT',
    drive: 'AWD (4WD)',
    color: 'Shade Green Metallic',
    origin: 'Japan',
    location: 'Nara',
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
      'https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=800&q=80',
    ],
    description:
      'Porsche 911 Dakar 2023 — PDK, AWD, Sport Chrome package, factory navigation, 360-degree camera, dash camera. Only 3,000 km. Shade Green Metallic, SUV/Dakar body. Nara Japan sourced, full Porsche Japan documentation. The 911 Dakar is Porsche\'s limited all-terrain 911, combining sports car performance with off-road capability.',
    isFeatured: true,
  },
  {
    id: '7',
    brand: 'Ferrari',
    model: 'F8 Spider F1 DCT',
    year: 2021,
    price: 286079,
    priceJpy: 45280000,
    mileage: 150,
    engine: '3.9L V8 Twin-Turbo / 720hp',
    transmission: '7-Speed F1 DCT',
    drive: 'Rear (MR)',
    color: 'Rosso Corsa',
    origin: 'Japan',
    location: 'Kanagawa',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    ],
    description:
      'Ferrari F8 Spider 2021 in classic Rosso Corsa — practically brand new with just 150 km. F1 DCT 7-speed, 3.9L twin-turbo V8 producing 720hp. Mid-rear drive, open-top spider. Kanagawa Japan sourced. Premium gasoline. This car is effectively unused — an extraordinary opportunity to acquire a near-new 720hp Ferrari at an exceptional price.',
    isFeatured: false,
  },
  {
    id: '8',
    brand: 'Ferrari',
    model: 'F8 Spider 7BA-F142CE',
    year: 2022,
    price: 298960,
    priceJpy: 46977000,
    mileage: 1505,
    engine: '3.9L V8 Twin-Turbo / 720hp',
    transmission: 'Automatic 7AT',
    drive: 'Rear (2WD)',
    color: 'Pearl White',
    origin: 'Japan',
    location: 'Auto Links, Saitama',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    ],
    description:
      'Ferrari F8 Spider 2022 (7BA-F142CE) in Pearl White — 1,505 km, 2 doors, gasoline, Automatic 7AT. Rear-wheel drive. Auto Links dealer, Saitama Japan. This is a nearly-new example in the most elegant Pearl White colour. Full Japanese service history, clean title. Available for immediate export. A rare low-mileage opportunity.',
    isFeatured: false,
  },
  {
    id: '9',
    brand: 'Hyundai',
    model: 'Genesis GV80 AWD',
    year: 2023,
    price: 67500,
    mileage: 12000,
    engine: '2.5L Turbo / 300hp / Gasoline',
    transmission: 'Automatic 8AT',
    drive: 'AWD',
    color: 'Himalayan Gray',
    origin: 'Korea',
    location: 'Seoul',
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    ],
    description:
      'Hyundai Genesis GV80 2023 — Korea\'s flagship luxury SUV in Himalayan Gray. 2.5L turbocharged engine / 300hp, AWD 8-speed automatic. 12,000 km from new. Loaded with premium features: quilted Nappa leather, 14.5" touchscreen, head-up display, smart park assist, Lexicon premium audio. Korean domestic spec, full Genesis Korea service history. Exceptional value vs European luxury SUVs.',
    isFeatured: true,
  },
  {
    id: '10',
    brand: 'Kia',
    model: 'EV6 GT RWD',
    year: 2023,
    price: 55900,
    mileage: 8500,
    engine: '77.4 kWh Electric / 585hp',
    transmission: 'Single-Speed Automatic',
    drive: 'Rear (RWD)',
    color: 'Snow White Pearl',
    origin: 'Korea',
    location: 'Busan',
    images: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    ],
    description:
      'Kia EV6 GT 2023 — Korea\'s performance EV in Snow White Pearl. 77.4 kWh battery, 585hp, 0-100 km/h in 3.5 seconds. 8,500 km from new. Single-speed automatic, rear-wheel drive. Busan Korea sourced, full Kia Korea service history. Features: 800V ultra-fast charging, augmented reality HUD, meridian audio, GT-specific suspension. Available for immediate export.',
    isFeatured: false,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const brand = searchParams.get('brand');
  const featured = searchParams.get('featured');
  const origin = searchParams.get('origin');

  if (id) {
    const car = cars.find((c) => c.id === id);
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }
    return NextResponse.json(car);
  }

  let filtered = [...cars];

  if (brand) {
    filtered = filtered.filter((c) => c.brand.toLowerCase() === brand.toLowerCase());
  }

  if (origin) {
    filtered = filtered.filter((c) => c.origin === origin);
  }

  if (featured === 'true') {
    filtered = filtered.filter((c) => c.isFeatured);
  }

  return NextResponse.json(filtered);
}

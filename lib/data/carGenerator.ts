import type { Car } from './cars';

// ── Image pools by brand ──────────────────────────────────────────────────────
const IMG = {
  P: ['1503376780353-7e6692767b70','1580274455191-1c62238fa333','1494976388531-d1058494cdd8','1544636331-e26879cd4d9b','1614162692292-7ac56d7f7f1e','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1555215695-3004980ad54e'],
  F: ['1592198084033-aade902d1aae','1570733117311-d990c3816c47','1565688534245-05d6b5be184a','1555215695-3004980ad54e','1503376780353-7e6692767b70','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1614162692292-7ac56d7f7f1e'],
  M: ['1618843479313-40f8afb4b4d8','1563720223185-11003d516935','1507003211169-0a1dd7228f2d','1555215695-3004980ad54e','1503376780353-7e6692767b70','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1614162692292-7ac56d7f7f1e'],
  L: ['1544636331-e26879cd4d9b','1580274455191-1c62238fa333','1494976388531-d1058494cdd8','1555215695-3004980ad54e','1565688534245-05d6b5be184a','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1614162692292-7ac56d7f7f1e'],
  B: ['1555215695-3004980ad54e','1503376780353-7e6692767b70','1580274455191-1c62238fa333','1614162692292-7ac56d7f7f1e','1544636331-e26879cd4d9b','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1565688534245-05d6b5be184a'],
  K: ['1619767886558-efdc259cde1a','1617788138017-80ad40651399','1555215695-3004980ad54e','1565688534245-05d6b5be184a','1503376780353-7e6692767b70','1552519507-da3b142c6e3d','1485291571150-772bcfc10da5','1614162692292-7ac56d7f7f1e'],
};

function imgs(pool: keyof typeof IMG, seed: number): string[] {
  const p = IMG[pool];
  const offset = seed % p.length;
  const rotated = [...p.slice(offset), ...p.slice(0, offset)];
  return rotated.map((id) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`);
}

// ── Deterministic pseudo-random ───────────────────────────────────────────────
function rand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return min + Math.floor((x - Math.floor(x)) * (max - min + 1));
}
function pick<T>(arr: T[], seed: number): T {
  return arr[rand(seed, 0, arr.length - 1)];
}

// ── Brand templates ───────────────────────────────────────────────────────────
const TEMPLATES = [
  // ── PORSCHE ──
  { brand: 'Porsche', model: '911 Carrera S',         basePrice: 165000, img: 'P', origin: 'Japan' as const, engine: '3.0L Twin-Turbo Flat-6', trans: 'PDK 8-Speed',          drive: 'RWD' },
  { brand: 'Porsche', model: '911 Carrera 4S',        basePrice: 178000, img: 'P', origin: 'Japan' as const, engine: '3.0L Twin-Turbo Flat-6', trans: 'PDK 8-Speed',          drive: 'AWD' },
  { brand: 'Porsche', model: '911 Turbo',             basePrice: 232000, img: 'P', origin: 'Japan' as const, engine: '3.7L Twin-Turbo Flat-6', trans: 'PDK 8-Speed',          drive: 'AWD' },
  { brand: 'Porsche', model: '911 Turbo S',           basePrice: 268000, img: 'P', origin: 'Japan' as const, engine: '3.7L Twin-Turbo Flat-6 (650hp)', trans: 'PDK 8-Speed',  drive: 'AWD' },
  { brand: 'Porsche', model: '911 GT3',               basePrice: 285000, img: 'P', origin: 'Japan' as const, engine: '4.0L NA Flat-6 (510hp)', trans: 'Manual 6-Speed',       drive: 'RWD' },
  { brand: 'Porsche', model: '911 GT3 RS',            basePrice: 342000, img: 'P', origin: 'Japan' as const, engine: '4.0L NA Flat-6 (525hp)', trans: 'PDK 7-Speed',          drive: 'RWD' },
  { brand: 'Porsche', model: '911 Carrera GTS',       basePrice: 192000, img: 'P', origin: 'Japan' as const, engine: '3.0L Twin-Turbo Flat-6 (480hp)', trans: 'PDK 8-Speed',  drive: 'RWD' },
  { brand: 'Porsche', model: '911 Targa 4S',          basePrice: 198000, img: 'P', origin: 'Japan' as const, engine: '3.0L Twin-Turbo Flat-6', trans: 'PDK 8-Speed',          drive: 'AWD' },
  { brand: 'Porsche', model: 'Taycan Turbo S',        basePrice: 215000, img: 'P', origin: 'Japan' as const, engine: '93.4kWh Dual Motor (761hp)', trans: 'Single-Speed',     drive: 'AWD' },
  { brand: 'Porsche', model: 'Taycan GTS',            basePrice: 178000, img: 'P', origin: 'Japan' as const, engine: '93.4kWh Dual Motor (590hp)', trans: 'Single-Speed',     drive: 'AWD' },
  { brand: 'Porsche', model: 'Boxster GTS 4.0',       basePrice: 112000, img: 'P', origin: 'Japan' as const, engine: '4.0L NA Flat-6 (400hp)', trans: 'PDK 7-Speed',          drive: 'RWD' },
  { brand: 'Porsche', model: 'Cayman GT4 RS',         basePrice: 198000, img: 'P', origin: 'Japan' as const, engine: '4.0L NA Flat-6 (500hp)', trans: 'PDK 7-Speed',          drive: 'RWD' },
  { brand: 'Porsche', model: 'Cayenne Turbo S E-Hybrid', basePrice: 225000, img: 'P', origin: 'Japan' as const, engine: '4.0L Biturbo V8 PHEV (680hp)', trans: 'Tiptronic 8-Speed', drive: 'AWD' },
  { brand: 'Porsche', model: 'Panamera 4S',           basePrice: 148000, img: 'P', origin: 'Japan' as const, engine: '2.9L Twin-Turbo V6 (440hp)', trans: 'PDK 8-Speed',      drive: 'AWD' },

  // ── FERRARI ──
  { brand: 'Ferrari', model: 'F8 Tributo',            basePrice: 275000, img: 'F', origin: 'Japan' as const, engine: '3.9L Twin-Turbo V8 (710hp)', trans: '7-Speed F1 DCT',   drive: 'RWD' },
  { brand: 'Ferrari', model: 'F8 Spider',             basePrice: 292000, img: 'F', origin: 'Japan' as const, engine: '3.9L Twin-Turbo V8 (710hp)', trans: '7-Speed F1 DCT',   drive: 'RWD' },
  { brand: 'Ferrari', model: '812 GTS',               basePrice: 338000, img: 'F', origin: 'Japan' as const, engine: '6.5L NA V12 (789hp)',        trans: '7-Speed F1 DCT',   drive: 'RWD' },
  { brand: 'Ferrari', model: 'Roma',                  basePrice: 258000, img: 'F', origin: 'Japan' as const, engine: '3.9L Twin-Turbo V8 (620hp)', trans: '8-Speed DCT',      drive: 'RWD' },
  { brand: 'Ferrari', model: 'Portofino M',           basePrice: 248000, img: 'F', origin: 'Japan' as const, engine: '3.9L Twin-Turbo V8 (620hp)', trans: '8-Speed DCT',      drive: 'RWD' },
  { brand: 'Ferrari', model: 'SF90 Stradale',         basePrice: 598000, img: 'F', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 Hybrid (1000hp)', trans: '8-Speed DCT', drive: 'AWD' },
  { brand: 'Ferrari', model: 'SF90 Spider',           basePrice: 625000, img: 'F', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 Hybrid (1000hp)', trans: '8-Speed DCT', drive: 'AWD' },
  { brand: 'Ferrari', model: '296 GTB',               basePrice: 295000, img: 'F', origin: 'Japan' as const, engine: '3.0L Twin-Turbo V6 Hybrid (830hp)', trans: '8-Speed DCT', drive: 'RWD' },
  { brand: 'Ferrari', model: '296 GTS',               basePrice: 318000, img: 'F', origin: 'Japan' as const, engine: '3.0L Twin-Turbo V6 Hybrid (830hp)', trans: '8-Speed DCT', drive: 'RWD' },
  { brand: 'Ferrari', model: 'GTC4Lusso',             basePrice: 285000, img: 'F', origin: 'Japan' as const, engine: '6.3L NA V12 (680hp)',        trans: '7-Speed F1 DCT',   drive: 'AWD' },

  // ── MERCEDES-AMG ──
  { brand: 'Mercedes-AMG', model: 'GT 63 S 4-Door',  basePrice: 195000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (630hp)', trans: 'AMG SPEEDSHIFT MCT 9-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'GT R',             basePrice: 185000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (577hp)', trans: 'AMG SPEEDSHIFT DCT 7-Speed', drive: 'RWD' },
  { brand: 'Mercedes-AMG', model: 'GT S Roadster',    basePrice: 198000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (522hp)', trans: 'AMG SPEEDSHIFT DCT 7-Speed', drive: 'RWD' },
  { brand: 'Mercedes-AMG', model: 'C 63 S',          basePrice: 115000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (510hp)', trans: 'AMG SPEEDSHIFT MCT 9-Speed', drive: 'RWD' },
  { brand: 'Mercedes-AMG', model: 'C 63 S Estate',   basePrice: 118000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (510hp)', trans: 'AMG SPEEDSHIFT MCT 9-Speed', drive: 'RWD' },
  { brand: 'Mercedes-AMG', model: 'E 63 S',          basePrice: 142000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (612hp)', trans: 'AMG SPEEDSHIFT MCT 9-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'GLE 63 S Coupé',  basePrice: 175000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (612hp)', trans: 'AMG SPEEDSHIFT TCT 9-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'GLS 63',          basePrice: 198000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (612hp)', trans: 'AMG SPEEDSHIFT TCT 9-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'SL 55',           basePrice: 185000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (476hp)', trans: 'AMG SPEEDSHIFT MCT 9-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'A 45 S',          basePrice: 78000,  img: 'M', origin: 'Japan' as const, engine: '2.0L Turbo 4-Cyl (421hp)', trans: 'AMG SPEEDSHIFT DCT 8-Speed', drive: 'AWD' },
  { brand: 'Mercedes-AMG', model: 'CLA 45 S',        basePrice: 82000,  img: 'M', origin: 'Japan' as const, engine: '2.0L Turbo 4-Cyl (421hp)', trans: 'AMG SPEEDSHIFT DCT 8-Speed', drive: 'AWD' },

  // ── LAMBORGHINI ──
  { brand: 'Lamborghini', model: 'Huracán EVO',       basePrice: 268000, img: 'L', origin: 'Japan' as const, engine: '5.2L NA V10 (640hp)',       trans: 'LDF DCT 7-Speed',   drive: 'AWD' },
  { brand: 'Lamborghini', model: 'Huracán EVO Spyder', basePrice: 285000, img: 'L', origin: 'Japan' as const, engine: '5.2L NA V10 (640hp)',      trans: 'LDF DCT 7-Speed',   drive: 'AWD' },
  { brand: 'Lamborghini', model: 'Huracán EVO RWD',   basePrice: 248000, img: 'L', origin: 'Japan' as const, engine: '5.2L NA V10 (610hp)',       trans: 'LDF DCT 7-Speed',   drive: 'RWD' },
  { brand: 'Lamborghini', model: 'Huracán STO',       basePrice: 325000, img: 'L', origin: 'Japan' as const, engine: '5.2L NA V10 (640hp)',       trans: 'LDF DCT 7-Speed',   drive: 'RWD' },
  { brand: 'Lamborghini', model: 'Urus',              basePrice: 248000, img: 'L', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (650hp)',   trans: '8-Speed Automatic', drive: 'AWD' },
  { brand: 'Lamborghini', model: 'Urus S',            basePrice: 268000, img: 'L', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (666hp)',   trans: '8-Speed Automatic', drive: 'AWD' },

  // ── BENTLEY ──
  { brand: 'Bentley', model: 'Continental GT V8',     basePrice: 248000, img: 'B', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 (550hp)', trans: 'DCT 8-Speed',      drive: 'AWD' },
  { brand: 'Bentley', model: 'Continental GT Speed',  basePrice: 318000, img: 'B', origin: 'Japan' as const, engine: '6.0L W12 TSI (659hp)',       trans: 'DCT 8-Speed',      drive: 'AWD' },
  { brand: 'Bentley', model: 'Continental GTC V8',    basePrice: 265000, img: 'B', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 (550hp)', trans: 'DCT 8-Speed',      drive: 'AWD' },
  { brand: 'Bentley', model: 'Bentayga V8',           basePrice: 228000, img: 'B', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 (550hp)', trans: '8-Speed Automatic', drive: 'AWD' },
  { brand: 'Bentley', model: 'Flying Spur V8',        basePrice: 215000, img: 'B', origin: 'Japan' as const, engine: '4.0L Twin-Turbo V8 (550hp)', trans: 'DCT 8-Speed',      drive: 'AWD' },
  { brand: 'Bentley', model: 'Flying Spur W12',       basePrice: 258000, img: 'B', origin: 'Japan' as const, engine: '6.0L W12 TSI (635hp)',       trans: 'DCT 8-Speed',      drive: 'AWD' },
  { brand: 'Bentley', model: 'Mulsanne',              basePrice: 342000, img: 'B', origin: 'Japan' as const, engine: '6.75L Twin-Turbo V8 (512hp)', trans: 'ZF 8-Speed Automatic', drive: 'RWD' },

  // ── BMW ──
  { brand: 'BMW', model: 'M3 Competition',            basePrice: 112000, img: 'M', origin: 'Japan' as const, engine: '3.0L M TwinPower Turbo I6 (510hp)', trans: 'M DCT 8-Speed', drive: 'RWD' },
  { brand: 'BMW', model: 'M3 Competition xDrive',     basePrice: 118000, img: 'M', origin: 'Japan' as const, engine: '3.0L M TwinPower Turbo I6 (510hp)', trans: 'M DCT 8-Speed', drive: 'AWD' },
  { brand: 'BMW', model: 'M4 Competition',            basePrice: 115000, img: 'M', origin: 'Japan' as const, engine: '3.0L M TwinPower Turbo I6 (510hp)', trans: 'M DCT 8-Speed', drive: 'RWD' },
  { brand: 'BMW', model: 'M4 Competition Convertible', basePrice: 128000, img: 'M', origin: 'Japan' as const, engine: '3.0L M TwinPower Turbo I6 (510hp)', trans: 'M DCT 8-Speed', drive: 'AWD' },
  { brand: 'BMW', model: 'M5 Competition',            basePrice: 148000, img: 'M', origin: 'Japan' as const, engine: '4.4L M TwinPower Turbo V8 (625hp)', trans: 'M DCT 8-Speed', drive: 'AWD' },
  { brand: 'BMW', model: 'M8 Competition Gran Coupé', basePrice: 175000, img: 'M', origin: 'Japan' as const, engine: '4.4L M TwinPower Turbo V8 (625hp)', trans: 'M DCT 8-Speed', drive: 'AWD' },
  { brand: 'BMW', model: 'iX M60',                   basePrice: 148000, img: 'M', origin: 'Japan' as const, engine: '111.5kWh Dual Motor (619hp)', trans: 'Single-Speed',      drive: 'AWD' },
  { brand: 'BMW', model: 'XM',                       basePrice: 185000, img: 'M', origin: 'Japan' as const, engine: '4.4L M TwinPower Turbo V8 PHEV (653hp)', trans: 'M Steptronic 8-Speed', drive: 'AWD' },

  // ── MERCEDES-BENZ ──
  { brand: 'Mercedes-Benz', model: 'S 500 4Matic',   basePrice: 148000, img: 'M', origin: 'Japan' as const, engine: '3.0L Turbo I6 MHEV (435hp)',  trans: '9G-Tronic Automatic', drive: 'AWD' },
  { brand: 'Mercedes-Benz', model: 'S 580 4Matic',   basePrice: 178000, img: 'M', origin: 'Japan' as const, engine: '4.0L Biturbo V8 (503hp)',      trans: '9G-Tronic Automatic', drive: 'AWD' },
  { brand: 'Mercedes-Benz', model: 'GLE 450 4Matic', basePrice: 95000,  img: 'M', origin: 'Japan' as const, engine: '3.0L Turbo I6 MHEV (367hp)',   trans: '9G-Tronic Automatic', drive: 'AWD' },
  { brand: 'Mercedes-Benz', model: 'CLS 450 4Matic', basePrice: 118000, img: 'M', origin: 'Japan' as const, engine: '3.0L Turbo I6 MHEV (367hp)',   trans: '9G-Tronic Automatic', drive: 'AWD' },
  { brand: 'Mercedes-Benz', model: 'EQS 450+',       basePrice: 128000, img: 'M', origin: 'Japan' as const, engine: '107.8kWh Rear Motor (333hp)',   trans: 'Single-Speed',       drive: 'RWD' },

  // ── MASERATI ──
  { brand: 'Maserati', model: 'MC20',                 basePrice: 258000, img: 'M', origin: 'Japan' as const, engine: '3.0L Twin-Turbo V6 Nettuno (630hp)', trans: 'DCT 8-Speed', drive: 'RWD' },
  { brand: 'Maserati', model: 'Levante Trofeo',       basePrice: 148000, img: 'M', origin: 'Japan' as const, engine: '3.8L Twin-Turbo V8 (580hp)',   trans: '8-Speed Automatic', drive: 'AWD' },
  { brand: 'Maserati', model: 'Quattroporte Trofeo',  basePrice: 165000, img: 'M', origin: 'Japan' as const, engine: '3.8L Twin-Turbo V8 (580hp)',   trans: '8-Speed Automatic', drive: 'RWD' },
  { brand: 'Maserati', model: 'GranTurismo Trofeo',   basePrice: 198000, img: 'M', origin: 'Japan' as const, engine: '3.0L Twin-Turbo V6 Nettuno (550hp)', trans: 'DCT 8-Speed', drive: 'RWD' },
];

const COLORS = [
  'Guards Red', 'Jet Black', 'Arctic White', 'Midnight Blue Metallic', 'Silver Metallic',
  'Racing Yellow', 'Shark Blue Metallic', 'Frozen Black Metallic', 'Carmine Red',
  'Pebble Grey', 'Dark Green Metallic', 'Blu Pozzi', 'Giallo Modena', 'Rosso Corsa',
  'Bianco Avus', 'Verde Mantis', 'Patagonia Red Metallic', 'Obsidian Black Metallic',
  'Viridian', 'Moonbeam', 'Cambrian Grey', 'Marina Bay Blue Metallic', 'Frozen Brilliant White',
  'Arancio Borealis', 'Giallo Inti', 'Blu Nethuns',
];

const JAPAN_CITIES = [
  'Tokyo, Japan', 'Osaka, Japan', 'Yokohama, Japan', 'Nagoya, Japan',
  'Kobe, Japan', 'Kyoto, Japan', 'Fukuoka, Japan', 'Sapporo, Japan',
];

const KOREA_CITIES = ['Seoul, Korea', 'Busan, Korea', 'Incheon, Korea'];

const GRADES = ['5', '4.5', '4', '3.5'];
const STATUS_WEIGHTS: Car['status'][] = ['Available', 'Available', 'Available', 'Available', 'Reserved', 'Sold'];

function slug(brand: string, model: string, year: number, seed: number): string {
  const b = brand.toLowerCase().replace(/[\s-]+/g, '-');
  const m = model.toLowerCase().replace(/[\s()]+/g, '-').replace(/-+/g, '-').replace(/-$/, '');
  return `${b}-${m}-${year}-${seed}`;
}

export function generateCars(): Car[] {
  const cars: Car[] = [];
  let globalSeed = 1000;

  for (const tmpl of TEMPLATES) {
    const isKorea = tmpl.brand === 'Hyundai' || tmpl.brand === 'Kia';
    const yearRange = tmpl.brand === 'Porsche' && tmpl.model.includes('964') ? [1990, 1995]
      : tmpl.brand === 'Porsche' && tmpl.model.includes('993') ? [1993, 1998]
      : tmpl.brand === 'Maserati' && tmpl.model.includes('GranTurismo') ? [2007, 2017]
      : [2017, 2023];

    const count = tmpl.basePrice > 400000 ? 2 : tmpl.basePrice > 200000 ? 5 : tmpl.basePrice > 100000 ? 8 : 12;

    for (let i = 0; i < count; i++) {
      const seed = globalSeed++;
      const year = rand(seed, yearRange[0], yearRange[1]);
      const mileageFactor = (2024 - year);
      const mileage = rand(seed + 1, mileageFactor * 1500, mileageFactor * 9500);
      const priceVar = rand(seed + 2, -15000, 25000);
      const price = Math.round((tmpl.basePrice + priceVar) / 100) * 100;
      const color = pick(COLORS, seed + 3);
      const grade = pick(GRADES, seed + 4);
      const status = pick(STATUS_WEIGHTS, seed + 5);
      const locationPool = isKorea ? KOREA_CITIES : JAPAN_CITIES;
      const location = pick(locationPool, seed + 6);
      const imgPool = tmpl.img as keyof typeof IMG;

      cars.push({
        id: slug(tmpl.brand, tmpl.model, year, seed),
        brand: tmpl.brand,
        model: tmpl.model,
        year,
        price,
        depositAmount: price < 100000 ? 2000 : price < 200000 ? 5000 : 7500,
        priceJpy: Math.round(price * 149.5),
        status,
        mileage,
        engine: tmpl.engine,
        transmission: tmpl.trans,
        drive: tmpl.drive,
        color,
        origin: tmpl.origin,
        location,
        auctionGrade: grade,
        images: imgs(imgPool, seed),
        description: `${year} ${tmpl.brand} ${tmpl.model} in ${color}. ${tmpl.engine}, ${tmpl.trans}. ${mileage.toLocaleString('en-US')} km from new. Auction grade ${grade} — sourced directly from ${location}. Full service history available. Worldwide container shipping from AJR Auto Cars.`,
        isFeatured: false,
      });
    }
  }

  return cars;
}

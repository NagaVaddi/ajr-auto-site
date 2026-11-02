import { NextResponse } from 'next/server';
import { Car } from '@/types';

const cars: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2021,
    price: 2450000,
    mileage: 42000,
    engine: '2.5 л / 181 л.с. / Бензин',
    transmission: 'Автомат',
    drive: 'Передний',
    color: 'Белый перламутр',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80',
    ],
    description:
      'Toyota Camry 2021 года в отличном состоянии. Один владелец, полная история обслуживания в официальном дилере. Комплектация Prestige: кожаный салон, панорамная крыша, подогрев всех сидений, камера 360°, адаптивный круиз-контроль. Без аварий и крашей по данным ГИБДД. Юридически чистый, готов к переоформлению.',
    isFeatured: true,
  },
  {
    id: '2',
    brand: 'Kia',
    model: 'Rio',
    year: 2022,
    price: 1250000,
    mileage: 28000,
    engine: '1.6 л / 123 л.с. / Бензин',
    transmission: 'Автомат',
    drive: 'Передний',
    color: 'Серебристый',
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
      'https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=800&q=80',
    ],
    description:
      'Kia Rio 2022 года — один из самых популярных городских автомобилей. Экономичный двигатель 1.6 л, расход 7.2 л/100 км. Комплектация Luxe: климат-контроль, подогрев сидений и руля, мультимедиа с CarPlay и Android Auto. Состояние идеальное, без ДТП. Обслуживался у официального дилера Kia.',
    isFeatured: true,
  },
  {
    id: '3',
    brand: 'Hyundai',
    model: 'Solaris',
    year: 2021,
    price: 1180000,
    mileage: 55000,
    engine: '1.6 л / 123 л.с. / Бензин',
    transmission: 'Автомат',
    drive: 'Передний',
    color: 'Красный',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    description:
      'Hyundai Solaris 2021 года — надёжный и экономичный седан. Комплектация Elegance: автоматическая коробка, климат-контроль, задний парктроник, обогрев зеркал и лобового стекла. Регулярное ТО у дилера, замена масла, тормозных колодок. Отличный вариант для города и трассы.',
    isFeatured: true,
  },
  {
    id: '4',
    brand: 'BMW',
    model: '5 Series',
    year: 2020,
    price: 4200000,
    mileage: 68000,
    engine: '2.0 л / 190 л.с. / Бензин',
    transmission: 'Автомат',
    drive: 'Задний',
    color: 'Чёрный сапфир',
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    ],
    description:
      'BMW 5 серии 2020 года в комплектации M Sport. Автомобиль класса бизнес с богатым оснащением: кожаный салон Merino, адаптивная подвеска, проекция на лобовое стекло, система ночного видения, массаж передних сидений. Один владелец, корпоративный. Полная история в BMW Group. Без аварий.',
    isFeatured: true,
  },
  {
    id: '5',
    brand: 'Volkswagen',
    model: 'Polo',
    year: 2023,
    price: 1420000,
    mileage: 12000,
    engine: '1.6 л / 110 л.с. / Бензин',
    transmission: 'Механика',
    drive: 'Передний',
    color: 'Синий металлик',
    images: [
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    ],
    description:
      'Volkswagen Polo 2023 года — практически новый автомобиль с минимальным пробегом. Комплектация Respect Plus: мультимедийная система MIB 3, камера заднего вида, датчики дождя и света, светодиодные фары. Состояние нового автомобиля. Гарантия производителя действует до 2026 года.',
    isFeatured: true,
  },
  {
    id: '6',
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2019,
    price: 3850000,
    mileage: 92000,
    engine: '2.0 л / 211 л.с. / Бензин',
    transmission: 'Автомат',
    drive: 'Задний',
    color: 'Графитовый серый',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
    ],
    description:
      'Mercedes-Benz E-Class 2019 года в комплектации Avantgarde. Автомобиль прошёл полное техническое обслуживание в авторизованном сервисе Mercedes-Benz. Оснащён: двухзонный климат-контроль, система MBUX, подогрев/вентиляция сидений, пневмоподвеска AIRMATIC, система помощи при перестроении. Документы в порядке, без обременений.',
    isFeatured: true,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const brand = searchParams.get('brand');
  const featured = searchParams.get('featured');

  if (id) {
    const car = cars.find((c) => c.id === id);
    if (!car) {
      return NextResponse.json({ error: 'Автомобиль не найден' }, { status: 404 });
    }
    return NextResponse.json(car);
  }

  let filtered = [...cars];

  if (brand) {
    filtered = filtered.filter((c) => c.brand.toLowerCase() === brand.toLowerCase());
  }

  if (featured === 'true') {
    filtered = filtered.filter((c) => c.isFeatured);
  }

  return NextResponse.json(filtered);
}

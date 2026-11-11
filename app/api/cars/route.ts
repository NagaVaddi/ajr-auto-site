import { NextResponse } from 'next/server';
import { carsData } from '@/lib/data/cars';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const featured = searchParams.get('featured');
  const origin = searchParams.get('origin');
  const status = searchParams.get('status');
  const brand = searchParams.get('brand');

  if (id) {
    const car = carsData.find((c) => c.id === id);
    if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(car);
  }

  let results = [...carsData];

  if (featured === 'true') results = results.filter((c) => c.isFeatured);
  if (origin) results = results.filter((c) => c.origin === origin);
  if (status) results = results.filter((c) => c.status === status);
  if (brand) results = results.filter((c) => c.brand.toLowerCase() === brand.toLowerCase());

  return NextResponse.json(results);
}

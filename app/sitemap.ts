import { MetadataRoute } from 'next';
import { Car } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://avto-brand.ru';

async function getCars(): Promise<Car[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cars`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const carPages: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${BASE_URL}/catalog/${car.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...carPages];
}

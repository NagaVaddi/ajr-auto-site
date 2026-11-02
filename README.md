# АВТО БРЕНД — Russian Automotive B2C Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS production-ready automotive dealer website.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
```

Set the base URL in `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Project Structure

```
app/
  page.tsx                  # Homepage (Hero, Featured Cars, Trust Bar)
  catalog/
    page.tsx                # Catalog with filters & sorting
    [id]/page.tsx           # Vehicle detail page
  about/page.tsx            # About / Contacts
  api/cars/route.ts         # ← REPLACE THIS with your real data feed
  sitemap.ts                # Auto-generated XML sitemap
components/
  Header.tsx
  Footer.tsx
  CarCard.tsx
  HeroSection.tsx
  TrustBar.tsx
types/index.ts              # Car interface
lib/utils.ts                # formatPrice, formatMileage helpers
```

---

## Connecting a Real Data Feed

### Option A: Python Avito Scraper → PostgreSQL → Next.js API

**Step 1 — Scrape and store data**

```python
# scraper/avito_scraper.py
import requests, psycopg2, json

AVITO_URL = "https://www.avito.ru/brands/..."  # your Avito brand URL

def scrape_avito():
    headers = {"User-Agent": "Mozilla/5.0 ..."}
    # Use Avito's unofficial JSON endpoint or a headless browser
    # Example using their search API:
    resp = requests.get(
        "https://api.avito.ru/core/v1/items",
        params={"categoryId": 9, "locationId": 637640},  # Moscow cars
        headers=headers
    )
    return resp.json()

def save_to_db(cars):
    conn = psycopg2.connect(
        host="localhost", dbname="autobrand", user="postgres", password="secret"
    )
    cur = conn.cursor()
    for car in cars:
        cur.execute("""
            INSERT INTO cars (id, brand, model, year, price, mileage,
                              engine, transmission, drive, color,
                              images, description, is_featured)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            ON CONFLICT (id) DO UPDATE SET
                price = EXCLUDED.price,
                mileage = EXCLUDED.mileage;
        """, (
            car["id"], car["brand"], car["model"], car["year"],
            car["price"], car["mileage"], car["engine"], car["transmission"],
            car["drive"], car["color"], json.dumps(car["images"]),
            car["description"], car.get("isFeatured", False)
        ))
    conn.commit()
```

**Step 2 — Replace the mock API route**

Edit `app/api/cars/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const brand = searchParams.get('brand');
  const featured = searchParams.get('featured');

  let query = 'SELECT * FROM cars WHERE 1=1';
  const values: unknown[] = [];

  if (id) {
    values.push(id);
    query += ` AND id = $${values.length}`;
  }
  if (brand) {
    values.push(brand);
    query += ` AND brand = $${values.length}`;
  }
  if (featured === 'true') {
    query += ' AND is_featured = true';
  }

  const { rows } = await pool.query(query, values);

  if (id) {
    if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rows[0]);
  }

  return NextResponse.json(rows);
}
```

Add to `.env.local`:

```env
DATABASE_URL=postgresql://postgres:secret@localhost:5432/autobrand
```

---

### Option B: Direct Avito API (if you have an Avito Pro account)

Avito provides a Partner API for dealers. Docs: https://developers.avito.ru/

```typescript
// app/api/cars/route.ts — Avito API version
import { NextResponse } from 'next/server';

const AVITO_CLIENT_ID = process.env.AVITO_CLIENT_ID!;
const AVITO_CLIENT_SECRET = process.env.AVITO_CLIENT_SECRET!;
const AVITO_USER_ID = process.env.AVITO_USER_ID!;

async function getAvitoToken(): Promise<string> {
  const res = await fetch('https://api.avito.ru/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: AVITO_CLIENT_ID,
      client_secret: AVITO_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  const token = await getAvitoToken();
  const res = await fetch(
    `https://api.avito.ru/core/v1/accounts/${AVITO_USER_ID}/items/?per_page=50&status=active`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } }
  );
  const data = await res.json();

  // Map Avito's response to our Car interface
  const cars = data.resources.map((item: AvitoItem) => ({
    id: String(item.id),
    brand: item.title.split(' ')[0],
    model: item.title.split(' ').slice(1, -1).join(' '),
    year: parseInt(item.title.split(' ').pop() || '0'),
    price: item.price,
    mileage: item.params?.find((p: AvitoParam) => p.id === 'run')?.value || 0,
    engine: item.params?.find((p: AvitoParam) => p.id === 'engine')?.value || '',
    transmission: item.params?.find((p: AvitoParam) => p.id === 'kpp')?.value || '',
    drive: item.params?.find((p: AvitoParam) => p.id === 'privod')?.value || '',
    color: item.params?.find((p: AvitoParam) => p.id === 'color')?.value || '',
    images: item.images?.map((img: AvitoImage) => img.sizes['1280x960'] || img.sizes['640x480']) || [],
    description: item.description || '',
    isFeatured: false,
  }));

  return NextResponse.json(cars);
}
```

Add to `.env.local`:

```env
AVITO_CLIENT_ID=your_client_id
AVITO_CLIENT_SECRET=your_client_secret
AVITO_USER_ID=your_user_id
```

---

### Option C: Scheduled Sync (Cron + JSON file)

For a no-database approach, have a Python script write a `data/cars.json` file
that the API route reads:

```python
# sync.py — run via cron every 15 minutes
import json, requests
cars = fetch_from_avito()  # your fetch logic
with open("public/data/cars.json", "w", encoding="utf-8") as f:
    json.dump(cars, f, ensure_ascii=False)
```

```typescript
// app/api/cars/route.ts
import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'cars.json');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  return NextResponse.json(data);
}
```

---

## SEO Features

| Feature | Location |
|---|---|
| `generateMetadata` | All pages |
| JSON-LD AutoDealer schema | `app/page.tsx` |
| JSON-LD Vehicle schema | `app/catalog/[id]/page.tsx` |
| Dynamic XML sitemap | `app/sitemap.ts` |
| Russian meta descriptions | All pages |
| `next/image` with Russian alt tags | `CarCard`, vehicle detail |
| Canonical URLs | via `metadataBase` in `layout.tsx` |

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Used for internal API fetches & sitemap |
| `DATABASE_URL` | — | PostgreSQL connection string (Option A) |
| `AVITO_CLIENT_ID` | — | Avito Partner API client ID (Option B) |
| `AVITO_CLIENT_SECRET` | — | Avito Partner API secret (Option B) |
| `AVITO_USER_ID` | — | Your Avito seller/dealer user ID (Option B) |

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#0A2540` | Headers, text, nav |
| CTA Red | `#E53E3E` | Primary buttons, price highlights |
| WhatsApp Green | `#25D366` | WhatsApp CTAs |
| Background | `#F8FAFC` | Page background |
| Card White | `#FFFFFF` | Cards, panels |
| Font | Inter (Cyrillic) | All text |

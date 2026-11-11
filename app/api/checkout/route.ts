import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { carId, depositAmount, locale } = body as { carId: string; depositAmount: number; locale?: string };

  if (!carId || !depositAmount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const loc = locale || 'en';

  // When STRIPE_SECRET_KEY is set, install the `stripe` npm package and
  // uncomment the block below to enable real payments.
  //
  // const Stripe = require('stripe');
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const baseUrl = process.env.BASE_URL || 'https://ajrautocars.netlify.app';
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [{ price_data: { currency: 'usd',
  //     product_data: { name: `Deposit — ${carId}` },
  //     unit_amount: depositAmount * 100 }, quantity: 1 }],
  //   mode: 'payment',
  //   success_url: `${baseUrl}/${loc}/success?car=${carId}`,
  //   cancel_url: `${baseUrl}/${loc}/inventory/${carId}`,
  // });
  // return NextResponse.json({ url: session.url });

  return NextResponse.json({
    url: `/${loc}/success?car=${encodeURIComponent(carId)}&amount=${depositAmount}`,
    mock: true,
  });
}

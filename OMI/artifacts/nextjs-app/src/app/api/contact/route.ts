import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0),
});

const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, timestamps] of ipTimestamps) {
    if (timestamps.every((t) => now - t >= 60_000)) {
      ipTimestamps.delete(key);
    }
  }
  const hits = (ipTimestamps.get(ip) ?? []).filter((t) => now - t < 60_000);
  hits.push(now);
  ipTimestamps.set(ip, hits);
  return hits.length > 3;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip))
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });

  const { name, email, message } = result.data;
  if (process.env.NODE_ENV !== 'production') {
    console.log('Contact form:', { name, email, message }); // dev only — replace with SMTP
  }

  return NextResponse.json({ success: true });
}

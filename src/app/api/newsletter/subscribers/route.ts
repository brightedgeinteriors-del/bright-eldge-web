import { NextResponse } from 'next/server';
import { connectToDatabase, NewsletterSubscriberModel } from '../../../../lib/db';

// GET: return list of newsletter subscribers
export async function GET() {
  try {
    await connectToDatabase();
    const subscribers = await NewsletterSubscriberModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(subscribers, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/newsletter/subscribers error:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch subscribers' }, { status: 500 });
  }
}

// POST: subscribe to newsletter
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!(email.toLowerCase().endsWith('@gmail.com') || email.toLowerCase().endsWith('@yahoo.com'))) {
      return NextResponse.json({ error: 'Email must end with @gmail.com or @yahoo.com' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if already subscribed
    const existing = await NewsletterSubscriberModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      // If unsubscribed, reactivate
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        await existing.save();
        return NextResponse.json({ success: true, subscriber: existing }, { status: 200 });
      }
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    // Create new subscriber
    const subscriber = await NewsletterSubscriberModel.create({
      email: email.toLowerCase(),
      name,
      status: 'active',
      source: 'Website',
    });

    return NextResponse.json({ success: true, subscriber }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/newsletter/subscribers error:', err);
    return NextResponse.json({ error: err.message || 'Failed to subscribe' }, { status: 500 });
  }
}

// PATCH: update subscriber status (unsubscribe)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, status } = body;

    if (!email || !status || !['active', 'unsubscribed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    await connectToDatabase();
    const subscriber = await NewsletterSubscriberModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { status },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, subscriber }, { status: 200 });
  } catch (err: any) {
    console.error('PATCH /api/newsletter/subscribers error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update subscriber' }, { status: 500 });
  }
}
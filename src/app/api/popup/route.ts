import { NextResponse } from 'next/server';
import { connectToDatabase, PopupModel } from '../../../lib/db';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await PopupModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/popup error:', err);
    return NextResponse.json({ error: 'Failed to fetch popup submissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body || {};

    if (!name || !email || !projectType) {
      return NextResponse.json({ error: 'Name, email and projectType are required' }, { status: 400 });
    }

    const lower = String(email).toLowerCase();
    if (!(lower.endsWith('@gmail.com') || lower.endsWith('@yahoo.com'))) {
      return NextResponse.json({ error: 'Email must end with @gmail.com or @yahoo.com' }, { status: 400 });
    }

    if (phone) {
      const digits = String(phone).replace(/\D/g, '');
      if (!/^\d{10}$/.test(digits)) {
        return NextResponse.json({ error: 'Phone number must be 10 digits' }, { status: 400 });
      }
    }

    await connectToDatabase();
    const created = await PopupModel.create({
      name,
      email: lower,
      phone: phone || '',
      projectType,
      message: message || '',
    });

    console.log('Popup created with id:', created._id?.toString());

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/popup error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create popup submission' }, { status: 500 });
  }
}

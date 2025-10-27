import { NextResponse } from 'next/server';
import { connectToDatabase, ContactModel } from '../../../lib/db';

// GET: return list of contacts
export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await ContactModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(contacts, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/contacts error', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch contacts' }, { status: 500 });
  }
}

// POST: create a new contact
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, projectType } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase();
    if (!(lowerEmail.endsWith('@gmail.com') || lowerEmail.endsWith('@yahoo.com'))) {
      return NextResponse.json({ error: 'Email must end with @gmail.com or @yahoo.com' }, { status: 400 });
    }

    if (phone) {
      const digits = phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(digits)) {
        return NextResponse.json({ error: 'Phone number must be 10 digits' }, { status: 400 });
      }
    }

    await connectToDatabase();
    const created = await ContactModel.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      message,
      projectType: projectType || 'residential',
      status: 'new',
    });

    // Log the created id to help debug persistence
    try {
      console.log('Contact created with id:', (created as any)._id?.toString?.() || created);
    } catch (logErr) {
      console.log('Contact created (could not read id):', created);
    }

    return NextResponse.json({ success: true, contact: created }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/contacts error', err);
    return NextResponse.json({ error: err.message || 'Failed to create contact' }, { status: 500 });
  }
}

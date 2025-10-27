import { NextResponse } from 'next/server';
import { connectToDatabase, NewsletterCampaignModel } from '../../../../lib/db';

// GET: return list of newsletter campaigns
export async function GET() {
  try {
    await connectToDatabase();
    const campaigns = await NewsletterCampaignModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(campaigns, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/newsletter/campaigns error:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch campaigns' }, { status: 500 });
  }
}

// POST: create a new campaign
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, content, recipients = 'all' } = body;

    if (!subject || !content) {
      return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const campaign = await NewsletterCampaignModel.create({
      subject,
      content,
      status: 'draft',
      recipients: 0,
      openRate: 0,
      clickRate: 0
    });

    return NextResponse.json({ success: true, campaign }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/newsletter/campaigns error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create campaign' }, { status: 500 });
  }
}

// PATCH: send a campaign
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const campaign = await NewsletterCampaignModel.findByIdAndUpdate(
      id,
      { 
        status: 'sent',
        sentAt: new Date(),
        // In a real app, you'd count actual recipients here
        recipients: 0,
        openRate: 0,
        clickRate: 0
      },
      { new: true }
    );

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, campaign }, { status: 200 });
  } catch (err: any) {
    console.error('PATCH /api/newsletter/campaigns error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send campaign' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { connectToDatabase, ContactModel, NewsletterSubscriberModel, PopupModel } from '../../../lib/db';

interface ContactDocument {
  _id: any;
  name: string;
  email: string;
  createdAt: Date;
}

interface NewsletterDocument {
  _id: any;
  email: string;
  createdAt: Date;
}

interface PopupDocument {
  _id: any;
  name: string;
  email: string;
  createdAt: Date;
}

export async function GET() {
  try {
    await connectToDatabase();

    // Run all queries in parallel
    const [contacts, newsletters, popups, recentActivity] = await Promise.all([
      ContactModel.countDocuments(),
      NewsletterSubscriberModel.countDocuments({ status: 'active' }),
      PopupModel.countDocuments(),
      // Get recent activity across all collections (last 24 hours)
      Promise.all([
        ContactModel.countDocuments({ 
          createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
        }),
        NewsletterSubscriberModel.countDocuments({ 
          createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
        }),
        PopupModel.countDocuments({ 
          createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
        })
      ]).then(counts => counts.reduce((a, b) => a + b, 0))
    ]);
    // Also fetch 5 most recent activities
    const [recentContacts, recentNewsletters, recentPopups] = await Promise.all([
      ContactModel.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .lean()
        .select('name email createdAt') as Promise<ContactDocument[]>,
      NewsletterSubscriberModel.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .lean()
        .select('email createdAt') as Promise<NewsletterDocument[]>,
      PopupModel.find()
        .sort({ createdAt: -1 })
        .limit(2)
        .lean()
        .select('name email createdAt') as Promise<PopupDocument[]>
    ]);

    // Format recent activities
    const recentActivitiesList = [
      ...recentContacts.map(c => ({
        id: c._id.toString(),
        type: 'contact' as const,
        message: `New contact form submission from ${c.name}`,
        time: c.createdAt,
      })),
      ...recentNewsletters.map(n => ({
        id: n._id.toString(),
        type: 'newsletter' as const,
        message: `New newsletter subscription from ${n.email}`,
        time: n.createdAt,
      })),
      ...recentPopups.map(p => ({
        id: p._id.toString(),
        type: 'popup' as const,
        message: `New quote request from ${p.name}`,
        time: p.createdAt,
      }))
    ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5)
    .map(item => ({
      ...item,
      time: formatTimeAgo(new Date(item.time))
    }));

    return NextResponse.json({
      totalContacts: contacts,
      totalNewsletters: newsletters,
      totalPopups: popups,
      recentActivity: recentActivity,
      recentActivities: recentActivitiesList
    });
  } catch (err: any) {
    console.error('GET /api/dashboard error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}
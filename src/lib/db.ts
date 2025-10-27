import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Use a global cached connection to avoid creating multiple connections in dev/hot-reload.
 */
let cached: { conn: typeof mongoose | null } = (global as any)._mongooseCache || { conn: null };
if (!cached) (global as any)._mongooseCache = cached;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const opts = {
    // add options as needed
  };

    try {
      const conn = await mongoose.connect(MONGODB_URI as string);
      cached.conn = conn;
      (global as any)._mongooseCache = cached;
      return conn;
    } catch (connectErr) {
      console.error('MongoDB connection error:', connectErr);
      throw connectErr;
    }
}

// Contact model
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    projectType: { type: String, default: 'residential' },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

// Newsletter Subscriber model
const NewsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' },
    source: { type: String, default: 'Website' },
  },
  { timestamps: true }
);

// Newsletter Campaign model
const NewsletterCampaignSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    recipients: { type: Number, default: 0 },
    openRate: { type: Number, default: 0 },
    clickRate: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'sent'], default: 'draft' },
    sentAt: { type: Date },
  },
  { timestamps: true }
);

export const ContactModel = mongoose.models?.Contact || mongoose.model('Contact', ContactSchema);
export const NewsletterSubscriberModel = mongoose.models?.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
export const NewsletterCampaignModel = mongoose.models?.NewsletterCampaign || mongoose.model('NewsletterCampaign', NewsletterCampaignSchema);

// Popup model (separate from Contact)
const PopupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectType: { type: String, default: 'residential' },
    message: { type: String },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    source: { type: String, default: 'popup' },
  },
  { timestamps: true }
);

export const PopupModel = mongoose.models?.Popup || mongoose.model('Popup', PopupSchema);

export default mongoose;

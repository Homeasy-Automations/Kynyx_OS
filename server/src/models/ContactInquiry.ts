import { model, Schema } from 'mongoose';

export const INQUIRY_STATUSES = ['new', 'contacted', 'qualified', 'converted', 'closed'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export interface ContactInquiryDoc {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  services: string[];
  projectDescription: string;
  budget?: string;
  timeline?: string;
  source?: string;
  status: InquiryStatus;
  ipMetadata?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactInquirySchema = new Schema<ContactInquiryDoc>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 40, default: '' },
    company: { type: String, trim: true, maxlength: 160, default: '' },
    website: { type: String, trim: true, maxlength: 300, default: '' },
    services: {
      type: [String],
      default: [],
      validate: {
        validator: (v: string[]) => v.length <= 12,
        message: 'Too many services selected',
      },
    },
    projectDescription: { type: String, required: true, maxlength: 8000 },
    budget: { type: String, trim: true, maxlength: 60, default: '' },
    timeline: { type: String, trim: true, maxlength: 60, default: '' },
    source: { type: String, trim: true, maxlength: 120, default: '' },
    status: { type: String, enum: INQUIRY_STATUSES, default: 'new', index: true },
    ipMetadata: { type: String, default: '' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactInquiry = model<ContactInquiryDoc>('ContactInquiry', contactInquirySchema);

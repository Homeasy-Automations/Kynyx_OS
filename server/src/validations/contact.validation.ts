import { z } from 'zod';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

/** Server-side validation for POST /api/contact. */
export const contactInquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().toLowerCase().regex(EMAIL_RE, 'Invalid email address').max(254),
  phone: z.string().trim().max(40).optional().default(''),
  company: z.string().trim().max(160).optional().default(''),
  website: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default('')
    .refine((v) => v === '' || URL_RE.test(v), { message: 'Invalid website URL' }),
  services: z.array(z.string().trim().min(1).max(80)).min(1, 'Select at least one service').max(12),
  projectDescription: z.string().trim().min(30, 'Please describe your project in at least 30 characters').max(8000),
  budget: z.string().trim().max(60).optional().default(''),
  timeline: z.string().trim().max(60).optional().default(''),
  source: z.string().trim().max(120).optional().default(''),
  /**
   * Honeypot trap — hidden from real users via CSS, left blank by them.
   * Bots that autofill every field populate it, which flags the submission
   * as spam (handled in the controller). Not persisted, not emailed.
   */
  hp: z.string().trim().max(200).optional().default(''),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

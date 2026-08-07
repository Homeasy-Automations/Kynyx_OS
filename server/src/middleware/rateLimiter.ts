import { rateLimit } from 'express-rate-limit';

/** General API throttle. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests — please slow down.' },
});

/** Stricter throttle for the contact endpoint (spam protection). */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many inquiries from this address — please try again later.' },
});

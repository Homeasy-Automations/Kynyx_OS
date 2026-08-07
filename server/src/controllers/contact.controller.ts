import type { Request, Response } from 'express';
import { sendInquiryEmails } from '../services/email.service.js';
import { createInquiry, generateReferenceId } from '../services/contact.service.js';
import type { ContactInquiryInput } from '../validations/contact.validation.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * POST /api/contact
 * Validated input arrives via res.locals.body (see validate middleware).
 * Steps: persist → email (best-effort) → respond with reference id.
 */
export const createContactInquiry = asyncHandler(async (req: Request, res: Response) => {
  const input = res.locals.body as ContactInquiryInput;

  // Honeypot triggered — almost certainly a bot. Respond exactly like a
  // successful submission (no error, no hint) but never persist or email.
  if (input.hp) {
    res.status(201).json({ success: true, referenceId: generateReferenceId() });
    return;
  }

  // req.ip is only trustworthy because env.trustProxy / app.set('trust proxy', ...)
  // is configured for the actual number of reverse-proxy hops in front of this server.
  const ip = req.ip ?? '';

  const { referenceId } = await createInquiry(input, ip);

  // Best-effort email delivery — never blocks the response.
  void sendInquiryEmails(input, referenceId).then((r) => {
    console.info(
      `[contact] ${referenceId} — internal email ${r.internal ? 'sent' : 'skipped'}, customer email ${r.customer ? 'sent' : 'skipped'}`,
    );
  });

  res.status(201).json({ success: true, referenceId });
});

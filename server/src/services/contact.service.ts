import { isDbConnected } from '../config/database.js';
import { ContactInquiry } from '../models/ContactInquiry.js';
import type { ContactInquiryInput } from '../validations/contact.validation.js';
import { ApiError } from '../utils/ApiError.js';

/** Simple human-friendly reference id, e.g. KNYX-8F2A1C. */
export function generateReferenceId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `KNYX-${out}`;
}

export interface InquiryResult {
  referenceId: string;
  persisted: boolean;
}

/**
 * Persist a validated inquiry. When MongoDB is unavailable the inquiry is
 * logged (demo mode) and the submission still succeeds from the client's
 * perspective — the email path is the source of truth in that case.
 */
export async function createInquiry(
  input: ContactInquiryInput,
  ip?: string,
): Promise<InquiryResult> {
  const referenceId = generateReferenceId();

  if (isDbConnected()) {
    try {
      const { hp: _hp, ...persistable } = input;
      await ContactInquiry.create({
        ...persistable,
        status: 'new',
        ipMetadata: ip ?? '',
      });
      return { referenceId, persisted: true };
    } catch (err) {
      console.error('[contact] failed to persist inquiry:', err instanceof Error ? err.message : err);
      throw new ApiError(500, 'Could not store your inquiry. Please try again.');
    }
  }

  // Demo mode — no database configured
  console.info(`[contact][demo] Inquiry ${referenceId} received:`, {
    name: input.name,
    email: input.email,
    services: input.services,
    budget: input.budget,
    timeline: input.timeline,
  });
  return { referenceId, persisted: false };
}

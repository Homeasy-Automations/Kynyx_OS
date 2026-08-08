import { Resend } from 'resend';
import { env, isEmailConfigured } from '../config/env.js';
import type { ContactInquiryInput } from '../validations/contact.validation.js';

let resend: Resend | null = null;
if (isEmailConfigured) {
  resend = new Resend(env.resendApiKey);
}

function formatInquiry(input: ContactInquiryInput, referenceId: string): string {
  return [
    `Reference: ${referenceId}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    `Company: ${input.company || '—'}`,
    `Website: ${input.website || '—'}`,
    `Services: ${input.services.join(', ')}`,
    `Budget: ${input.budget || '—'}`,
    `Timeline: ${input.timeline || '—'}`,
    `Source: ${input.source || '—'}`,
    '',
    'Project description:',
    input.projectDescription,
  ].join('\n');
}

/**
 * Send the internal notification + customer confirmation via Resend.
 * Failures are logged but never thrown — the inquiry itself is the source
 * of truth; email delivery must not break the submission flow.
 */
export async function sendInquiryEmails(
  input: ContactInquiryInput,
  referenceId: string,
): Promise<{ internal: boolean; customer: boolean }> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping email delivery.');
    return { internal: false, customer: false };
  }

  const results = { internal: false, customer: false };

  try {
    const { error } = await resend.emails.send({
      from: env.resendFromEmail,
      to: [env.contactReceiverEmail],
      subject: `New Project Inquiry — ${input.name} (${referenceId})`,
      text: formatInquiry(input, referenceId),
    });
    if (error) {
      console.error('[email] internal notification rejected by Resend:', error.message);
    } else {
      results.internal = true;
    }
  } catch (err) {
    console.error('[email] internal notification failed:', err instanceof Error ? err.message : err);
  }

  try {
    const { error } = await resend.emails.send({
      from: env.resendFromEmail,
      to: [input.email],
      subject: 'Thanks for reaching out to KYNYX',
      text: [
        `Hi ${input.name},`,
        '',
        'Thanks for reaching out to KYNYX.',
        '',
        "We've received your project details and our team will review them shortly.",
        '',
        "We'll get back to you soon to discuss the next steps.",
        '',
        '— KYNYX',
      ].join('\n'),
    });
    if (error) {
      console.error('[email] customer confirmation rejected by Resend:', error.message);
    } else {
      results.customer = true;
    }
  } catch (err) {
    console.error('[email] customer confirmation failed:', err instanceof Error ? err.message : err);
  }

  return results;
}

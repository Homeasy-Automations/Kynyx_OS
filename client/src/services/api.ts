import type { InquiryPayload, InquiryResponse } from '../types';

/** API base — uses the Vite dev proxy by default; override with VITE_API_URL. */
const API_BASE: string = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Submit a project inquiry.
 * POST /api/contact — validated, rate-limited, sanitized server-side.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError('Network error — please check your connection and try again.', 0);
  }

  const data = (await res.json().catch(() => ({}))) as Partial<InquiryResponse>;

  if (!res.ok) {
    const message = data.success === false ? 'The server could not process this inquiry.' : 'Something went wrong. Please try again.';
    throw new ApiError(message, res.status);
  }

  return { success: true, referenceId: data.referenceId ?? 'KNYX-PENDING' };
}

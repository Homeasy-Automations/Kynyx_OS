import dotenv from 'dotenv';

dotenv.config();

/** Centralized, validated environment access. */
export const env = {
  port: Number(process.env.PORT ?? 5000),
  /**
   * Number of reverse-proxy hops in front of this server (nginx, load balancer, etc.).
   * Required for req.ip / express-rate-limit to see the real client IP instead of the
   * proxy's IP. 0 disables proxy trust (server reachable directly). Default: 1.
   */
  trustProxy: Number(process.env.TRUST_PROXY ?? 1),
  mongoUri: process.env.MONGODB_URI ?? '',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? 'KYNYX SOLUTIONS',
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL ?? 'info@kynyx.com',
  clientUrl: process.env.CLIENT_URL ?? 'https://kynyxos.vercel.app',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};

/** Whether the server can persist to MongoDB (demo mode otherwise). */
export const isDatabaseConfigured = Boolean(env.mongoUri);

/** Whether the server can send email via Resend. */
export const isEmailConfigured = Boolean(env.resendApiKey);

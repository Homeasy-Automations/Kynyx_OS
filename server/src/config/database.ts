import mongoose from 'mongoose';
import { env, isDatabaseConfigured } from './env.js';

let connected = false;

/**
 * Connect to MongoDB if MONGODB_URI is configured.
 * Without a URI the API still boots in "demo mode" (no persistence).
 */
export async function connectDatabase(): Promise<boolean> {
  if (!isDatabaseConfigured) {
    console.warn('[db] MONGODB_URI not set — running in demo mode (inquiries will not persist).');
    return false;
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    connected = true;
    console.log('[db] Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err instanceof Error ? err.message : err);
    return false;
  }
}

export function isDbConnected(): boolean {
  return connected && mongoose.connection.readyState === 1;
}

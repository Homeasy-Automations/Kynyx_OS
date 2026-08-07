import { Router } from 'express';
import { isDbConnected } from '../config/database.js';
import { isEmailConfigured } from '../config/env.js';

const router = Router();

/** GET /api/health — liveness + capability report for monitoring. */
router.get('/', (_req, res) => {
  res.json({
    success: true,
    service: 'kynyx-api',
    timestamp: new Date().toISOString(),
    database: isDbConnected() ? 'connected' : 'demo-mode',
    email: isEmailConfigured ? 'configured' : 'not-configured',
  });
});

export default router;

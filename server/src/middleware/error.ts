import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

/** 404 handler — mounted after all routes. */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

/** Centralized error handler — every thrown/rejected error lands here. */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      error: err.message,
      ...(env.nodeEnv === 'development' && err.details ? { details: err.details } : {}),
    });
    return;
  }

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ success: false, error: 'Malformed JSON in request body.' });
    return;
  }

  console.error('[error]', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
}

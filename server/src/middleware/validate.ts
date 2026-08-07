import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError.js';

/** Validate req.body against a zod schema; attach parsed result to res.locals. */
export function validate(schema: ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      return next(new ApiError(422, 'Validation failed', issues));
    }
    res.locals.body = result.data;
    return next();
  };
}

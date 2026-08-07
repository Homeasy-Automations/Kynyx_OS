import { Router } from 'express';
import { createContactInquiry } from '../controllers/contact.controller.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { contactInquirySchema } from '../validations/contact.validation.js';

const router = Router();

router.post('/', contactLimiter, validate(contactInquirySchema), createContactInquiry);

export default router;

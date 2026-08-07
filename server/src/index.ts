import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import contactRoutes from './routes/contact.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ---------------- proxy trust ---------------- */
// Must be set before req.ip / express-rate-limit are used, or every client
// behind the reverse proxy is seen as the same IP (breaks rate limiting).
app.set('trust proxy', env.trustProxy);

/* ---------------- middleware ---------------- */
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl.split(',').map((o) => o.trim()),
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json({ limit: '100kb' })); // request size limit
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use('/api', apiLimiter);

/* ---------------- routes ---------------- */
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

/* ---------------- static client (production) ---------------- */
const clientDist = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

/* ---------------- error handling ---------------- */
app.use(notFoundHandler);
app.use(errorHandler);

/* ---------------- boot ---------------- */
async function start(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`[kynyx] API listening on http://localhost:${env.port} (${env.nodeEnv})`);
    console.log(`[kynyx] health check: http://localhost:${env.port}/api/health`);
  });
}

void start();

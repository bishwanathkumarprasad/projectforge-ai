import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import projectsRouter from './routes/projects.js';
import mentorRouter from './routes/mentor.js';
import compareRouter from './routes/compare.js';
import userRouter from './routes/user.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { geminiService } from './services/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows Vite dev and external web fonts (Google Fonts)
  })
);

// Cross-Origin Resource Sharing
// In Cloud Run, frontend & backend are served on the same origin.
// In dev, allow localhost.
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8080',
  'http://localhost:5000',
];
if (config.clientUrl) {
  allowedOrigins.push(config.clientUrl);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
      if (!origin || allowedOrigins.includes(origin) || config.nodeEnv === 'production') {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Body parsing with strict size limit (protects against memory exhaustion)
app.use(express.json({ limit: '250kb' }));

// Safe Production Logging (Method, Path, Status, Duration)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // Do not log sensitive credentials or payload data
    if (req.path.startsWith('/api')) {
      console.log(`[HTTP] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Apply rate limiter to /api
app.use('/api', apiLimiter);

// 1. Lightweight Production Health Endpoint (Requirement 12)
app.get('/api/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
  });
});

// 2. Safe AI Engine Status Endpoint (Requirement 12)
app.get('/api/ai/status', (_req: Request, res: Response) => {
  return res.status(200).json({
    mode: geminiService.isAvailable() ? 'gemini' : 'demo',
    model: config.geminiModel,
  });
});

// Mount modular API routers
app.use('/api/projects', projectsRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/compare', compareRouter);
app.use('/api/user', userRouter);

// 404 handler for unmatched /api routes
app.all('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `API route "${req.originalUrl}" not found.`,
    },
  });
});

// Centralized Error Handling for API routes
app.use(errorHandler);

// Production Static Asset Serving (Cloud Run Single Container Deployment)
// Check possible locations for client/dist
const candidateDistPaths = [
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), '../client/dist'),
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../client/dist'),
];

const clientDistDir = candidateDistPaths.find(p => fs.existsSync(path.join(p, 'index.html')));

if (clientDistDir) {
  console.log(`[Static] Serving frontend production build from: ${clientDistDir}`);
  app.use(express.static(clientDistDir));

  // SPA Fallback for non-API client routes
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(clientDistDir, 'index.html'));
  });
} else {
  console.log('[Static] No client/dist build found. Running in API-only dev server mode.');
}

// Bind to PORT and HOST (Cloud Run requirement)
const server = app.listen(config.port, config.host, () => {
  console.log(`=================================================`);
  console.log(` ProjectForge AI Cloud-Ready Server is running!`);
  console.log(` Listening on: http://${config.host}:${config.port}`);
  console.log(` Mode: ${geminiService.isAvailable() ? 'Live Google Gemini AI' : 'Simulated Demo Mode'}`);
  console.log(` Health: http://${config.host}:${config.port}/api/health`);
  console.log(` AI Status: http://${config.host}:${config.port}/api/ai/status`);
  console.log(`=================================================`);
});

// Graceful termination for Cloud Run container lifecycle
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down...');
  server.close(() => {
    process.exit(0);
  });
});

export default app;

import rateLimit from 'express-rate-limit';
import { config } from '../config.js';

// Configurable Rate limiter for AI endpoints (prevents quota exhaustion)
export const aiGenerationLimiter = rateLimit({
  windowMs: config.aiRateWindowMs, // e.g. 60,000 ms
  max: config.aiRateLimit, // e.g. 15 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many AI requests. Please wait a moment before trying again.',
    },
  },
  statusCode: 429,
});

// General API rate limiter for non-AI endpoints
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please slow down.',
    },
  },
  statusCode: 429,
});

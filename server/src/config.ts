import dotenv from 'dotenv';
import path from 'path';

// Load .env from workspace root or current directory
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'production',
  geminiApiKey: (process.env.GEMINI_API_KEY || '').trim(),
  geminiModel: (process.env.GEMINI_MODEL || 'gemini-2.0-flash').trim(),
  clientUrl: process.env.CLIENT_URL || '',
  isDemoMode: !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '',
  aiRateLimit: parseInt(process.env.AI_RATE_LIMIT || '15', 10),
  aiRateWindowMs: parseInt(process.env.AI_RATE_WINDOW_MS || '60000', 10),
  geminiTimeoutMs: parseInt(process.env.GEMINI_TIMEOUT_MS || '25000', 10),
};

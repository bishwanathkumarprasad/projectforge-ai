import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If headers already sent, delegate to default express handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request payload format',
        details: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    });
  }

  // Handle Syntax Errors (e.g. malformed JSON body)
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON payload received.',
      },
    });
  }

  // Safe Production Logging (never log sensitive credentials or keys)
  console.error(`[Error] ${req.method} ${req.path} -> ${err.name || 'Error'}: ${err.message || 'Unknown'}`);

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
  const safeMessage =
    statusCode >= 500
      ? 'An unexpected error occurred. Please retry or continue in Demo Mode.'
      : err.message || 'Bad Request';

  return res.status(statusCode).json({
    error: {
      code: errorCode,
      message: safeMessage,
    },
  });
}

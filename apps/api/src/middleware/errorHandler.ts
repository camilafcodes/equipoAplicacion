import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '@app/shared';

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    const errorResponse: ErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    };
    res.status(err.statusCode).json(errorResponse);
  } else {
    console.error('Unexpected error:', err);
    const errorResponse: ErrorResponse = {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      }
    };
    res.status(500).json(errorResponse);
  }
}

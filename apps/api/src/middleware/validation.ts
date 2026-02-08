import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function validatePagination(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  if (page < 1) {
    throw new AppError('VALIDATION_ERROR', 'Page must be >= 1', 400);
  }

  if (pageSize < 1 || pageSize > 50) {
    throw new AppError(
      'VALIDATION_ERROR',
      'PageSize must be between 1 and 50',
      400
    );
  }

  req.query.page = String(page);
  req.query.pageSize = String(pageSize);

  next();
}

export function validateArticleId(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { id } = req.params;

  if (!id || id.trim() === '') {
    throw new AppError('VALIDATION_ERROR', 'Article ID is required', 400);
  }

  next();
}

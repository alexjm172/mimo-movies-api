import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const isTest = process.env.NODE_ENV === 'test';
  if (!isTest) console.error('❌ Unhandled error:', err);

  if (err?.isJoi) return res.status(422).json({ error: err.message });
  if (err instanceof SyntaxError) return res.status(400).json({ error: 'Invalid JSON' });

  const status =
    err instanceof AppError ? err.status :
    (typeof err?.status === 'number' ? err.status : 500);

  const payload: any = { error: err?.message || 'Internal Server Error' };
  if (err instanceof AppError && err.code) payload.code = err.code;

  return res.status(status).json(payload);
}
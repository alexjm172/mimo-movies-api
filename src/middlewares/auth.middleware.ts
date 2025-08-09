import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../config/env';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.header('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const token = header.slice('Bearer '.length);

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload | string;

    // verify puede devolver string (si firmaste con "subject" solo) o un objeto (JwtPayload)
    if (typeof decoded !== 'object' || decoded === null) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    // sub puede ser string o number
    const rawSub = decoded.sub;
    const userId =
      typeof rawSub === 'string' ? Number(rawSub) :
      typeof rawSub === 'number' ? rawSub : NaN;

    if (!Number.isFinite(userId)) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const username = (decoded as JwtPayload & { username?: string }).username ?? 'user';

    (req as any).user = { id: userId, username };
    next();
  } catch {
    return res.status(401).json({ error: 'No autorizado' });
  }
}
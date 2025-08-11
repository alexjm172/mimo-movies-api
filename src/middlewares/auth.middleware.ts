import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {ENV} from '../config/env';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.header('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const token = header.slice('Bearer '.length);

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;

    // id desde sub o desde payload.id (aceptamos ambos)
    const sub = decoded.sub;
    const idFromSub =
      typeof sub === 'string' ? Number(sub) :
      typeof sub === 'number' ? sub : NaN;

    const id =
      Number.isFinite(idFromSub) ? idFromSub :
      typeof (decoded as any).id === 'number' ? (decoded as any).id :
      NaN;

    if (!Number.isFinite(id)) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const username = (decoded as any).username ?? 'user';

    (req as any).user = { id, username, iat: decoded.iat, exp: decoded.exp };
    next();
  } catch (err: any) {
    if (err?.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'No autorizado' });
  }
}
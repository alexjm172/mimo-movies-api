import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body ?? {};
    if (!username || !password) return res.status(422).json({ error: 'username y password son obligatorios' });

    const session = await authService.login(username, password);
    res.status(200).json(session);
  } catch (err) {
    next(err);
  }
}

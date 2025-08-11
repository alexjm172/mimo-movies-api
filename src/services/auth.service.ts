import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/user.repository';
import {ENV} from '../config/env';
import { AppError } from '../middlewares/error.middleware';


export async function login(username: string, password: string) {
  const user = await userRepo.findByUsername(username);
  const ok = user && bcrypt.compareSync(password, user.passwordHash);
  if (!ok) throw new AppError(401, 'Credenciales inválidas');

  const token = jwt.sign({ sub: user!.id, username: user!.username }, ENV.JWT_SECRET, { expiresIn: '1h' });
  return { token };
}
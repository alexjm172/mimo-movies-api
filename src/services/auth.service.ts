import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/user.repository';
import { ENV } from '../config/env';

export async function login(username: string, password: string) {
  const user = await userRepo.findByUsername(username);
  if (!user) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });

  const token = jwt.sign({ sub: user.id, username: user.username }, ENV.JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

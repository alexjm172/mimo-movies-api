// tests/helpers.ts
import request from 'supertest';
import app from '../src/app';
import { resetDb } from '../src/config/seed';

export const api = request(app);

export async function getToken(
  username = 'mimo',
  password = 'mimo123'
): Promise<string> {
  const r = await api
    .post('/sessions')
    .set('Content-Type', 'application/json')
    .send({ username, password });
  if (r.status !== 200) {
    throw new Error(`No pude loguear (status ${r.status}): ${JSON.stringify(r.body)}`);
  }
  return r.body.token as string;
}

/** Cabeceras Authorization para supertest */
export function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

/** Deja la DB en estado base (usuario + pelis seed) */
export async function reset() {
  await resetDb();
}
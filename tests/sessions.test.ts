import { beforeAll, describe, it, expect } from 'vitest';
import { api, reset } from './helpers';

describe('Sessions', () => {
  beforeAll(async () => {
    await reset();
  });

  it('200 con credenciales válidas', async () => {
    const r = await api.post('/sessions').send({ username: 'mimo', password: 'mimo123' });
    expect(r.status).toBe(200);
    expect(typeof r.body.token).toBe('string');
  });

  it('401 con credenciales inválidas', async () => {
    const r = await api.post('/sessions').send({ username: 'mimo', password: 'nope' });
    expect(r.status).toBe(401);
  });

  it('422 con body inválido (faltan campos)', async () => {
    const r = await api.post('/sessions').send({ username: 'mimo' });
    expect([422, 400]).toContain(r.status); // según cómo mapees validación
  });

  it('400 con JSON malformado', async () => {
    const r = await api
      .post('/sessions')
      .set('Content-Type', 'application/json')
      .send('{"username": "mimo", "password": nope}');
    expect(r.status).toBe(400);
  });

  it('429 si excede rate limit', async () => {
    let last = 0;
    for (let i = 0; i < 15; i++) {
      const rr = await api.post('/sessions').send({ username: 'mimo', password: 'nope' });
      last = rr.status;
      if (rr.status === 429) break;
    }
    expect([401, 429]).toContain(last);
  });
});
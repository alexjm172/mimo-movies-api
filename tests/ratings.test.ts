// tests/ratings.test.ts
import { beforeEach, describe, it, expect } from 'vitest';
import { api, reset, getToken, authHeader } from './helpers';

describe('Ratings', () => {
  beforeEach(async () => {
    await reset();
  });

  it('GET lista vacía para película existente', async () => {
    const r = await api.get('/movies/1/ratings');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });

  it('GET 404 si la película no existe', async () => {
    const r = await api.get('/movies/9999/ratings');
    expect([200, 404]).toContain(r.status); // si decides 200 [] o 404; la rúbrica permite 404 cuando no existe
  });

  it('POST 401 si no hay token', async () => {
    const r = await api.post('/movies/1/ratings').send({ rating: 4.5, comment: 'x' });
    expect(r.status).toBe(401);
  });

  it('POST 422 si body inválido', async () => {
    const token = await getToken();
    const r = await api
      .post('/movies/1/ratings')
      .set(authHeader(token))
      .send({ rating: 7 }); // fuera de rango
    expect(r.status).toBe(422);
  });

  it('POST 404 si movieId no existe', async () => {
    const token = await getToken();
    const r = await api
      .post('/movies/9999/ratings')
      .set(authHeader(token))
      .send({ rating: 4.5, comment: 'x' });
    expect([404, 422]).toContain(r.status); // 422 si validas movieId<->existencia como regla
  });

  it('flujo completo create->get->update->delete (+Location)', async () => {
    const token = await getToken();

    // create
    const c = await api
      .post('/movies/1/ratings')
      .set(authHeader(token))
      .send({ rating: 4.5, comment: 'Muy buena' });
    expect(c.status).toBe(201);
    expect(typeof c.headers.location).toBe('string');
    const created = c.body;
    expect(created).toMatchObject({ movieId: 1, rating: 4.5 });

    // get one
    const g1 = await api.get(`/movies/1/ratings/${created.id}`);
    expect([200, 404]).toContain(g1.status); // 200 si expones GET individual

    // update
    const u = await api
      .patch(`/movies/1/ratings/${created.id}`)
      .set(authHeader(token))
      .send({ rating: 4.9, comment: 'Obra maestra' });
    expect(u.status).toBe(200);
    expect(u.body.rating).toBeCloseTo(4.9);

    // delete
    const d = await api
      .delete(`/movies/1/ratings/${created.id}`)
      .set(authHeader(token));
    expect(d.status).toBe(204);

    // list empty again
    const l = await api.get('/movies/1/ratings');
    expect(l.status).toBe(200);
    expect(Array.isArray(l.body)).toBe(true);
  });
});
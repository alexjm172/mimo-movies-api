// tests/watchlist.test.ts
import { beforeEach, describe, it, expect } from 'vitest';
import { api, reset, getToken, authHeader } from './helpers';

describe('Watchlist', () => {
  beforeEach(async () => {
    await reset();
  });

  it('GET 401 sin token', async () => {
    const r = await api.get('/watchlist/1');
    expect(r.status).toBe(401);
  });

  it('GET 422 userId inválido', async () => {
    const token = await getToken();
    const r = await api.get('/watchlist/abc').set(authHeader(token));
    expect(r.status).toBe(422);
  });

  it('flujo: add 201 (+Location), duplicada 409, get 200, delete 204', async () => {
    const token = await getToken();

    // add
    const a = await api
      .post('/watchlist/1/items')
      .set(authHeader(token))
      .send({ movieId: 1 });
    expect(a.status).toBe(201);
    expect(a.headers.location).toBe('/watchlist/1/items/1');
    expect(a.body).toMatchObject({ movieId: 1, watched: false });

    // duplicada
    const dup = await api
      .post('/watchlist/1/items')
      .set(authHeader(token))
      .send({ movieId: 1 });
    expect(dup.status).toBe(409);

    // get
    const g = await api.get('/watchlist/1').set(authHeader(token));
    expect(g.status).toBe(200);
    expect(Array.isArray(g.body)).toBe(true);
    expect(g.body.some((i: any) => i.movieId === 1)).toBe(true);

    // delete
    const d = await api
      .delete('/watchlist/1/items/1')
      .set(authHeader(token));
    expect(d.status).toBe(204);

    // get vacío
    const g2 = await api.get('/watchlist/1').set(authHeader(token));
    expect(g2.status).toBe(200);
    expect(g2.body.find((i: any) => i.movieId === 1)).toBeUndefined();
  });

  it('401 si intentas operar sobre otro userId', async () => {
    const token = await getToken();
    const r = await api
      .post('/watchlist/2/items')
      .set(authHeader(token))
      .send({ movieId: 1 });
    expect(r.status).toBe(401);
  });

  it('422 si itemId inválido al borrar', async () => {
    const token = await getToken();
    const r = await api
      .delete('/watchlist/1/items/0') // inválido (minimum:1)
      .set(authHeader(token));
    expect(r.status).toBe(422);
  });

  it('404 si añades película inexistente', async () => {
    const token = await getToken();
    const r = await api
      .post('/watchlist/1/items')
      .set(authHeader(token))
      .send({ movieId: 9999 });
    expect(r.status).toBe(404);
  });
});
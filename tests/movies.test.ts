// tests/movies.test.ts
import { beforeAll, describe, it, expect } from 'vitest';
import { api, reset } from './helpers';

describe('Movies', () => {
  beforeAll(async () => {
    await reset();
  });

  it('GET /movies -> 200 lista', async () => {
    const r = await api.get('/movies');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
    expect(r.body.length).toBeGreaterThan(0);
    const m = r.body[0];
    expect(m).toHaveProperty('id');
    expect(m).toHaveProperty('title');
    expect(m).toHaveProperty('genre');
  });

  it('paginación opcional -> headers cuando page&limit', async () => {
    const r = await api.get('/movies?page=1&limit=1');
    expect(r.status).toBe(200);
    expect(r.headers['x-total-count']).toBeDefined();
    expect(r.headers['x-page']).toBeDefined();
    expect(r.headers['x-limit']).toBeDefined();
  });

  it('filtro por género', async () => {
    const r = await api.get('/movies?genre=Sci-Fi');
    expect(r.status).toBe(200);
    expect(r.body.every((m: any) => m.genre === 'Sci-Fi')).toBe(true);
  });

  it('búsqueda por título', async () => {
    const r = await api.get('/movies?titleLike=matrix');
    expect(r.status).toBe(200);
    expect(r.body.some((m: any) => /matrix/i.test(m.title))).toBe(true);
  });
});
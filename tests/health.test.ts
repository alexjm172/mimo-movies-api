import { describe, it, expect } from 'vitest';
import { api } from './helpers';

describe('Health', () => {
  it('GET /health -> 200', async () => {
    const r = await api.get('/health');
    expect(r.status).toBe(200);
    expect(r.body.status).toBe('ok');
    expect(typeof r.body.uptime).toBe('number');
  });
});
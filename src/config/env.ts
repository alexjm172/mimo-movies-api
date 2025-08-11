import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

const MODE = process.env.NODE_ENV ?? 'development';

// Prioridad estilo dotenv-flow: .env.{MODE}.local > .env.{MODE} > .env.local > .env
const candidates = [
  `.env.${MODE}.local`,
  `.env.${MODE}`,
  '.env.local',
  '.env',
];

for (const f of candidates) {
  const p = path.resolve(process.cwd(), f);
  if (fs.existsSync(p)) {
    config({ path: p });
    break;
  }
}

type NodeEnv = 'development' | 'test' | 'production';

export const ENV = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnv) ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),

  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret-please-change-32chars-min',

  SESSIONS_WINDOW_MS: Number(process.env.SESSIONS_WINDOW_MS ?? 60_000),
  SESSIONS_MAX: Number(process.env.SESSIONS_MAX ?? 8),

  DB_FILE: process.env.DB_FILE, // en test  :memory:
} as const;
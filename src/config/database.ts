import { Sequelize } from 'sequelize';
import {ENV} from './env';
import fs from 'node:fs/promises';
import path from 'node:path';

const isTest = ENV.NODE_ENV === 'test';
const DB_FILE = ENV.DB_FILE ?? (isTest ? ':memory:' : 'mimo_movies.db');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_FILE,
  logging: false, 
});

export async function ensureDbReady() {
  if (DB_FILE !== ':memory:') {
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true }).catch(() => {});
  }
  await sequelize.authenticate();
  await sequelize.query('PRAGMA foreign_keys = ON');
}

// si usabas connectDB en algún lado, mantenemos alias
export async function connectDB() {
  await ensureDbReady();
  // eslint-disable-next-line no-console
  console.log('✅ Conectado a SQLite');
}
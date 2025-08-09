import { Sequelize } from 'sequelize';
import { ENV } from './env';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE || 'mimo_movies.db',
  logging: ENV.NODE_ENV === 'development' ? false : false // desactivado
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a SQLite');
  } catch (err) {
    console.error('❌ Error conectando a la DB', err);
    throw err;
  }
}
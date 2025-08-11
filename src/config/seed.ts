// src/config/seed.ts
import bcrypt from 'bcryptjs';
import { sequelize } from './database';
import { Movie } from '../models/Movie';
import { User } from '../models/User';

async function baseSeed() {
  // Usuario de prueba
  const exists = await User.findOne({ where: { username: 'mimo' } });
  if (!exists) {
    const passwordHash = await bcrypt.hash('mimo123', 10);
    await User.create({
      username: 'mimo',
      passwordHash,
    });
    console.log('🌱 Usuario de prueba: username=mimo, password=mimo123');
  }

  // Películas base: asegura que hay al menos estas
  const countMovies = await Movie.count();
  if (countMovies === 0) {
    await Movie.bulkCreate([
      { title: 'The Matrix', genre: 'Sci-Fi', duration: 136, rating: 4.7 },
      { title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 4.6 },
      { title: 'The Godfather', genre: 'Crime', duration: 175, rating: 4.9 }
    ]);
    console.log('🌱 Seed de películas insertado');
  }
}

export async function seedIfEmpty() {
  await baseSeed();
}

//Lo que necesitan los tests
export async function resetDb() {
  await sequelize.drop();
  await sequelize.sync();
  await baseSeed();
}
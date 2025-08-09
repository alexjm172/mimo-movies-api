import { Movie } from '../models/Movie';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export async function seedIfEmpty() {
  const countMovies = await Movie.count();
  if (countMovies === 0) {
    await Movie.bulkCreate([
      { title: 'The Matrix', genre: 'Sci-Fi', duration: 136, rating: 4.7 },
      { title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 4.6 },
      { title: 'The Godfather', genre: 'Crime', duration: 175, rating: 4.9 }
    ]);
    console.log('🌱 Seed de películas insertado');
  }

  const demo = await User.findOne({ where: { username: 'mimo' } });
  if (!demo) {
    const passwordHash = bcrypt.hashSync('mimo123', 10);
    await User.create({ username: 'mimo', passwordHash });
    console.log('🌱 Usuario de prueba: username=mimo, password=mimo123');
  }
}

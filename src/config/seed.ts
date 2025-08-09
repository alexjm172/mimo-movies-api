import { Movie } from "../models/Movie";

export async function seedIfEmpty() {
  const count = await Movie.count();
  if (count > 0) return;

  await Movie.bulkCreate([
    { title: 'The Matrix', genre: 'Sci-Fi', duration: 136, rating: 4.7 },
    { title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 4.6 },
    { title: 'The Godfather', genre: 'Crime', duration: 175, rating: 4.9 }
  ]);
  console.log('🌱 Seed de películas insertado');
}
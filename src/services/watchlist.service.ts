// src/services/watchlist.service.ts
import { Movie } from '../models/Movie';
import { WatchlistItem } from '../models/WatchlistItem';
import { AppError } from '../middlewares/error.middleware';

export async function getWatchlist(userId: number) {
  const rows = await WatchlistItem.findAll({
    where: { userId },
    order: [['movieId', 'ASC']],
  });

  if (rows.length === 0) return [];

  const movieIds = [...new Set(rows.map(r => r.movieId))];
  const movies = await Movie.findAll({
    where: { id: movieIds as any }, // si usas Sequelize.Op.in, perfecto
    attributes: ['id', 'title'],
  });

  const titleById = new Map(movies.map(m => [m.id, m.title]));
  return rows.map(r => ({
    movieId: r.movieId,
    title: titleById.get(r.movieId) ?? '',
    watched: r.watched,
  }));
}

export async function add(userId: number, movieId: number) {
  const movie = await Movie.findByPk(movieId);
  if (!movie) throw new AppError(404, 'Película no encontrada', 'MOVIE_NOT_FOUND');

  const existing = await WatchlistItem.findOne({ where: { userId, movieId } });
  if (existing) throw new AppError(409, 'La película ya existe en el watchlist', 'WL_DUP');

  const created = await WatchlistItem.create({ userId, movieId, watched: false });
  return { movieId: created.movieId, title: movie.title, watched: created.watched };
}

export async function removeByMovie(userId: number, movieId: number) {
  await WatchlistItem.destroy({ where: { userId, movieId } }); // idempotente
}
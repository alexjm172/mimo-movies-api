import * as wlRepo from '../repositories/watchlist.repository';
import { Movie } from '../models/Movie';

export async function getUserWatchlist(userId: number) {
  return wlRepo.listByUser(userId);
}

export async function addToWatchlist(userId: number, movieId: number, watched: boolean) {
  if (!Number.isFinite(movieId) || movieId < 1) {
    const e: any = new Error('ID de película inválido'); e.status = 422; throw e;
  }
  const movie = await Movie.findByPk(movieId);
  if (!movie) { const e: any = new Error('Película no encontrada'); e.status = 404; throw e; }

  const exists = await wlRepo.find(userId, movieId);
  if (exists) { const e: any = new Error('La película ya existe en el watchlist'); e.status = 409; throw e; }

  const created = await wlRepo.create(userId, movieId, watched);
  return { movieId: created.movieId, title: movie.title, watched: created.watched };
}

export async function removeFromWatchlist(userId: number, itemIdAsMovieId: number) {
  await wlRepo.removeByMovie(userId, itemIdAsMovieId); // idempotente → 204 siempre
}

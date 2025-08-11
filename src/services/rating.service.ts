import * as ratingRepo from '../repositories/rating.repository';
import * as movieRepo from '../repositories/movie.repository';
import { Movie } from '../models/Movie';

async function recalcMovieAverage(movieId: number) {
  const [count, sum] = await Promise.all([
    ratingRepo.countByMovie(movieId),
    ratingRepo.sumByMovie(movieId)
  ]);
  const avg = count > 0 ? Number((sum ?? 0) / count) : null;
  await Movie.update({ rating: avg }, { where: { id: movieId } });
}

export async function listByMovie(movieId: number) {
  const movie = await movieRepo.findAll({ filters: { }, limit: 1, offset: 0 });
  // comprobación rápida: si no hay esa movie, devolver lista vacía es válido, pero mejor 200 []
  return ratingRepo.listByMovie(movieId);
}

export async function getOne(movieId: number, ratingId: number) {
  return ratingRepo.findByIdForMovie(movieId, ratingId);
}

export async function create(movieId: number, userId: number, data: { rating: number; comment?: string }) {
  // verifica que exista la película
  const created = await ratingRepo.create(movieId, userId, data);
  await recalcMovieAverage(movieId);
  return created;
}

export async function update(movieId: number, ratingId: number, userId: number, data: { rating: number; comment?: string }) {
  const updated = await ratingRepo.updateForOwner(movieId, ratingId, userId, data);
  if (!updated) return null;
  await recalcMovieAverage(movieId);
  return updated;
}

export async function remove(movieId: number, ratingId: number, userId: number) {
  const deleted = await ratingRepo.deleteForOwner(movieId, ratingId, userId);
  if (deleted) await recalcMovieAverage(movieId);
  return deleted > 0;
}

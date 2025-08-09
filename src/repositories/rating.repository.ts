import { Rating } from '../models/Rating';

export async function listByMovie(movieId: number) {
  return Rating.findAll({
    where: { movieId },
    order: [['id', 'ASC']]
  });
}

export async function findByIdForMovie(movieId: number, ratingId: number) {
  return Rating.findOne({ where: { id: ratingId, movieId } });
}

export async function create(movieId: number, userId: number, data: { rating: number; comment?: string }) {
  return Rating.create({ movieId, userId, rating: data.rating, comment: data.comment ?? null });
}

export async function updateForOwner(movieId: number, ratingId: number, userId: number, data: { rating: number; comment?: string }) {
  const r = await Rating.findOne({ where: { id: ratingId, movieId, userId } });
  if (!r) return null;
  r.rating = data.rating;
  r.comment = data.comment ?? null;
  await r.save();
  return r;
}

export async function deleteForOwner(movieId: number, ratingId: number, userId: number) {
  return Rating.destroy({ where: { id: ratingId, movieId, userId } });
}

export async function sumByMovie(movieId: number) {
  return Rating.sum('rating', { where: { movieId } }) as Promise<number>;
}

export async function countByMovie(movieId: number) {
  return Rating.count({ where: { movieId } });
}

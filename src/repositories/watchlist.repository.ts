import { WatchlistItem } from '../models/WatchlistItem';
import { Movie } from '../models/Movie';

export async function listByUser(userId: number) {
  const items = await WatchlistItem.findAll({ where: { userId }, order: [['id', 'ASC']] });
  const movieIds = items.map(i => i.movieId);
  const movies = movieIds.length ? await Movie.findAll({ where: { id: movieIds as any } }) : [];
  const mapTitle = new Map(movies.map(m => [m.id, m.title]));
  return items.map(i => ({ movieId: i.movieId, title: mapTitle.get(i.movieId) ?? '', watched: i.watched }));
}

export async function find(userId: number, movieId: number) {
  return WatchlistItem.findOne({ where: { userId, movieId } });
}

export async function create(userId: number, movieId: number, watched: boolean) {
  return WatchlistItem.create({ userId, movieId, watched });
}

export async function removeByMovie(userId: number, movieId: number) {
  return WatchlistItem.destroy({ where: { userId, movieId } });
}

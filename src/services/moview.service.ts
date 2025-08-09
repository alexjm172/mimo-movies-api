import * as movieRepo from '../repositories/moview.repository';

export type ListMoviesInput = {
  page?: number;      // opcional (extra)
  limit?: number;     // opcional (extra)
  genre?: string;     // opcional (extra)
  titleLike?: string; // opcional (extra)
};

export async function listMovies(input: ListMoviesInput) {
  const usePagination = !!(input.page && input.limit);
  const limit = input.limit && input.limit > 0 ? input.limit : undefined;
  const page = input.page && input.page > 0 ? input.page : 1;
  const offset = usePagination && limit ? (page - 1) * limit : undefined;

  const filters = { genre: input.genre, titleLike: input.titleLike };
  const [rows, total] = await Promise.all([
    movieRepo.findAll({ limit, offset, filters }),
    usePagination ? movieRepo.count(filters) : Promise.resolve(undefined)
  ]);

  return { rows, total, page: usePagination ? page : undefined, limit };
}
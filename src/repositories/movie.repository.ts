import { FindOptions, Op } from 'sequelize';
import { Movie } from '../models/Movie';

export type MovieFilters = {
  genre?: string;
  titleLike?: string;
};

export async function findAll(params?: { limit?: number; offset?: number; filters?: MovieFilters }) {
  const options: FindOptions = { where: {} };

  if (params?.filters) {
    const where: any = {};
    if (params.filters.genre) where.genre = params.filters.genre;
    if (params.filters.titleLike) where.title = { [Op.like]: `%${params.filters.titleLike}%` };
    options.where = where;
  }
  if (typeof params?.limit === 'number') options.limit = params.limit;
  if (typeof params?.offset === 'number') options.offset = params.offset;

  return Movie.findAll(options);
}

export async function count(filters?: MovieFilters) {
  const where: any = {};
  if (filters?.genre) where.genre = filters.genre;
  if (filters?.titleLike) where.title = { [Op.like]: `%${filters.titleLike}%` };
  return Movie.count({ where });
}
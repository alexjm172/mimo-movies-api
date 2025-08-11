import { Movie } from './Movie';
import { User } from './User';
import { Rating } from './Rating';
import { WatchlistItem } from './WatchlistItem';

export function setupAssociations() {
  Rating.belongsTo(User,  { foreignKey: 'userId' });
  Rating.belongsTo(Movie, { foreignKey: 'movieId' });
  Movie.hasMany(Rating,   { foreignKey: 'movieId' });

  WatchlistItem.belongsTo(User,  { foreignKey: 'userId' });
  WatchlistItem.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' });
  Movie.hasMany(WatchlistItem,   { foreignKey: 'movieId' });
}
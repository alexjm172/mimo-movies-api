import Joi from 'joi';
export const WatchlistItemInputSchema = Joi.object({
  movieId: Joi.number().integer().min(1).required(),
  watched: Joi.boolean().default(false)
});

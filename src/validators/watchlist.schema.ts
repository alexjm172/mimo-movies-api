import Joi from 'joi';

export const watchlistParamsUserSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

export const watchlistParamsItemSchema = watchlistParamsUserSchema.keys({
  // en spec, itemId == movieId en esta implementación
  itemId: Joi.number().integer().positive().required(),
});

export const watchlistBodyAddSchema = Joi.object({
  movieId: Joi.number().integer().positive().required(),
  watched: Joi.boolean().optional(), // opcional, default false en modelo
});
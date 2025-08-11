import Joi from 'joi';

export const RatingParamsSchema = Joi.object({
  movieId: Joi.number().integer().positive().required(),
});

export const RatingParamsWithIdSchema = RatingParamsSchema.keys({
  ratingId: Joi.number().integer().positive().required(),
});

export const RatingInputSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  comment: Joi.string().max(500).allow('').optional(),
});

export const RatingUpdateSchema = Joi.object({
  rating: Joi.number().min(0).max(5).optional(),
  comment: Joi.string().max(500).allow('').optional(),
}).min(1);
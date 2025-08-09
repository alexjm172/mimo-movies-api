import Joi from 'joi';

export const RatingInputSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  comment: Joi.string().max(500).optional()
});

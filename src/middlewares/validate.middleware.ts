import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const msg = error.details.map(d => d.message).join('; ');
      return res.status(422).json({ error: msg });
    }
    req.body = value;
    next();
  };
}

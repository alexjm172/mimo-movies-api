import { RequestHandler } from 'express';
import type { ObjectSchema } from 'joi';

type Schemas = {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
};

/**
 * Valida body, query y params con Joi (422 si no pasa).
 * - stripUnknown: elimina campos que no están en el esquema
 * - abortEarly: false para devolver todas las violaciones
 */
export const validate = (schemas: Schemas): RequestHandler => {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        const { error, value } = schemas.body.validate(req.body ?? {}, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) {
          return res.status(422).json({ error: 'Datos inválidos', details: error.details });
        }
        req.body = value;
      }
      if (schemas.query) {
        const { error, value } = schemas.query.validate(req.query ?? {}, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) {
          return res.status(422).json({ error: 'Query inválida', details: error.details });
        }
        req.query = value;
      }
      if (schemas.params) {
        const { error, value } = schemas.params.validate(req.params ?? {}, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) {
          return res.status(422).json({ error: 'Parámetros inválidos', details: error.details });
        }
        req.params = value as any;
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};
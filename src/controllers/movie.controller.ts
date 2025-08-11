import { Request, Response, NextFunction } from 'express';
import * as movieService from '../services/movie.service';

export async function listMovies(req: Request, res: Response, next: NextFunction) {
  try {
    // Extraer opcionales: ?page=&limit=&genre=&titleLike=
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const genre = typeof req.query.genre === 'string' ? req.query.genre : undefined;
    const titleLike = typeof req.query.titleLike === 'string' ? req.query.titleLike : undefined;

    const result = await movieService.listMovies({ page, limit, genre, titleLike });

    // Metadatos en cabeceras (sin romper la spec)
    if (result.total !== undefined) {
      res.setHeader('X-Total-Count', String(result.total));
      res.setHeader('X-Page', String(result.page));
      if (result.limit) res.setHeader('X-Limit', String(result.limit));
    }

    // La spec array de Movie
    return res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
}
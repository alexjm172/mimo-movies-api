import { Request, Response, NextFunction } from 'express';
import * as ratingService from '../services/rating.service';

function parseId(val: string | undefined) {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

// GET /movies/:movieId/ratings
export async function listByMovie(req: Request, res: Response, next: NextFunction) {
  try {
    const movieId = parseId(req.params.movieId);
    if (Number.isNaN(movieId)) return res.status(422).json({ error: 'ID de película inválido' });

    const rows = await ratingService.listByMovie(movieId);
    // La spec para este endpoint lista: id, userId, rating, comment (sin movieId)
    const shaped = rows.map(r => ({ id: r.id, userId: r.userId, rating: r.rating, comment: r.comment ?? '' }));
    return res.status(200).json(shaped);
  } catch (err) { next(err); }
}

// GET /movies/:movieId/ratings/:ratingId
export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const movieId = parseId(req.params.movieId);
    const ratingId = parseId(req.params.ratingId);
    if (Number.isNaN(movieId) || Number.isNaN(ratingId)) return res.status(422).json({ error: 'IDs inválidos' });

    const r = await ratingService.getOne(movieId, ratingId);
    if (!r) return res.status(404).json({ error: 'Valoración no encontrada' });

    const shaped = { id: r.id, userId: r.userId, rating: r.rating, comment: r.comment ?? '' };
    return res.status(200).json(shaped);
  } catch (err) { next(err); }
}

// POST /movies/:movieId/ratings  (auth)
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const movieId = parseId(req.params.movieId);
    if (Number.isNaN(movieId)) return res.status(422).json({ error: 'ID de película inválido' });

    const user = (req as any).user as { id: number } | undefined;
    if (!user) return res.status(401).json({ error: 'No autorizado' });

    const created = await ratingService.create(movieId, user.id, req.body);
    // Para POST la spec devuelve Rating completo (incluyendo movieId)
    return res.status(201).json({
      id: created.id,
      movieId: created.movieId,
      userId: created.userId,
      rating: created.rating,
      comment: created.comment ?? ''
    });
  } catch (err) { next(err); }
}

// PATCH /movies/:movieId/ratings/:ratingId  (auth)
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const movieId = parseId(req.params.movieId);
    const ratingId = parseId(req.params.ratingId);
    if (Number.isNaN(movieId) || Number.isNaN(ratingId)) return res.status(422).json({ error: 'IDs inválidos' });

    const user = (req as any).user as { id: number } | undefined;
    if (!user) return res.status(401).json({ error: 'No autorizado' });

    const updated = await ratingService.update(movieId, ratingId, user.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Valoración no encontrada o no autorizada' });

    // Para PATCH la spec también devuelve Rating completo
    return res.status(200).json({
      id: updated.id,
      movieId: updated.movieId,
      userId: updated.userId,
      rating: updated.rating,
      comment: updated.comment ?? ''
    });
  } catch (err) { next(err); }
}

// DELETE /movies/:movieId/ratings/:ratingId  (auth)
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const movieId = parseId(req.params.movieId);
    const ratingId = parseId(req.params.ratingId);
    if (Number.isNaN(movieId) || Number.isNaN(ratingId)) return res.status(422).json({ error: 'IDs inválidos' });

    const user = (req as any).user as { id: number } | undefined;
    if (!user) return res.status(401).json({ error: 'No autorizado' });

    const ok = await ratingService.remove(movieId, ratingId, user.id);
    if (!ok) return res.status(404).json({ error: 'Valoración no encontrada o no autorizada' });

    return res.status(204).send();
  } catch (err) { next(err); }
}

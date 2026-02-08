import { Router, Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/NewsService';
import { validatePagination, validateArticleId } from '../middleware/validation';

const router = Router();
const newsService = new NewsService();

router.get(
  '/news',
  validatePagination,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string);
      const pageSize = parseInt(req.query.pageSize as string);
      
      const response = await newsService.getNewsList(page, pageSize);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/news/:id',
  validateArticleId,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const article = await newsService.getArticleById(id);
      res.json(article);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

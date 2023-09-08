import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import newsController from '../controllers/newsController.js';
const newsRouter = express.Router();
//GET ALL NEWS
newsRouter.get('/', asyncHandler(newsController.getListNews));

//GET NEWS
newsRouter.get('/:id', asyncHandler(newsController.getNewsById));

//DELETE NEWS
newsRouter.delete('/:id', protect, admin, asyncHandler(newsController.deleteNews));

//CREATE NEWS
newsRouter.post('/', protect, admin, asyncHandler(newsController.addNews));

//PUT UPDATE NEWS
newsRouter.put('/:id', protect, admin, asyncHandler(newsController.updateNews));
export default newsRouter;

import express from 'express';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import asyncHandler from 'express-async-handler';
import categoryController from '../controllers/categoryController.js';

const CategoryRouter = express.Router();

CategoryRouter.get('/', asyncHandler(categoryController.getListCategory));
CategoryRouter.delete('/:id', protect, admin, asyncHandler(categoryController.deleteCategory));
export default CategoryRouter;

CategoryRouter.post('/', protect, admin, asyncHandler(categoryController.addCategory));
CategoryRouter.put('/', protect, admin, asyncHandler(categoryController.updateCategory));

import express from 'express';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import asyncHandler from 'express-async-handler';
import cartController from '../controllers/cartController.js';

const cartRoutes = express.Router();

cartRoutes.get('/:id', asyncHandler(cartController.getCartById));

cartRoutes.post('/', asyncHandler(cartController.addCartItem));

cartRoutes.post('/delete', protect, asyncHandler(cartController.removeCartItem));

cartRoutes.delete('/:id', protect, asyncHandler(cartController.clearCart));
export default cartRoutes;

import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import Product from '../models/ProductModel.js';
import Order from '../models/OrderModel.js';
import Payment from '../models/PaymentModel.js';
import orderController from '../controllers/orderController.js';
import axios from 'axios';

const orderRouter = express.Router();

orderRouter.post('/', protect, asyncHandler(orderController.createOrder));
orderRouter.post('/:id/poductReview', protect, asyncHandler(orderController.productReview));

// orderRouter.get('/:id/address', protect, asyncHandler(orderController.getAddress));
orderRouter.get('/all', protect, admin, asyncHandler(orderController.getOrderAll));
orderRouter.get('/complete', protect, asyncHandler(orderController.completed));
orderRouter.get('/:id', protect, asyncHandler(orderController.getOrderById));
orderRouter.get('/', protect, asyncHandler(orderController.getOrderByUser));

orderRouter.put('/:id/confirm', protect, admin, asyncHandler(orderController.confirmOrder));
orderRouter.put('/:id/delivery', protect, admin, asyncHandler(orderController.confirmDelivery));
orderRouter.put('/:id/delivered', protect, admin, asyncHandler(orderController.confirmDelivered));
orderRouter.put('/:id/received', protect, asyncHandler(orderController.confirmReceived));
orderRouter.put('/:id/cancel', protect, asyncHandler(orderController.cancelOrder));

export default orderRouter;

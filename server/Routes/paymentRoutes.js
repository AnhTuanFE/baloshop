import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middleware/AuthMiddleware.js';
import paymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();
paymentRouter.post(
    '/:id/pay',
    // protect,
    // auth('user'),
    asyncHandler(paymentController.paymentOrder),
);
paymentRouter.post('/notification', asyncHandler(paymentController.orderPaymentNotification));
paymentRouter.post('/refund', protect, asyncHandler(paymentController.refundTrans));
export default paymentRouter;

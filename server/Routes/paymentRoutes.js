import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import paymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();
paymentRouter.post('/:id/pay', protect, asyncHandler(paymentController.paymentOrder));
paymentRouter.post('/notification-from-momo', asyncHandler(paymentController.paymentNotificationFromMomo));
paymentRouter.post('/notification-from-paypal', asyncHandler(paymentController.paymentNotificationFromPaypal));
paymentRouter.post('/refund', protect, admin, asyncHandler(paymentController.refundTrans));
paymentRouter.get('/', asyncHandler(paymentController.getOrderPaypal));
paymentRouter.post(
    '/user-notification-paid-from-momo',
    protect,
    asyncHandler(paymentController.paymentUserNotificationPaidFromMomo),
);

export default paymentRouter;

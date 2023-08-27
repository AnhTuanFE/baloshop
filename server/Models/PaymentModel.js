import mongoose from 'mongoose';
import { PAYMENT_METHOD, PAYMENT_WITH_CASH } from '../config/PaymentConfig.js';

const paymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Order',
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: PAYMENT_METHOD,
            default: PAYMENT_WITH_CASH,
        },
        payUrl: {
            type: String,
            default: null,
        },
        paymentAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        message: {
            type: String,
        },
        paid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        paymentTransaction: {
            type: Object,
            default: {},
        },
        refundTrans: [{ type: String }],
    },
    {
        timestamps: true,
    },
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

import mongoose from 'mongoose';
import { CREATED, PAYMENT_METHODS, PAYMENT_STATUS, PAY_WITH_CASH } from '../config/paymentMethodConfig.js';

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
            enum: PAYMENT_METHODS,
            default: PAY_WITH_CASH,
        },
        payUrl: {
            type: String,
            default: null,
        },
        amount: {
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
        status: {
            type: String,
            required: true,
            enum: PAYMENT_STATUS,
            default: CREATED,
        },
        momoPaymentTransaction: {
            partnerCode: {
                type: String,
            },
            orderId: {
                type: String,
            },
            orderInfo: {
                type: String,
            },
            amount: {
                type: Number,
            },
            payType: {
                type: String,
            },
            orderType: {
                type: String,
            },
            message: {
                type: String,
            },
            resultCode: {
                type: Number,
            },
            extraData: {
                type: String,
            },
            transId: {
                type: String,
            },
            refundTrans: {
                type: Array,
            },
        },
        paypalPaymentTransaction: {
            id: {
                type: String,
            },
            intent: {
                type: String,
            },
            status: {
                type: String,
            },
            payment_source: {
                type: String,
            },
            purchase_units: [],
            payer: {
                type: Object,
            },
            amount: { type: Object },
            refundTrans: [{ type: String }],
        },
    },
    {
        timestamps: true,
    },
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

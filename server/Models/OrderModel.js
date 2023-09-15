import mongoose from 'mongoose';
import { PAYMENT_METHODS } from '../config/paymentMethodConfig.js';
import { PLACED, ORDER_STATUS } from '../config/orderStatusConfig.js';

const orderStatus = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            enum: ORDER_STATUS,
            default: PLACED,
        },
        description: {
            type: String,
            default: '',
        },
        updateBy: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);
const orderItem = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    sku: { type: Number },
    name: {
        type: String,
        required: true,
    },
    color: { type: String, required: true },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    isAbleToReview: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [orderItem],
        label_id_GiaoHangTK: {
            type: String,
            required: false,
        },
        shippingAddress: {
            city: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            address: { type: String, required: true },
            postalCode: { type: String, required: false },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: PAYMENT_METHODS,
            default: PAYMENT_METHODS[1],
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalProductPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        phone: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
        },
        status: {
            type: String,
            required: true,
            enum: ORDER_STATUS,
            default: PLACED,
        },
        statusHistory: [orderStatus],
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

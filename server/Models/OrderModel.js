import mongoose from 'mongoose';

const productReviewSchema = mongoose.Schema(
    {
        userName: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        // id_predefined: { type: String, required: false },
        orderItems: [
            {
                name: { type: String, required: true },
                color: { type: String, required: true },
                qty: { type: Number, required: true },
                weight: { type: Number, required: true, default: 0 },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                id_product: {
                    type: Number,
                    // required: true,
                },
                productReview: [productReviewSchema],
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        label_id_GiaoHangTK: {
            type: String,
            required: false,
        },
        shippingAddress: {
            city: { type: String, required: true },
            distric: { type: String, required: true },
            ward: { type: String, required: true },
            address: { type: String, required: true },
            postalCode: { type: String, required: false },
        },
        paymentMethod: {
            type: String,
            required: true,
            default: 'Thanh toán bằng tiền mặt',
        },
        paypalOrder: {
            orderID: { type: String, required: false },
            payerID: { type: String, required: false },
            cost: { type: Number, required: false },
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        waitConfirmation: {
            type: Boolean,
            required: true,
            default: false,
        },
        waitConfirmationAt: {
            type: Date,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        completeUser: {
            type: Boolean,
            required: true,
            default: false,
        },
        completeUserAt: {
            type: Date,
        },
        completeAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        completeAdminAt: {
            type: Date,
        },
        cancel: {
            type: Number,
            default: 0,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
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
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

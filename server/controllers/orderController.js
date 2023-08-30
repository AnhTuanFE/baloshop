import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js';
import Payment from '../models/PaymentModel.js';
import Cart from '../models/CartModel.js';
import momoService from '../utils/momoService.js';
import axios from 'axios';
import {
    PAYMENT_METHODS,
    PAY_WITH_CASH,
    PAY_WITH_MOMO,
    PAY_WITH_ATM,
    PAY_WITH_CREDIT_CARD,
    PAY_WITH_PAYPAL,
} from '../config/paymentMethodConfig.js';

const createOrder = async (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, phone, name } = req.body;

    if (!orderItems && orderItems.length <= 0) {
        res.status(400);
        throw new Error('không có sản phẩm nào trong đơn hàng');
    }
    if (PAYMENT_METHODS.findIndex((e) => e == paymentMethod) === -1) {
        res.status(400);
        throw new Error('Phương thức thanh toán không hợp lệ');
    }
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };
    try {
        await session.withTransaction(async () => {
            let totalProductPrice = 0;
            const dataOrderItems = [];
            const orderItemIds = [];
            const createOrderItems = orderItems.map(async (orderItem) => {
                const orderedProduct = await Product.findOne({
                    _id: orderItem.product,
                });

                if (!orderedProduct) {
                    await session.abortTransaction();
                    res.status(400);
                    throw new Error(`Sản phẩm "${orderItem.name}" không tồn tại`);
                } else {
                    const optionIndex = orderedProduct.optionColor.findIndex((opt) => opt.color == orderItem.color);
                    console.log(orderedProduct.optionColor);
                    if (optionIndex === -1) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Sản phẩm "${orderItem.name}" không tồn tại màu "${orderItem.color}".`);
                    } else if (orderedProduct.optionColor[optionIndex].countInStock < orderItem.quantity) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Số lượng trong kho của sản phẩm "${orderItem.name}" không đủ số lượng.`);
                    } else {
                        console.log(orderedProduct.optionColor[optionIndex].countInStock);

                        orderedProduct.optionColor[optionIndex].countInStock =
                            Number(orderedProduct.optionColor[optionIndex].countInStock) - Number(orderItem.quantity);
                        totalProductPrice += orderedProduct.price;
                        orderItemIds.push(orderedProduct._id);
                        dataOrderItems.push({
                            ...orderItem,
                            weight: orderedProduct.optionColor[optionIndex].weight,
                            price: orderedProduct.price,
                        });
                        console.log(orderedProduct.optionColor);

                        await orderedProduct.save({ session });
                    }
                }
            });
            await Promise.all(createOrderItems);
            if (dataOrderItems.length < orderItems.length) {
                await session.abortTransaction();
                res.status(502);
                throw new Error('Xảy ra lỗi khi tạo đơn hàng, vui lòng làm mới trang và thử lại');
            }
            const totalPrice = Number(totalProductPrice + Number(shippingPrice)).toFixed();
            const orderInfo = new Order({
                orderItems: dataOrderItems,
                user: req.user._id,
                name: name,
                phone: phone,
                paymentMethod: paymentMethod,
                shippingAddress: shippingAddress,
                shippingPrice: shippingPrice,
                totalProductPrice: totalProductPrice,
                totalPrice: totalPrice,
                status: 'placed',
                statusHistory: [],
            });
            orderInfo.statusHistory.push({ status: 'placed', description: '', updateBy: req.user._id });

            const newPayment = new Payment({
                user: req.user._id,
                order: orderInfo._id,
                paymentAmount: orderInfo.totalPrice,
            });
            newPayment.paymentMethod = paymentMethod;

            // if (paymentMethod == PAY_WITH_PAYPAL) {
            //     //
            // } else
            if (
                paymentMethod == PAY_WITH_MOMO ||
                paymentMethod == PAY_WITH_ATM ||
                paymentMethod == PAY_WITH_CREDIT_CARD
            ) {
                let hostName = req.get('host');
                if (req.protocol != 'https') {
                    hostName = process.env.DEFAULT_API_URL;
                }

                //Create payment information with momo
                const amount = Number(orderInfo.totalPrice);
                const redirectUrl = `${process.env.CLIENT_URL}/order/${orderInfo._id}`;
                const ipnUrl = `${hostName}/api/payments/notification-from-momo`;
                const requestId = uuidv4();
                const orderInformation = 'Thanh toán đơn hàng tại Balo Shop';
                const lang = 'vi';
                const extraData = '';
                const orderGroupId = '';
                let requestType = 'payWithMethod';
                if (paymentMethod == PAY_WITH_MOMO) {
                    requestType = 'captureWallet';
                } else if (paymentMethod == PAY_WITH_ATM) {
                    requestType = 'payWithATM';
                } else if (paymentMethod == PAY_WITH_CREDIT_CARD) {
                    requestType = 'payWithCC';
                }

                const requestBody = momoService.buildPaymentRequest(
                    orderInfo._id,
                    requestId,
                    orderInformation,
                    amount,
                    redirectUrl,
                    ipnUrl,
                    lang,
                    extraData,
                    orderGroupId,
                    requestType,
                );
                console.log(requestBody);
                const momo = axios.create({
                    baseURL: process.env.MOMO_API_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(requestBody),
                    },
                });
                await momo
                    .post('/v2/gateway/api/create', requestBody)
                    .then((response) => {
                        newPayment.payUrl = response.data.payUrl;
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        console.log(error);
                        res.status(400);
                        throw new Error(error.response?.message || error.message);
                    });
            }
            await newPayment.save({ session });
            orderInfo.payment = newPayment._id;
            await Cart.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { cartItems: { product: { $in: orderItemIds } } } },
            )
                .session(session)
                .lean();
            const newOrder = await (await orderInfo.save({ session })).populate({ path: 'payment' });
            if (!newOrder) {
                await session.abortTransaction();
                res.status(500);
                throw new Error('Xảy ra lỗi trong quá trình tạo đơn hàng, vui lòng thử lại.');
            }
            console.log(newOrder);
            res.status(201).json({ newOrder });
            await session.commitTransaction();
        }, transactionOptions);
    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        session.endSession();
    }
};

const orderController = { createOrder };
export default orderController;

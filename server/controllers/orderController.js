import mongoose from 'mongoose';
import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js';
import Payment from '../models/PaymentModel.js';
import Cart from '../models/CartModel.js';
import { PAYMENT_METHOD, PAYMENT_WITH_CASH, PAYMENT_WITH_MOMO, PAYMENT_WITH_PAYPAL } from '../config/PaymentConfig.js';
import { buildPaymentRequest, buildRefundRequest } from '../utils/paymentWithMomo.js';
import { v4 as uuidv4 } from 'uuid';
import payment_momo from '../config/MomoConfig.js';

const createOrder = async (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, phone, name } = req.body;

    if (!orderItems && orderItems.length <= 0) {
        res.status(400);
        throw new Error('không có sản phẩm nào trong đơn hàng');
    }
    if (PAYMENT_METHOD.findIndex((e) => e == paymentMethod) === -1) {
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
                    if (optionIndex === -1) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Sản phẩm "${orderItem.name}" không tồn tại màu "${orderItem.color}".`);
                    } else if (orderedProduct.optionColor[optionIndex].countInStock < orderItem.qty) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Số lượng trong kho của sản phẩm "${orderItem.name}" không đủ số lượng.`);
                    } else {
                        orderedProduct.optionColor[optionIndex].countInStock -= orderItem.qty;
                        totalProductPrice += orderedProduct.price;
                        orderItemIds.push(orderedProduct._id);
                        dataOrderItems.push({
                            ...orderItem,
                            weight: orderedProduct.optionColor[optionIndex].weight,
                            price: orderedProduct.price,
                        });
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
            });
            const newPaymentInformation = new Payment({
                user: req.user._id,
                order: orderInfo._id,
                paymentAmount: orderInfo.totalPrice,
            });
            newPaymentInformation.paymentMethod = paymentMethod;

            if (newPaymentInformation.paymentMethod == PAYMENT_WITH_MOMO) {
                let baseUrl = `${req.protocol}://${req.get('host')}`;
                const checkBaseUrl = baseUrl.slice(0, baseUrl.indexOf(':'));
                if (checkBaseUrl != 'https') {
                    baseUrl = process.env.DEFAULT_API_URL;
                }

                //Create payment information with momo
                const amount = Number(orderInfo.totalPrice);
                const redirectUrl = `${process.env.CLIENT_URL}/order/${orderInfo._id}`;
                const ipnUrl = `${baseUrl}/api/payment/notification`;
                const requestId = uuidv4();
                const requestBody = buildPaymentRequest(
                    orderInfo._id,
                    requestId,
                    'Thanh toán đơn hàng tại Balo Shop',
                    amount,
                    redirectUrl,
                    ipnUrl,
                    'vi',
                );
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(requestBody),
                    },
                };

                await payment_momo
                    .post('/v2/gateway/api/create', requestBody, config)
                    .then((response) => {
                        newPaymentInformation.payUrl = response.data.shortLink;
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        console.log(error);
                        res.status(400);
                        throw new Error(error.response?.message || error.message);
                    });

                await newPaymentInformation.save({ session });
                orderInfo.payment = newPaymentInformation._id;
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
            }
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

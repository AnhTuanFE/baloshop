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
    PAYMENT_SUCCESS,
    REFUND,
} from '../config/paymentMethodConfig.js';
import { orderQueryParams, validateConstants } from '../utils/searchConstants.js';

const handleConfigProducts = (orderItems) => {
    const products = [];
    for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        const product = {
            name: item.name,
            weight: item.weight || 0.5,
            quantity: item.quantity,
            product_code: item.product,
        };
        products.push(product);
    }
    return products;
};

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
                    if (optionIndex === -1) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Sản phẩm "${orderItem.name}" không tồn tại màu "${orderItem.color}".`);
                    } else if (orderedProduct.optionColor[optionIndex].countInStock < orderItem.quantity) {
                        await session.abortTransaction();
                        res.status(400);
                        throw new Error(`Số lượng trong kho của sản phẩm "${orderItem.name}" không đủ số lượng.`);
                    } else {
                        orderedProduct.optionColor[optionIndex].countInStock -= Number(orderItem.quantity);
                        totalProductPrice += orderedProduct.price;
                        orderItemIds.push(orderedProduct._id);
                        dataOrderItems.push({
                            ...orderItem,
                            weight: orderedProduct.optionColor[optionIndex].weight,
                            price: orderedProduct.price,
                        });
                        orderedProduct.totalSales += Number(orderItem.quantity);
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
                        console.log(JSON.stringify(error));
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
            res.status(201).json({ newOrder });
            await session.commitTransaction();
        }, transactionOptions);
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    } finally {
        session.endSession();
    }
};

const getOrderAll = async (req, res) => {
    const limit = Number(req.query.limit || 12);
    const page = Number(req.query.pageNumber) || 1;
    const sortBy = validateConstants(orderQueryParams, 'sort', req.query.sortBy);
    const orderStatusFilter = validateConstants(orderQueryParams, 'status', req.query.status);
    let search = {};
    if (req.query.keyword) {
        search.email = {
            $regex: req.query.keyword,
            $options: 'i',
        };
    }

    const count = await Order.countDocuments({ ...search, ...orderStatusFilter });
    let orders = await Order.find({ ...search })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ ...sortBy })
        // .populate('user', 'id name email')
        .populate('payment')
        .lean();

    res.json({ orders, page, pages: Math.ceil(count / limit), total: count });
};
const completed = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'completed' }).sort({ _id: -1 });
        // const orders = await Order.find({ 'payment.paid': true })
        //     .sort({ _id: -1 })
        //     .populate('user', 'id name email')
        //     .populate('payment');

        if (orders) {
            res.json(orders);
        }
    } catch (err) {
        console.log('err');
    }
};

const getOrderByUser = async (req, res) => {
    // const limit = Number(req.query.limit) || 20; //EDIT HERE
    // const page = Number(req.query.page) || 0;
    // const status = String(req.query.status) || null;
    const orderFilter = { user: req.user._id };
    // if (status) {
    //     orderFilter.status = status;
    // }
    const count = await Order.countDocuments({ ...orderFilter });
    const orders = await Order.find({ ...orderFilter })
        .populate('payment')
        // .limit(limit)
        // .skip(limit * page)
        .sort({ createdAt: 'desc' })
        .lean();
    res.status(200).json({ orders, total: count });
};

const getOrderById = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }).populate('payment').lean();
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại');
    }
    res.status(200).json({ order });
};

// Update: CONFIRM ORDER
const confirmOrder = async (req, res) => {
    const orderId = req.params.id || '';
    const description = String(req.body.description) || '';
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    switch (order.status) {
        case 'confirm':
            res.status(400);
            throw new Error('Đơn hàng đã được xác nhận');
        case 'delivering':
            res.status(400);
            throw new Error('Đơn hàng đang ở trạng thái đang giao');
        case 'delivered':
            res.status(400);
            throw new Error('Đơn hàng đã được giao thành công');
        case 'completed':
            res.status(400);
            throw new Error('Đơn hàng đã được hoàn thành');
        case 'cancelled':
            res.status(400);
            throw new Error('Đơn hàng đã bị hủy');
        default:
            break;
    }
    order.statusHistory.push({ status: 'confirm', description: description, updateBy: req.user._id });
    order.status = 'confirm';

    const updateOrder = await order.save();
    await updateOrder.populate('payment');
    res.status(200).json({ message: 'Xác nhận đơn hàng thành công', updateOrder });
};
const handleCreateOrderGHTK = async (products, order, address_shop) => {
    const createOrder = {
        products: products,
        order: {
            id: order._id,
            pick_name: 'SHOP BALO',
            pick_money: 0,
            pick_tel: '0357666666',
            pick_province: 'Thành phố Hồ Chí Minh',
            pick_district: 'Quận Gò Vấp',
            pick_ward: 'Phường 05',
            pick_address: '566/191 Nguyễn Thái Sơn',
            name: order.name,
            tel: order.phone,
            email: order.email,
            province: 'Thành phố Hồ Chí Minh',
            district: 'Quận Gò Vấp',
            ward: 'Phường 05',
            address: '566/191 Nguyễn Thái Sơn',
            hamlet: 'Khác',
            value: order.totalPrice,
            transport: 'road',
            // is_freeship: '1',
            // pick_date: dateString,
            // note: 'Khối lượng tính cước tối đa: 1.00 kg',
            // pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
            // deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
            // pick_session: 2, // Phiên lấy xfast
            // booking_id: 2,
            // tags: [1, 7],
        },
    };
    const url = `${process.env.GHTK_API_URL}/services/shipment/order`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Token: process.env.GHTK_TOKEN,
        },
    };
    const { data } = await axios.post(url, createOrder, config);
    return data;
};
const confirmDelivery = async (req, res) => {
    const description = String(req.body.description) || '';
    const address_shop = req.body.address_shop;
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    switch (order.status) {
        case 'placed':
            res.status(400);
            throw new Error('Đơn hàng chưa được xác nhận');
        case 'delivering':
            res.status(400);
            throw new Error('Đơn hàng đã ở trạng thái đang giao');
        case 'delivered':
            res.status(400);
            throw new Error('Đơn hàng đã được giao thành công');
        case 'completed':
            res.status(400);
            throw new Error('Đơn hàng đã được hoàn thành');
        case 'cancelled':
            res.status(400);
            throw new Error('Đơn hàng đã bị hủy');
        default:
            break;
    }

    const products = await handleConfigProducts(order.orderItems);
    const dataOrderGHTK = await handleCreateOrderGHTK(products, order, address_shop);
    order.label_id_GiaoHangTK = dataOrderGHTK.order.label;
    order.status = 'delivering';

    order.statusHistory.push({ status: 'delivering', description: description, updateBy: req.user._id });

    const updatedOrder = await order.save();
    await updatedOrder.populate('payment');
    res.status(200).json({ message: 'Tạo đơn giao hàng thành công', updatedOrder });
};

const confirmDelivered = async (req, res) => {
    const orderId = req.params.id || '';
    const description = req.body.description?.toString()?.trim() || '';
    const order = await Order.findOne({ _id: orderId }).populate('payment');
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    switch (order.status) {
        case 'placed':
            res.status(400);
            throw new Error('Đơn hàng chưa được xác nhận');
        case 'confirm':
            res.status(400);
            throw new Error('Đơn hàng chưa được tạo đơn giao hàng');
        case 'delivered':
            res.status(400);
            throw new Error('Đơn hàng đã được giao thành công');
        case 'completed':
            res.status(400);
            throw new Error('Đơn hàng đã được hoàn thành');
        case 'cancelled':
            res.status(400);
            throw new Error('Đơn hàng đã bị hủy');
        default:
            break;
    }
    if (order.paymentMethod == PAY_WITH_CASH) {
        order.payment.paid = true;
        order.payment.paidAt = new Date();
        order.statusHistory.push({ status: 'paid', description: description });
        await order.payment.save();
    }
    order.statusHistory.push({ status: 'delivered', description: description });
    order.status = 'delivered';
    const updateOrder = await order.save();
    await updateOrder.populate('payment');
    res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
};

const confirmReceived = async (req, res) => {
    const orderId = req.params.id;
    const description = req.body.description?.toString()?.trim() || '';
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    switch (order.status) {
        case 'placed':
            res.status(400);
            throw new Error('Đơn hàng chưa được xác nhận');
        case 'confirm':
            res.status(400);
            throw new Error('Đơn hàng  chỉ mới xác nhận chưa bắt đầu giao hàng');
        case 'delivering':
            res.status(400);
            throw new Error('Đơn hàng chưa được giao thành công');
        case 'completed':
            res.status(400);
            throw new Error('Đơn hàng đã được hoàn thành');
        case 'cancelled':
            res.status(400);
            throw new Error('Đơn hàng đã bị hủy');
        default:
            break;
    }
    order.statusHistory.push({ status: 'completed', description: description, updateBy: req.user._id });
    order.status = 'completed';
    order.orderItems = order.orderItems.map((orderItem) => {
        orderItem.isAbleToReview = true;
        return orderItem;
    });
    const updateOrder = await order.save();
    await updateOrder.populate('payment');
    res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
};
const cancelOrder = async (req, res, next) => {
    const orderId = req.params.id || '';
    const description = req.body.description?.toString()?.trim() || '';
    const order = await Order.findOne({ _id: orderId }).populate('payment');
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại');
    }
    if (req.user.isAdmin) {
        switch (order.status) {
            case 'delivered':
                res.status(400);
                throw new Error('Đơn hàng đã được giao thành công. Không thể hủy đơn hàng');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành. Không thể hủy đơn hàng');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    } else if (req.user._id.toString() == order.user.toString()) {
        switch (order.status) {
            case 'confirm':
                res.status(400);
                throw new Error('Đơn hàng đã được xác nhận. Không thể hủy đơn hàng');
            case 'delivering':
                res.status(400);
                throw new Error('Đơn hàng đang được giao đến bạn. Không thể hủy đơn hàng');
            case 'delivered':
                res.status(400);
                throw new Error('Đơn hàng đã được giao thành công. Không thể hủy đơn hàng');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành. Không thể hủy đơn hàng');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    } else {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại');
    }
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };
    try {
        await session.withTransaction(async () => {
            const updateOrderItems = order.orderItems.map(async (orderItem) => {
                const updateProduct = await Product.findOne({ _id: orderItem.product });

                const optionIndex = updateProduct.optionColor.findIndex((opt) => opt.color == orderItem.color);
                updateProduct.optionColor[optionIndex].countInStock += Number(orderItem.quantity);
                updateProduct.totalSales += Number(orderItem.quantity);
                await updateProduct.save({ session });
            });
            await Promise.all(updateOrderItems);
            // if (order.status == 'delivering' && order.delivery.deliveryCode) {
            //     const config = {
            //         data: JSON.stringify({
            //             shop_id: Number(process.env.GHN_SHOP_ID),
            //             order_codes: [new String(order.delivery.deliveryCode)],
            //         }),
            //     };
            //     const deliveryInfo = await GHN_Request.get('v2/switch-status/cancel', config)
            //         .then((response) => {
            //             return response.data.data;
            //         })
            //         .catch((error) => {
            //             res.status(error.response.data.code || 502);
            //             throw new Error(error.response.data.message || error.message || null);
            //         });

            //     if (!deliveryInfo) {
            //         await session.abortTransaction();
            //         res.status(502);
            //         throw new Error('Gặp lỗi khi hủy đơn giao hàng của đơn vị Giao Hàng Nhanh');
            //     }
            // }
            if (
                order.payment.paid &&
                (order.paymentMethod == PAY_WITH_MOMO ||
                    order.paymentMethod == PAY_WITH_ATM ||
                    order.paymentMethod == PAY_WITH_CREDIT_CARD)
            ) {
                const lang = 'vi';
                const requestId = uuidv4();
                const orderId = uuidv4();
                const { amount, transId } = order.payment.momoPaymentTransaction;
                const requestBody = momoService.buildRefundRequest(
                    orderId,
                    amount,
                    description,
                    requestId,
                    transId,
                    lang,
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
                    .post('/v2/gateway/api/refund', requestBody)
                    .then(async (response) => {
                        console.log('response.data momo = ', response.data);
                        const {
                            partnerCode,
                            requestId,
                            amount,
                            orderId,
                            resultCode,
                            message,
                            extraData,
                            orderInfo,
                            orderType,
                            payType,
                            transId,
                        } = response.data;
                        if (resultCode == 0) {
                            const paymentTransaction = {
                                partnerCode,
                                requestId,
                                amount,
                                orderId,
                                resultCode,
                                message,
                                extraData,
                                orderInfo,
                                orderType,
                                payType,
                                transId,
                            };
                            order.payment.paid = false;
                            order.payment.status = REFUND;
                            order.payment.paymentTransaction = { ...paymentTransaction };
                            await order.payment.save({ session });
                        } else {
                            await session.abortTransaction();
                            res.status(400);
                            throw new Error(message);
                        }
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        console.log(error);
                        res.status(400);
                        throw new Error(error.response?.message || error.message);
                    });
            }
            order.status = 'cancelled';
            order.statusHistory.push({ status: 'cancelled', description: description });
            const cancelledOrder = await order.save();
            console.log(cancelOrder);
            if (!cancelledOrder) {
                await session.abortTransaction();
                res.status(502);
                throw new Error('Gặp lỗi khi hủy đơn hàng');
            }
            res.status(200).json({ message: 'Hủy đơn hàng thành công' });
        }, transactionOptions);
    } catch (error) {
        next(error);
    } finally {
        await session.endSession();
    }
};

const orderController = {
    createOrder,
    getOrderAll,
    completed,
    getOrderByUser,
    getOrderById,
    confirmOrder,
    confirmDelivery,
    confirmDelivered,
    cancelOrder,
    confirmReceived,
};
export default orderController;

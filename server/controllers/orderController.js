// import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import Order from '../Models/OrderModel.js';
import Product from '../Models/ProductModel.js';
import Payment from '../Models/PaymentModel.js';
import Cart from '../Models/CartModel.js';
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

/*
        orderInfo.statusHistory = [
            { status: 'placed', description: '', updateBy: req.user._id },
            { status: 'paid', description: '', updateBy: req.user._id },
            { status: 'confirm', description: '', updateBy: req.user._id },
            { status: 'delivering', description: '', updateBy: req.user._id },
            { status: 'delivered', description: '', updateBy: req.user._id },
            { status: 'completed', description: '', updateBy: req.user._id },
        ];
        orderInfo.statusHistory = [
            { status: 'placed', description: '', updateBy: req.user._id },
            { status: 'confirm', description: '', updateBy: req.user._id },
            { status: 'delivering', description: '', updateBy: req.user._id },
            { status: 'delivered', description: '', updateBy: req.user._id },
            { status: 'completed', description: '', updateBy: req.user._id },
        ];
    */
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
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, phone, name, email } = req.body;

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
                email: email,
                paymentMethod: paymentMethod,
                shippingAddress: shippingAddress,
                shippingPrice: shippingPrice,
                totalProductPrice: totalProductPrice,
                totalPrice: totalPrice,
                status: 'placed',
                statusHistory: [],
            });

            if (
                paymentMethod == PAY_WITH_MOMO ||
                paymentMethod == PAY_WITH_ATM ||
                paymentMethod == PAY_WITH_CREDIT_CARD
            ) {
                orderInfo.statusHistory = [
                    { status: 'placed', description: '', updateBy: req.user._id },
                    { status: 'paid', description: '', updateBy: req.user._id },
                    { status: 'confirm', description: '', updateBy: req.user._id },
                    { status: 'delivering', description: '', updateBy: req.user._id },
                    { status: 'delivered', description: '', updateBy: req.user._id },
                    { status: 'completed', description: '', updateBy: req.user._id },
                ];
            }
            if (paymentMethod == PAY_WITH_CASH) {
                orderInfo.statusHistory = [
                    { status: 'placed', description: '', updateBy: req.user._id },
                    { status: 'confirm', description: '', updateBy: req.user._id },
                    { status: 'delivering', description: '', updateBy: req.user._id },
                    { status: 'delivered', description: '', updateBy: req.user._id },
                    { status: 'completed', description: '', updateBy: req.user._id },
                ];
            }

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
                const requestId = nanoid(36);
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
                        console.log('tạo đơn momo thành công');
                    })
                    .catch(async (error) => {
                        await session.abortTransaction();
                        console.log('lỗi tạo đơn momo', JSON.stringify(error));
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
        console.log('lỗi tạo đơn catch', JSON.stringify(error));
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
    let allFilteredOrders = [];
    let orders;
    let limitFilter;
    if (req.query.keyword) {
        const keywordRegex = new RegExp(req.query.keyword, 'i');
        search.$or = [{ name: keywordRegex }, { phone: keywordRegex }, { email: keywordRegex }];
    }
    if (req.query.status) {
        if (req.query.status == 'delivering') {
            let ordersFilteredForStatus = await Order.find({ status: 'delivering' }).populate('payment').sort({
                _id: -1,
            });

            allFilteredOrders = [...ordersFilteredForStatus];
        }
        if (req.query.status == 'delivered') {
            const ordersFilteredForStatus = await Order.find({ status: 'delivered' }).populate('payment').sort({
                _id: -1,
            });

            allFilteredOrders = [...ordersFilteredForStatus];
        }
        if (req.query.status == 'paid') {
            let ordersFilteredForStatus = await Order.find({}).populate('payment').sort({
                _id: -1,
            });
            const filteredOrders = ordersFilteredForStatus.filter(
                (order) => order.payment && order.payment.paid === true,
            );
            allFilteredOrders = [...filteredOrders];
        }
        if (req.query.status == 'unpaid') {
            let ordersFilteredForStatus = await Order.find({}).populate('payment').sort({
                _id: -1,
            });
            const filteredOrders = ordersFilteredForStatus.filter(
                (order) => order.payment && order.payment.paid === false,
            );
            allFilteredOrders = [...filteredOrders];
        } else {
            const statusValues = req.query.status.split(',');
            search.status = { $in: statusValues };
        }
    }
    const count = await Order.countDocuments({ ...search, ...orderStatusFilter });
    if (allFilteredOrders.length > 0) {
        if (allFilteredOrders.length < limit) {
            limitFilter = allFilteredOrders.length;
        } else {
            limitFilter = limit;
        }
        orders = [...allFilteredOrders];
        res.json({
            orders,
            page,
            pages: Math.ceil(allFilteredOrders.length / limitFilter),
            total: allFilteredOrders.length,
        });
    }
    if (count < limit) {
        limitFilter = count;
    } else {
        limitFilter = limit;
    }
    let orders_1 = await Order.find({ ...search })
        .limit(limitFilter)
        .skip(limitFilter * (page - 1))
        .sort({ ...sortBy })
        // .populate('user', 'id name email')
        .populate('payment')
        .lean();
    orders = [...orders_1, ...allFilteredOrders];
    res.json({ orders, page, pages: Math.ceil(count / limitFilter), total: count });
};

const completed = async (req, res) => {
    try {
        let search = {};
        const count = await Order.countDocuments({ ...search });
        const ordersComplete = await Order.find({ status: 'completed' }).sort({ _id: -1 });
        // const ordersPaid = await Order.find({ status: '' }).sort({ _id: -1 });
        let totalSale = 0;
        if (ordersComplete) {
            ordersComplete.map((order) => (totalSale = totalSale + order.totalPrice));
        }
        // const totalOrders = await Order.find({}).sort({ _id: -1 });

        // const orders = await Order.find({ 'payment.paid': true })
        //     .sort({ _id: -1 })
        //     .populate('user', 'id name email')
        //     .populate('payment');

        if (ordersComplete) {
            res.json({ orders: ordersComplete, totalSale: totalSale, quantity: ordersComplete.length, total: count });
        } else {
            res.json({ orders: {}, totalSale: totalSale, quantity: 0, total: 0 });
        }
    } catch (err) {
        console.log('err');
    }
};
const ordersPaid = async (req, res) => {
    try {
        let ordersFilteredForStatus = await Order.find({}).populate('payment').sort({
            _id: -1,
        });
        const filterOrdersPaid = ordersFilteredForStatus.filter(
            (order) => order.payment && order.payment.paid === true,
        );

        let search = {};
        const count = await Order.countDocuments({ ...search });
        let totalSale = 0;
        if (filterOrdersPaid) {
            filterOrdersPaid.map((order) => (totalSale = totalSale + order.totalPrice));
        }
        if (filterOrdersPaid) {
            res.json({
                orders: filterOrdersPaid,
                totalSale: totalSale,
                quantity: filterOrdersPaid.length,
                total: count,
            });
        } else {
            res.json({ orders: {}, totalSale: totalSale, quantity: 0, total: 0 });
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

// orderInfo.statusHistory = [
//     { status: 'placed', description: '', updateBy: req.user._id },
//     { status: 'paid', description: '', updateBy: req.user._id },
//     { status: 'confirm', description: '', updateBy: req.user._id },
//     { status: 'delivering', description: '', updateBy: req.user._id },
//     { status: 'delivered', description: '', updateBy: req.user._id },
//     { status: 'completed', description: '', updateBy: req.user._id },
// ];
// orderInfo.statusHistory = [
//     { status: 'placed', description: '', updateBy: req.user._id },
//     { status: 'confirm', description: '', updateBy: req.user._id },
//     { status: 'delivering', description: '', updateBy: req.user._id },
//     { status: 'delivered', description: '', updateBy: req.user._id },
//     { status: 'completed', description: '', updateBy: req.user._id },
// ];
// Update: CONFIRM ORDER
const confirmOrder = async (req, res) => {
    const orderId = req.params.id || '';
    const description = String(req.body.description) || '';
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    if (order.paymentMethod == 'pay-with-cash') {
        switch (order.status) {
            case 'confirm':
                res.status(400);
                throw new Error('Đơn hàng đã được xác nhận');
            case 'delivering':
                res.status(400);
                throw new Error('Đơn hàng đang ở trạng thái đang giao');
            case 'delivered':
                res.status(400);
                throw new Error('Đơn hàng đã giao thành công');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    } else {
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa thanh toán');
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
    }
    order.status = 'confirm';
    if (
        order.paymentMethod == PAY_WITH_MOMO ||
        order.paymentMethod == PAY_WITH_ATM ||
        order.paymentMethod == PAY_WITH_CREDIT_CARD
    ) {
        order.statusHistory[2] = { status: 'confirm', description: description, updateBy: req.user._id };
    }
    if (order.paymentMethod == PAY_WITH_CASH) {
        order.statusHistory[1] = { status: 'confirm', description: description, updateBy: req.user._id };
    }

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
    if (order.paymentMethod == 'pay-with-cash') {
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa được xác nhận');
            case 'delivering':
                res.status(400);
                throw new Error('Đơn hàng đã ở trạng thái đang giao');
            case 'delivered':
                res.status(400);
                throw new Error('Đơn hàng đã giao thành công');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    } else {
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa thanh toán');
            case 'paid':
                res.status(400);
                throw new Error('Đơn hàng chưa được xác nhận');
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
    }
    const products = await handleConfigProducts(order.orderItems);
    const dataOrderGHTK = await handleCreateOrderGHTK(products, order, address_shop);
    order.label_id_GiaoHangTK = dataOrderGHTK.order.label;

    if (
        order.paymentMethod == PAY_WITH_MOMO ||
        order.paymentMethod == PAY_WITH_ATM ||
        order.paymentMethod == PAY_WITH_CREDIT_CARD
    ) {
        order.status = 'delivering';
        order.statusHistory[3] = { status: 'delivering', description: description, updateBy: req.user._id };
    }
    if (order.paymentMethod == PAY_WITH_CASH) {
        order.status = 'delivering';
        order.statusHistory[2] = { status: 'delivering', description: description, updateBy: req.user._id };
    }

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
    if (order.paymentMethod == 'pay-with-cash') {
        // chấp nhận delivered
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa được xác nhận');
            case 'confirm':
                res.status(400);
                throw new Error('Đơn hàng chưa được tạo đơn giao hàng');
            case 'paid':
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
    } else {
        switch (order.status) {
            // chỉ cho phép delivering
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa thanh toán');
            case 'paid':
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
    }

    if (
        order.paymentMethod == PAY_WITH_MOMO ||
        order.paymentMethod == PAY_WITH_ATM ||
        order.paymentMethod == PAY_WITH_CREDIT_CARD
    ) {
        order.status = 'delivered';
        order.statusHistory[4] = { status: 'delivered', description: description, updateBy: req.user._id };
        order.payment.paidAt = new Date();
        order.payment.paid = true;
        await order.payment.save();
        const updateOrder = await order.save();
        await updateOrder.populate('payment');
        res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
    }
    if (order.paymentMethod == PAY_WITH_CASH) {
        console.log('đã chạy vào pay with cash và xác nhận giao hàng thành công');
        order.status = 'delivered';
        order.statusHistory[3] = { status: 'delivered', description: description, updateBy: req.user._id };
        order.payment.paidAt = new Date();
        order.payment.paid = true;
        await order.payment.save();
        const updateOrder = await order.save();
        await updateOrder.populate('payment');

        res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
    }
};

const confirmReceived = async (req, res) => {
    const orderId = req.params.id;
    const description = req.body.description?.toString()?.trim() || '';
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        res.status(404);
        throw new Error('Đơn hàng không tồn tại!');
    }
    if (order.paymentMethod == 'pay-with-cash') {
        // chỉ cho phép delivered là đã giao
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa được xác nhận');
            case 'confirm':
                res.status(400);
                throw new Error('Đơn hàng chưa bắt đầu giao hàng');
            case 'delivering':
                res.status(400);
                throw new Error('Đơn hàng đang giao đến bạn');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    } else {
        // chỉ cho phép delivered là đã giao
        switch (order.status) {
            case 'placed':
                res.status(400);
                throw new Error('Đơn hàng chưa được thanh toán');
            case 'paid':
                res.status(400);
                throw new Error('Đơn hàng chưa được xác nhận');
            case 'confirm':
                res.status(400);
                throw new Error('Đơn hàng chưa bắt đầu giao hàng');
            case 'delivering':
                res.status(400);
                throw new Error('Đơn hàng đang giao đến bạn');
            case 'completed':
                res.status(400);
                throw new Error('Đơn hàng đã được hoàn thành');
            case 'cancelled':
                res.status(400);
                throw new Error('Đơn hàng đã bị hủy');
            default:
                break;
        }
    }
    if (
        order.paymentMethod == PAY_WITH_MOMO ||
        order.paymentMethod == PAY_WITH_ATM ||
        order.paymentMethod == PAY_WITH_CREDIT_CARD
    ) {
        order.status = 'completed';
        order.statusHistory[5] = { status: 'completed', description: description, updateBy: req.user._id };
        order.orderItems = order.orderItems.map((orderItem) => {
            orderItem.isAbleToReview = true;
            return orderItem;
        });
        const updateOrder = await order.save();
        await updateOrder.populate('payment');
        res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
    }
    if (order.paymentMethod == PAY_WITH_CASH) {
        order.status = 'completed';
        order.statusHistory[4] = { status: 'completed', description: description, updateBy: req.user._id };
        order.orderItems = order.orderItems.map((orderItem) => {
            orderItem.isAbleToReview = true;
            return orderItem;
        });
        const updateOrder = await order.save();
        await updateOrder.populate('payment');
        res.status(200).json({ message: 'Xác nhận giao hàng thành công', updateOrder });
    }
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
        if (
            order.paymentMethod == PAY_WITH_MOMO ||
            order.paymentMethod == PAY_WITH_ATM ||
            order.paymentMethod == PAY_WITH_CREDIT_CARD
        ) {
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
        }
        if (order.paymentMethod == PAY_WITH_CASH) {
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
        }
    } else if (req.user._id.toString() == order.user.toString()) {
        if (
            order.paymentMethod == PAY_WITH_MOMO ||
            order.paymentMethod == PAY_WITH_ATM ||
            order.paymentMethod == PAY_WITH_CREDIT_CARD
        ) {
            switch (order.status) {
                // chỉ cho phép placed
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
        }
        if (order.paymentMethod == PAY_WITH_CASH) {
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
        // cập nhập lại SL sp
        await session.withTransaction(async () => {
            const updateOrderItems = order.orderItems.map(async (orderItem) => {
                const updateProduct = await Product.findOne({ _id: orderItem.product });

                const optionIndex = updateProduct.optionColor.findIndex((opt) => opt.color == orderItem.color);
                updateProduct.optionColor[optionIndex].countInStock += Number(orderItem.quantity);
                updateProduct.totalSales += Number(orderItem.quantity);
                await updateProduct.save({ session });
            });
            await Promise.all(updateOrderItems);
            // bắt đầu xử lý hoàn tiền
            if (
                order.payment.paid &&
                (order.paymentMethod == PAY_WITH_MOMO ||
                    order.paymentMethod == PAY_WITH_ATM ||
                    order.paymentMethod == PAY_WITH_CREDIT_CARD)
            ) {
                const lang = 'vi';
                const requestId = nanoid(36);
                const orderId = nanoid(36);
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
            // kết thúc xử lý hoàn tiền

            if (
                order.paymentMethod == PAY_WITH_MOMO ||
                order.paymentMethod == PAY_WITH_ATM ||
                order.paymentMethod == PAY_WITH_CREDIT_CARD
            ) {
                if (order.status == 'placed') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(1, 4);
                    order.statusHistory[1] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
                if (order.status == 'paid') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(2, 3);
                    order.statusHistory[2] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
                if (order.status == 'confirm') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(3, 2);
                    order.statusHistory[3] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
                if (order.status == 'delivering') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(4, 1);
                    order.statusHistory[4] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
            }
            if (order.paymentMethod == PAY_WITH_CASH) {
                if (order.status == 'placed') {
                    console.log('đã hủy đơn hàng ở trạng thái placed');
                    order.status = 'cancelled';
                    order.statusHistory.splice(1, 3);
                    order.statusHistory[1] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
                if (order.status == 'confirm') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(2, 2);
                    order.statusHistory[2] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
                if (order.status == 'delivering') {
                    order.status = 'cancelled';
                    order.statusHistory.splice(3, 1);
                    order.statusHistory[3] = { status: 'cancelled', description: description, updateBy: req.user._id };
                }
            }
            const cancelledOrder = await order.save();
            console.log('đã hủy đơn hàng', cancelledOrder);
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
    ordersPaid,
    getOrderByUser,
    getOrderById,
    confirmOrder,
    confirmDelivery,
    confirmDelivered,
    cancelOrder,
    confirmReceived,
};
export default orderController;

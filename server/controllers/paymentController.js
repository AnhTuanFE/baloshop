import mongoose from 'mongoose';
import Order from '../models/OrderModel.js';
import Payment from '../models/PaymentModel.js';
import payment_momo from '../config/MomoConfig.js';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { buildPaymentRequest, buildRefundRequest } from '../utils/paymentWithMomo.js';

const createPaymentOrderByMomo = async (orderId, orderInfo, amount, redirectUrl, ipnUrl, lang) => {
    // let baseUrl = `${req.protocol}://${req.get('host')}`;
    // const checkBaseUrl = baseUrl.slice(0, baseUrl.indexOf(':'));
    // if (checkBaseUrl != 'https') {
    //     baseUrl = process.env.DEFAULT_API_URL;
    // }
    const result = {
        resultCode: 200,
        message: 'Success',
        data: {},
    };
    const requestId = uuidv4();

    const requestBody = createPaymentRequest(orderId, requestId, orderInfo, amount, redirectUrl, ipnUrl, lang);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
    };
    await payment_momo
        .post('/v2/gateway/api/create', requestBody, config)
        .then((response) => {
            result.data = response.data;
        })
        .catch(async (error) => {
            result.resultCode = 400;
            result.message = error.response?.message || error.message || 'Error';
        });

    return result;
};

const paymentOrder = async (req, res) => {
    let baseUrl = `${req.protocol}://${req.get('host')}`;
    const checkBaseUrl = baseUrl.slice(0, baseUrl.indexOf(':'));
    if (checkBaseUrl != 'https') {
        baseUrl = process.env.DEFAULT_API_URL;
    }

    const orderInfo = {
        _id: '54745672342377',
        totalPayment: 50000,
    };

    const amount = Number(orderInfo.totalPayment).toFixed();
    const redirectUrl = process.env.CLIENT_URL + '/product/' + orderInfo._id;
    // const ipnUrl = process.env.API_URL + '/api/payment/notification';
    const ipnUrl = baseUrl + '/api/payment/notification';
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
    console.log('Tạo requestBody');
    console.log(requestBody);
    await payment_momo
        .post('/v2/gateway/api/create', requestBody, config)
        .then((response) => {
            // newPaymentInformation.payUrl = response.data.shortLink;
            // newPaymentInformation.requestId = requestId;
            console.log('Tạo giao dịch thanh toán');
            console.log(response.data);
            res.json(response.data);
        })
        .catch(async (error) => {
            console.log(error);
            res.status(400);
            throw new Error(error.response?.message || error.message);
        });
};

const orderPaymentNotification = async (req, res) => {
    console.log('thông báo thanh toán từ momo');
    console.log(req.body);
    console.log(JSON.stringify(req.body));

    const {
        partnerCode,
        requestId,
        amount,
        orderId,
        resultCode,
        message,
        responseTime,
        extraData,
        signature,
        orderInfo,
        orderType,
        payType,
        transId,
    } = req.body;
    const rawSignature =
        'accessKey=' +
        process.env.MOMO_ACCESS_KEY +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&message=' +
        message +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&orderType=' +
        orderType +
        '&partnerCode=' +
        partnerCode +
        '&payType=' +
        payType +
        '&requestId=' +
        requestId +
        '&responseTime=' +
        responseTime +
        '&resultCode=' +
        resultCode +
        '&transId=' +
        transId;

    const createSignature = crypto.createHmac('sha256', process.env.MOMO_SECRET_KEY).update(rawSignature).digest('hex');

    console.log('createSignature');
    console.log(createSignature);

    if (signature == createSignature) {
        console.log('Chữ ký hợp lệ');

        const order = await Order.find({ _id: orderId }).populate('payment');
        if (!order) {
            res.status(400);
            throw new Error('Đơn hàng không tồn tại');
        }
        order.payment.paymentTransaction = {
            partnerCode,
            requestId,
            amount,
            orderId,
            resultCode,
            message,
            responseTime,
            extraData,
            signature,
            orderInfo,
            orderType,
            payType,
            transId,
        };
        if (resultCode == 0) {
            order.isPaid = true;
            order.paidAt = new Date();
            order.payment.paid = true;
            order.payment.paidAt = new Date();
            order.payment.message = message;

            await order.payment.save();
            await order.save();
        } else {
            order.isPaid = false;
            order.cancel = true;
            order.payment.paid = false;
            order.payment.message = message;
            // order.statusHistory.push({ status: 'cancelled', description: message });
            // order.status = 'cancelled';
            await order.payment.save();
            await order.save();
            res.status(400);
            throw new Error(`Thanh toán thất bại. ${message}`);
        }
    } else {
        console.log('Chữ ký không hợp lệ');
        throw new Error('Thanh toán thất bại. Chữ ký không hợp lệ.');
    }

    res.status(204);
    // const orderId = req.body.orderId?.toString().trim() || '';
    // if (!orderId) {
    //     res.status(400);
    //     throw new Error('Mã đơn hàng là giá trị bắt buộc');
    // }
    // const order = await Order.findOne({ _id: orderId, disabled: false }).populate('paymentInformation');
    // if (!order) {
    //     res.status(404);
    //     throw new Error('Đơn hàng không tồn tại!');
    // }
    // if (
    //     order.paymentInformation?.requestId?.toString() != req.body.requestId?.toString() ||
    //     Number(order.paymentInformation.paymentAmount) != Number(req.body.amount)
    // ) {
    //     res.status(400);
    //     throw new Error('Thông tin xác nhận thanh toán không hợp lệ');
    // }
    // if (req.body.resultCode != 0) {
    //     const message = statusResponseFalse[req.body.resultCode] || statusResponseFalse[99];
    //     order.statusHistory.push({ status: 'cancelled', description: message });
    //     order.status = 'cancelled';
    //     await order.save();
    //     res.status(400);
    //     throw new Error('Thanh toán thất bại');
    // } else {
    //     order.statusHistory.push({ status: 'paid', updateBy: order.user });
    //     order.paymentInformation.paid = true;
    //     order.paymentInformation.paidAt = new Date();
    //     await order.paymentInformation.save();
    //     await order.save();
    //     res.status(204);
    // }
};

const refundTrans = async (req, res) => {
    const requestBody = buildRefundRequest(orderId, amount, description, requestId, transId, lang);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
    };
    console.log(requestBody);
    const result = await payment_momo
        .post('/v2/gateway/api/refund', requestBody, config)
        .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data);
        })
        .catch(async (error) => {
            console.log(error);
            res.status(400);
            throw new Error(error.response?.message || error.message);
        });
};
const paymentController = { paymentOrder, orderPaymentNotification, refundTrans };
export default paymentController;

import mongoose from 'mongoose';
import Order from '../models/OrderModel.js';
import Payment from '../models/PaymentModel.js';
import momoService from '../utils/momoService.js';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import paypal from 'paypal-rest-sdk';
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

const paymentOrder = async (req, res) => {
    // let hostName = req.get('host');
    // if (req.protocol != 'https') {
    //     hostName = process.env.DEFAULT_API_URL;
    // }

    const order = {
        _id: '547455667234277',
        totalPayment: 50000,
    };

    // const amount = Number(order.totalPayment).toFixed();
    // const redirectUrl = process.env.CLIENT_URL + '/product/' + order._id;
    // // const ipnUrl = process.env.API_URL + '/api/payment/notification';
    // const ipnUrl = hostName + '/api/payment/notification-from-momo';
    // const requestId = uuidv4();
    // const orderInfo = 'Thanh toán đơn hàng tại Balo Shop';
    // const lang = 'vi';
    // const extraData = '';
    // const orderGroupId = '';

    // const requestBody = momoService.buildPaymentRequest(
    //     order._id,
    //     requestId,
    //     orderInfo,
    //     amount,
    //     redirectUrl,
    //     ipnUrl,
    //     lang,
    //     extraData,
    //     orderGroupId,
    // );
    // const momo = axios.create({
    //     baseURL: process.env.MOMO_API_URL,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': Buffer.byteLength(requestBody),
    //     },
    // });
    // await momo
    //     .post('/v2/gateway/api/create', requestBody)
    //     .then((response) => {
    //         console.log('Tạo giao dịch thanh toán');
    //         console.log(response.data);
    //         res.json(response.data);
    //     })
    //     .catch(async (error) => {
    //         console.log(error);
    //         res.status(400);
    //         throw new Error(error.response?.message || error.message);
    //     });

    const redirectUrl = process.env.CLIENT_URL + '/product/' + order._id;

    const create_payment_json = JSON.stringify({
        intent: 'order',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://return.url',
            cancel_url: 'http://cancel.url',
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: 'item',
                            sku: 'item',
                            price: '1.00',
                            currency: 'USD',
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: 'USD',
                    total: '1.00',
                },
                description: 'This is the payment description.',
            },
        ],
    });

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(400);
            throw error;
        } else {
            console.log('Create Payment Response');
            console.log(payment);
            res.json(payment);
        }
    });
};

const paymentNotificationFromPaypal = async (req, res) => {
    //
    console.log(JSON.stringify(req.body));
};
const paymentNotificationFromMomo = async (req, res) => {
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
        const paymentTransaction = {
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
            let order = await Order.findOne({ _id: orderId });
            if (!order) {
                res.status(400);
                throw new Error('Đơn hàng không tồn tại');
            }
            let payment = await Payment.findOneAndUpdate(
                { _id: order.payment },
                { $set: { paid: true, paidAt: new Date(), message: message, paymentTransaction: paymentTransaction } },
            );

            console.log('order');
            console.log(order);
            if (!payment) {
                res.status(400);
                throw new Error('Đơn thanh toán không tồn tại');
            }
        } else {
            let order = await Order.findOne({ _id: orderId });
            if (!order) {
                res.status(400);
                throw new Error('Đơn hàng không tồn tại');
            }
            console.log('order');
            console.log(order);
            let payment = await Payment.findOneAndUpdate(
                { _id: order.payment },
                { $set: { paid: false, message: message, paymentTransaction: paymentTransaction } },
            );
            if (!payment) {
                res.status(400);
                throw new Error('Đơn thanh toán không tồn tại');
            }

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
    const { orderId, amount, description, requestId, transId, lang } = req.body;
    const requestBody = momoService.buildRefundRequest(orderId, amount, description, requestId, transId, lang);

    // console.log(requestBody);
    const momo = axios.create({
        baseURL: process.env.MOMO_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
    });
    const result = await momo
        .post('/v2/gateway/api/refund', requestBody)
        .then((response) => {
            // console.log(response.data);
            res.status(200).json(response.data);
        })
        .catch(async (error) => {
            // console.log(error);
            res.status(400);
            throw new Error(error.response?.message || error.message);
        });
};

const getOrderPaypal = async (req, res) => {
    var paymentId = 'PAYID-MTXQU2I1E061208TY3890238';

    // paypal.payment.get(paymentId, function (error, payment) {
    //     if (error) {
    //         console.log(error);
    //         throw error;
    //     } else {
    //         console.log('Get Payment Response');
    //         console.log(JSON.stringify(payment));
    //         res.json(payment);
    //     }
    // });
    var execute_payment_json = JSON.stringify({
        payer_id: 'JHQ5FY4NNVYSC',
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: '1.00',
                },
            },
        ],
    });

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            // console.log(error.response);
            throw error;
        } else {
            // console.log('Get Payment Response');
            // console.log(JSON.stringify(payment));
            res.json(payment);
        }
    });
};
const paymentController = {
    paymentOrder,
    paymentNotificationFromMomo,
    paymentNotificationFromPaypal,
    refundTrans,
    getOrderPaypal,
};
export default paymentController;

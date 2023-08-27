import crypto from 'crypto';

const PARTNER_NAME = 'Balo shop';
const STORE_ID = 'Balo shop';
var requestType = 'payWithMethod';
var autoCapture = true;
var extraData = '';
var orderGroupId = '';

export const buildPaymentRequest = (orderId, requestId, orderInfo, amount, redirectUrl, ipnUrl, lang) => {
    var rawSignature =
        'accessKey=' +
        process.env.MOMO_ACCESS_KEY +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        process.env.MOMO_PARTNER_CODE +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;

    //signature
    var signature = crypto.createHmac('sha256', process.env.MOMO_SECRET_KEY).update(rawSignature).digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: process.env.MOMO_PARTNER_CODE,
        partnerName: PARTNER_NAME,
        storeId: STORE_ID,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });
    return requestBody;
};

export const buildRefundRequest = (orderId, amount, description, requestId, transId, lang) => {
    var rawSignature =
        'accessKey=' +
        process.env.MOMO_ACCESS_KEY +
        '&amount=' +
        amount +
        '&description=' +
        description +
        '&orderId=' +
        orderId +
        '&partnerCode=' +
        process.env.MOMO_PARTNER_CODE +
        '&requestId=' +
        requestId +
        '&transId=' +
        transId;

    //signature
    var signature = crypto.createHmac('sha256', process.env.MOMO_SECRET_KEY).update(rawSignature).digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: process.env.MOMO_PARTNER_CODE,
        requestId: requestId,
        orderId: orderId,
        amount,
        description,
        transId,
        signature: signature,
        lang: lang,
    });
    return requestBody;
};

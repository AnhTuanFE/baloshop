import crypto from 'crypto';

const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;
const partnerCode = process.env.MOMO_PARTNER_CODE;
const requestType = 'payWithMethod';
const lang = 'vi';
var extraData = '';
var orderGroupId = '';
var autoCapture = true;
export const createPaymentBody = (orderId, requestId, orderInfo, amount, redirectUrl, ipnUrl) => {
    var rawSignature =
        'accessKey=' +
        accessKey +
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
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;

    //signature
    var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'FashionShop',
        storeId: 'FashionShop',
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
export const createCheckStatusBody = (orderId, requestId) => {
    var rawSignature =
        'accessKey=' + accessKey + '&orderId=' + orderId + '&partnerCode=' + partnerCode + '&requestId=' + requestId;

    //signature
    var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        requestId: requestId,
        orderId: orderId,
        signature: signature,
        lang: lang,
    });
    return requestBody;
};
export const createRefundTransBody = (orderId, amount, description, requestId, transId) => {
    var rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${description}
    &orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}
    &transId=${transId}`;
    'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&description=' +
        description +
        '&orderId=' +
        orderId +
        '&partnerCode=' +
        partnerCode +
        '&requestId=' +
        requestId +
        '&transId=' +
        transId;
    //signature
    var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
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

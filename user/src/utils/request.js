import axios from 'axios';

export const GHN_Request = axios.create({
    baseURL: `https://dev-online-gateway.ghn.vn/shiip/public-api`,
    headers: {
        'Content-Type': 'application/json',
        token: process.env.GHN_TOKEN_API,
    },
});

// export const momo_Request = axios.create({
//     baseURL: process.env.MOMO_REQUEST_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Content-Length': Buffer.byteLength(requestBody),
//     },
// });

import axios from 'axios';

const payment_momo = axios.create({
    baseURL: 'https://test-payment.momo.vn',
    // baseURL: process.env.MOMO_API_URL,
});
export default payment_momo;

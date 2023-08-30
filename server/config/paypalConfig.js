import paypal from 'paypal-rest-sdk';
const paypalConfig = async () => {
    paypal.configure({
        mode: process.env.PAYPAL_MODE,
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET,
    });
};
export default paypalConfig;

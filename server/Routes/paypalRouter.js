import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
// For a fully working example, please see:
// https://github.com/paypal-examples/docs-examples/tree/main/standard-integration

const { CLIENT_ID, APP_SECRET } = process.env;

const paypalRouter = express.Router();

const baseURL = {
    sandbox: 'https://api-m.sandbox.paypal.com',
    production: 'https://api-m.paypal.com',
};

// generate an access token using client id and app secret
async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64');
    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}

async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // };

    // const data = {
    //     intent: 'CAPTURE',
    //     purchase_units: [
    //         {
    //             amount: {
    //                 currency_code: 'USD',
    //                 value: '100.00',
    //             },
    //         },
    //     ],
    // };

    // const response = await axios.post(url, data, config);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            // purchase_units: [
            //     {
            //         amount: {
            //             currency_code: 'USD',
            //             value: '100.00',
            //         },
            //     },
            // ],
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '100.00',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '90.00',
                            },
                            shipping: {
                                currency_code: 'USD',
                                value: '10.00',
                            },
                        },
                    },
                    items: [
                        {
                            name: 'Product Name',
                            description: 'Product Description',
                            quantity: '1',
                            unit_amount: {
                                currency_code: 'USD',
                                value: '90.00',
                            },
                            category: 'PHYSICAL_GOODS',
                        },
                    ],
                    shipping: {
                        address: {
                            address_line_1: '123 Main St.',
                            address_line_2: 'Unit 1',
                            admin_area_2: 'San Jose',
                            admin_area_1: 'CA',
                            postal_code: '95131',
                            country_code: 'US',
                        },
                    },
                },
            ],
        }),
    });
    const data = await response.json();
    return data;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // };

    // const { data } = await axios.post(url, config);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}

// create a new order
paypalRouter.post(
    '/create-paypal-order',
    asyncHandler(async (req, res) => {
        const order = await createOrder();
        res.json(order);
    }),
);

// capture payment & store order information or fullfill order
paypalRouter.post(
    '/capture-paypal-order',
    asyncHandler(async (req, res) => {
        try {
            const { orderID } = req.body;
            console.log('orderID = ', orderID);
            const captureData = await capturePayment(orderID.toString());
            // TODO: store payment information such as the transaction ID
            res.json(captureData);
        } catch (error) {
            console.log('lỗi là = '.error);
            res.json(error);
        }
    }),
);

export default paypalRouter;

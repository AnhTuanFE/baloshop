import * as types from '../Constants/OrderConstants';
import axios from 'axios';
import { logout } from './userActions';

//CALCULATE FEE SHIP
export const calculate_fee_ship_action = (data_calculate) => async (dispatch) => {
    try {
        dispatch({ type: types.CALCULATE_FEE_SHIP_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/ghtk/get_fee_ship`, data_calculate, config);
        dispatch({ type: types.CALCULATE_FEE_SHIP_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response?.data.message ? error.response.data.message : error.message;
        dispatch({
            type: types.CALCULATE_FEE_SHIP_FAIL,
            payload: message,
        });
    }
};
// CREATE ORDER

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        // 'Content-Type': 'application/json',
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({ type: types.ORDER_CREATE_SUCCESS, payload: data });
        // dispatch({ type: CART_CLEAR_ITEMS, payload: data });

        localStorage.removeItem('cartItems');
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_CREATE_FAIL,
            payload: message,
        });
    }
};

// CREATE ORDER REVIEW
export const createOrderReview = (orderId, orderItemId, rating, comment, name) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/orders/${orderId}/poductReview`,
            { orderItemId, rating, comment, name },
            config,
        );
        dispatch({ type: types.ORDER_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// ORDER PAY
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        dispatch({ type: types.ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_PAY_FAIL,
            payload: message,
        });
    }
};

// USER ORDERS
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/`, config);
        dispatch({ type: types.ORDER_LIST_MY_SUCCESS, payload: data?.orders });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_LIST_MY_FAIL,
            payload: message,
        });
    }
};

//GET ORDER
export const orderGetAddress = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_ADDRESS_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${userInfo._id}/address`, config);
        dispatch({ type: types.ORDER_ADDRESS_MY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_ADDRESS_MY_FAIL,
            payload: message,
        });
    }
};

// ODERS LIST ALL
export const listProductsBestSellingAction = () => async (dispatch) => {
    try {
        const valueSort = 'total_sales';
        dispatch({ type: types.ORDER_LIST_ALL_REQUEST });
        const { data } = await axios.get(`/api/products?&sortBy=${valueSort}&limit=${12}`);
        dispatch({ type: types.ORDER_LIST_ALL_SUCCESS, payload: data?.products });
    } catch (error) {
        dispatch({
            type: types.ORDER_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// =========================================================

export const paypalCreateOrderAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAYPAL_PAID_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        //                Authorization: `Bearer ${userInfo.token}`,

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/paypal/create-paypal-order`, config);
        dispatch({ type: types.ORDER_PAYPAL_PAID_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_PAYPAL_PAID_FAIL,
            payload: message,
        });
    }
};

export const paypalConfirmPaidOrderAction = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_PAYPAL_PAID_CONFIRM_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        //                Authorization: `Bearer ${userInfo.token}`,

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/paypal/capture-paypal-order`, { orderID });
        dispatch({ type: types.ORDER_PAYPAL_PAID_CONFIRM_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_PAYPAL_PAID_CONFIRM_FAIL,
            payload: message,
        });
    }
};
// ===============

export const getLabelOrderGHTKAction = (id_Ghtk) => async (dispatch, getState) => {
    const apiBase = 'https://services-staging.ghtklab.com';
    // console.log('id_Ghtk = ', id_Ghtk);
    try {
        dispatch({ type: types.GET_LABEL_ORDER_GHTK_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        //                Authorization: `Bearer ${userInfo.token}`,

        const url = `${apiBase}/services/label/${id_Ghtk}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
            },
        };
        const { data } = await axios.get(url, config);
        dispatch({ type: types.GET_LABEL_ORDER_GHTK_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.GET_LABEL_ORDER_GHTK_FAIL,
            payload: message,
        });
    }
};

export const updateStatusOrderUserAction = (data) => async (dispatch, getState) => {
    const { id, status } = data;
    let description = '';

    try {
        if (status == 'cancel') {
            description = 'Muốn mua SP khác';
        }
        dispatch({ type: types.UPDATE_STATUS_ORDER_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/${status}`, { description }, config);
        dispatch({ type: types.UPDATE_STATUS_ORDER_USER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.UPDATE_STATUS_ORDER_USER_FAIL,
            payload: message,
        });
    }
};

export const userRequestConfirmPaidMOMOAction = (dataMomo) => async (dispatch, getState) => {
    const {
        partnerCode,
        orderId,
        requestId,
        amount,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData,
        signature,
    } = dataMomo;
    console.log('dataMomo = ', dataMomo);
    if (
        partnerCode === 'MOMO' &&
        message === 'Thành công.' &&
        orderType === 'momo_wallet' &&
        payType === 'qr' &&
        resultCode == '0'
    ) {
        try {
            dispatch({ type: types.USER_REQUEST_CONFIRM_PAID_REQUEST });
            const {
                userLogin: { userInfo },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post(`/api/payments/user-notification-paid-from-momo`, dataMomo, config);
            console.log('data = ', dataMomo);
            dispatch({ type: types.USER_REQUEST_CONFIRM_PAID_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: types.USER_REQUEST_CONFIRM_PAID_FAIL,
                payload: message,
            });
        }
    } else {
        dispatch({
            type: types.USER_REQUEST_CONFIRM_PAID_FAIL,
            payload: 'Thông tin yêu cầu không hợp lệ',
        });
    }
};

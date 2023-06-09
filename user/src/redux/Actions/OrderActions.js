import * as types from '../Constants/OrderConstants';
import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../Constants/CartConstants';
import { logout } from './userActions';

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
        dispatch({ type: CART_CLEAR_ITEMS, payload: data });

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
        dispatch({ type: types.ORDER_LIST_MY_SUCCESS, payload: data });
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

//GET ORDER ORDER ITEMS
export const orderGetItemOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_GET_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}/orderItem`, config);
        dispatch({ type: types.ORDER_GET_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_GET_REVIEW_FAIL,
            payload: message,
        });
    }
};

// ODERS LIST ALL
export const listAllOrderAction = () => async (dispatch) => {
    try {
        dispatch({ type: types.ORDER_LIST_ALL_REQUEST });
        const { data } = await axios.get(`/api/orders/productbestseller`);
        dispatch({ type: types.ORDER_LIST_ALL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.ORDER_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const cancelOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_CANCEL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/orders/${order._id}/ucancel`, config);
        dispatch({ type: types.ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_CANCEL_FAIL,
            payload: message,
        });
    }
};

// COMPLETE ORDER PUT
export const completeOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_COMPLETE_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/completeUser`, {}, config);
        dispatch({ type: types.ORDER_COMPLETE_USER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_COMPLETE_USER_FAIL,
            payload: message,
        });
    }
};

// RETURN AMOUNT PRODUCT
export const returnAmountProduct = (orderItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ORDER_RETURN_AMOUNT_PRODUCT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/returnAmountProduct`, { orderItems }, config);
        dispatch({ type: types.ORDER_RETURN_AMOUNT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.ORDER_RETURN_AMOUNT_PRODUCT_FAIL,
            payload: message,
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

import {
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_COMPLETE_FAIL,
    ORDER_LIST_COMPLETE_REQUEST,
    ORDER_LIST_COMPLETE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    UPDATE_STATUS_ORDER_ADMIN_REQUEST,
    UPDATE_STATUS_ORDER_ADMIN_SUCCESS,
    UPDATE_STATUS_ORDER_ADMIN_FAIL,
    UPDATE_STATUS_ORDER_ADMIN_RESET,
} from '../Constants/OrderConstants';
import { logout } from './userActions';
import axios from 'axios';

export const listOrders = (dataReceived) => async (dispatch, getState) => {
    const { keyword, status, pageNumber, limit } = dataReceived;
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/orders/all?keyword=${keyword}&status=${status}&pageNumber=${pageNumber}&limit=${limit}`,
            config,
        );

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
};

// GET ALL COMPLETE ADMIN
export const getOrderCompleteAll = (dataReceived) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_COMPLETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // const { data } = await axios.get(`/api/orders/complete`, config);
        const { data } = await axios.get(`/api/orders/paid`, config);

        dispatch({ type: ORDER_LIST_COMPLETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_COMPLETE_FAIL,
            payload: message,
        });
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

//
export const updateStatusOrderAdminAction = (data) => async (dispatch, getState) => {
    const { id, status } = data;
    let description = '';
    try {
        if (status == 'cancel') {
            description = 'Lỗi thông tin đơn hàng';
        }
        dispatch({ type: UPDATE_STATUS_ORDER_ADMIN_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/${status}`, { description }, config);
        dispatch({ type: UPDATE_STATUS_ORDER_ADMIN_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: UPDATE_STATUS_ORDER_ADMIN_FAIL,
            payload: message,
        });
    }
};

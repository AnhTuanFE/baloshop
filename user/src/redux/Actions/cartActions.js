import axios from 'axios';
import * as types from '../Constants/CartConstants';
import { logout } from './userActions';

export const listCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.CART_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/cart/${userInfo._id}`, config);
        localStorage.setItem('cartItems', JSON.stringify(data));
        dispatch({ type: types.CART_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.CART_LIST_FAIL,
            payload: message,
        });
    }
};
//ADD TO CART NEW
// productId, id_product, color, qty
export const addToCart = (data_post) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.CART_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/cart/`, data_post, config);

        dispatch({ type: types.CART_CREATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.CART_CREATE_FAIL,
            payload: message,
        });
    }
};

// REMOVE PRODUCT FROM CART
export const removefromcart = (pr) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.CART_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const user = userInfo._id;
        await axios.post(
            `/api/cart/delete`,
            {
                user,
                pr,
            },
            config,
        );

        dispatch({ type: types.CART_DELETE_SUCCESS, payload: pr });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.CART_DELETE_FAIL,
            payload: message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//Delete all item from cart
export const clearFromCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: types.CART_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const user = userInfo._id;
        await axios.delete(`/api/cart/${user}`, config);

        dispatch({ type: types.CART_CLEAR_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.CART_DELETE_FAIL,
            payload: message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};

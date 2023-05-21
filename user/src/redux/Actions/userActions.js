import * as types from '../Constants/UserContants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../Constants/OrderConstants';
// import { addToCart, listCart } from './cartActions';
import { CART_LIST_MY_RESET } from '../Constants/CartConstants';

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(`/api/users/login`, { email, password }, config);
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
        // dispatch(listCart());
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: types.USER_LOGOUT });
    dispatch({ type: types.USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: CART_LIST_MY_RESET });
};

// REGISTER
export const register = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({ type: types.USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/users`, { name, email, phone, password }, config);
        dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_DETAILS_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/user`, config);
        dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        // 'Content-Type': 'application/json',
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const updateUserPassword = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: types.USER_UPDATE_PASSWORD_SUCCESS, payload: data });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};
// ALL USER
export const listUser = () => async (dispatch) => {
    try {
        dispatch({ type: types.USER_LIST_REQUEST });
        const { data } = await axios.get(`/api/users/all`);

        dispatch({ type: types.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.USER_LIST_FAIL,
            payload: message,
        });
    }
};

// CREATE USERS
export const createUser =
    ({ name, email, phone, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.CREACTE_USER_REQUEST });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            };

            const { data } = await axios.post(`/api/verifiedEmail/verified`, { name, email, phone, password }, config);
            dispatch({ type: types.CREACTE_USER_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: types.CREACTE_USER_FAIL,
                payload: message,
            });
        }
    };

// PROVINCE
export const ListProvince = () => async (dispatch) => {
    try {
        // dispatch({ type: PROVINCE_REQUEST })
        const { data } = await axios.get(`https://provinces.open-api.vn/api/?depth=3`);
        dispatch({ type: types.PROVINCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.PROVINCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// AVATAR
export const ListAvatar = () => async (dispatch) => {
    try {
        dispatch({ type: types.AVATAR_REQUEST });
        const { data } = await axios.get(`/api/avatar`);
        dispatch({ type: types.AVATAR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.AVATAR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

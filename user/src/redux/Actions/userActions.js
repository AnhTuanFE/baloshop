import * as types from '../Constants/UserContants';
import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../Constants/OrderConstants';
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
    dispatch({ type: types.USER_REGISTER_RESET });
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
export const getUserDetails = () => async (dispatch, getState) => {
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

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });

        // localStorage.removeItem('userInfo');
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

export const updateUserPassword = (dataReceived) => async (dispatch, getState) => {
    const { password, oldPassword } = dataReceived;
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

        const { data } = await axios.put(`/api/users/updatePassword`, { password, oldPassword }, config);
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
export const getListProvincesAction = () => async (dispatch) => {
    try {
        dispatch({ type: types.PROVINCE_REQUEST });
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

export const ForgotPassWord = (email) => async (dispatch) => {
    try {
        dispatch({ type: types.FORGOT_PASS_WORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
        const { data } = await axios.post(`/api/forgotPass/forgotPassword`, email, config);
        dispatch({ type: types.FORGOT_PASS_WORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.FORGOT_PASS_WORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const VerifyResetPassWordAction = (verifyData) => async (dispatch) => {
    let dataReturn;
    try {
        dispatch({ type: types.VERIFY_RESET_PASS_WORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
        const { data } = await axios.post(`/api/forgotPass/verify-reset-password`, verifyData, config);
        dataReturn = data;
        dispatch({ type: types.VERIFY_RESET_PASS_WORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.VERIFY_RESET_PASS_WORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const ResetPassWordAction = (newPassword) => async (dispatch) => {
    try {
        dispatch({ type: types.RESET_PASS_WORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
        const { data } = await axios.post(`/api/forgotPass/reset-password`, newPassword, config);
        dispatch({ type: types.RESET_PASS_WORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.RESET_PASS_WORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

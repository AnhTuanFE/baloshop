import axios from 'axios';
import * as types from '../Constants/ProductConstants';
import { logout } from './userActions';

// PRODUCT LIST ALL

export const ListProductAll = () => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_LIST_ALL_REQUEST });
        const { data } = await axios.get(`/api/products/ProductAll`);
        dispatch({ type: types.PRODUCT_LIST_ALL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT LIST ALL REVIEW
export const getAllReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_ALL_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/products/${productId}/onlyProduct/allReview`);
        dispatch({ type: types.PRODUCT_ALL_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_ALL_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT LIST ALL COMMENTS
export const getAllComments = (productId) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_ALL_COMMENTS_REQUEST });
        const { data } = await axios.get(`/api/products/${productId}/onlyProduct/allComments`);
        dispatch({ type: types.PRODUCT_ALL_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_ALL_COMMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT LIST
export const listProduct =
    (category = '', keyword = '', pageNumber = '', rating = '', minPrice = '', maxPrice = '', sortProducts = '1') =>
    async (dispatch) => {
        try {
            dispatch({ type: types.PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(
                `/api/products?&category=${category}&keyword=${keyword}&pageNumber=${pageNumber}&rating=${rating}
        &minPrice=${minPrice}&maxPrice=${maxPrice}&sortProducts=${sortProducts}`,
            );
            dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: types.PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: types.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// PRODUCT REVIEW CREATE
export const createProductReview = (productId, rating, color, comment, name) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_REVIEW_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/review`, { rating, color, comment, name }, config);
        dispatch({ type: types.PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
};

// PRODUCT COMMENT CREATE
export const createProductComment = (productId, comments) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_COMMENT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/comment`, comments, config);
        dispatch({ type: types.PRODUCT_CREATE_COMMENT_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.PRODUCT_CREATE_COMMENT_FAIL,
            payload: message,
        });
    }
};

// PRODUCT COMMENTCHILDS CREATE
export const createProductCommentChild = (productId, question) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_COMMENTCHILD_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/commentchild`, question, config);
        dispatch({ type: types.PRODUCT_CREATE_COMMENTCHILD_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: types.PRODUCT_CREATE_COMMENTCHILD_FAIL,
            payload: message,
        });
    }
};

// CATEGORY
export const ListCategory = () => async (dispatch) => {
    try {
        dispatch({ type: types.CATEGORY_REQUEST });
        const { data } = await axios.get(`/api/category/`);
        dispatch({ type: types.CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

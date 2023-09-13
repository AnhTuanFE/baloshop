import axios from 'axios';
import * as types from '../Constants/ProductConstants';
import { logout } from './userActions';

// PRODUCT LIST ALL

export const ListProductLatestAction = () => async (dispatch) => {
    try {
        const valueSort = 'newest';
        dispatch({ type: types.PRODUCT_LIST_ALL_REQUEST });
        const { data } = await axios.get(`/api/products?&sortBy=${valueSort}&limit=${12}`);
        dispatch({ type: types.PRODUCT_LIST_ALL_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const ListProductSimilarAction = (prop) => async (dispatch) => {
    const { category } = prop;
    try {
        dispatch({ type: types.LIST_PRODUCT_SIMILAR_REQUEST });
        const { data } = await axios.get(`/api/products?&limit=${18}&category=${category}`);
        dispatch({ type: types.LIST_PRODUCT_SIMILAR_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({
            type: types.LIST_PRODUCT_SIMILAR_FAIL,
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
export const listProduct = (dataReceived) => async (dispatch) => {
    // category = '', keyword = '', pageNumber = '', rating = '', minPrice = '', maxPrice = '', sortBy = '1'
    const { category, keyword, pageNumber, rating, sortBy, minPrice, maxPrice } = dataReceived;
    const limit = 12;
    try {
        dispatch({ type: types.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(
            `/api/products?&category=${category}&keyword=${keyword}&page=${pageNumber}&rating=${rating}
    &minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&limit=${limit}`,
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
export const productDetailAction = (id) => async (dispatch) => {
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
export const createProductReview = (productId, rating, comment) => async (dispatch, getState) => {
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

        await axios.post(`/api/products/${productId}/review`, { rating, comment }, config);
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
export const createProductComment = (dataReceived) => async (dispatch, getState) => {
    const { productId, nameProduct, imageProduct, question } = dataReceived;
    const comments = { nameProduct, imageProduct, question };
    if (question == '') {
        dispatch({
            type: types.PRODUCT_CREATE_COMMENT_FAIL,
            payload: 'Bạn chưa nhập câu hỏi',
        });
    } else {
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

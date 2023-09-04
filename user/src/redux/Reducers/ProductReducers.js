import * as types from '../Constants/ProductConstants';

//PRODUCT LIST ALL
export const productListAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_ALL_REQUEST:
            return { loading: true, products: [] };
        case types.PRODUCT_LIST_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case types.PRODUCT_LIST_ALL_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case types.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products,
            };
        case types.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//PRODUCT GET ALL REVIEWS
export const getAllReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_ALL_REVIEW_REQUEST:
            return { loading: true, reviews: [] };
        case types.PRODUCT_ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };
        case types.PRODUCT_ALL_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//PRODUCT GET ALL COMMENTS
export const getAllCommentsReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_ALL_COMMENTS_REQUEST:
            return { loading: true, comments: [] };
        case types.PRODUCT_ALL_COMMENTS_SUCCESS:
            return {
                loading: false,
                comments: action.payload,
            };
        case types.PRODUCT_ALL_COMMENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// SINGLE PRODUCT
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case types.PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case types.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case types.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case types.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT COMMENT CREATE
export const productCreateCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_COMMENT_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_COMMENT_SUCCESS:
            return { loading: false, success: true };
        case types.PRODUCT_CREATE_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        case types.PRODUCT_CREATE_COMMENT_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT COMMENTCHILD CREATE
export const productCreateCommentChildReducer = (state = {}, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_COMMENTCHILD_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_COMMENTCHILD_SUCCESS:
            return { loading: false, success: true };
        case types.PRODUCT_CREATE_COMMENTCHILD_FAIL:
            return { loading: false, error: action.payload };
        case types.PRODUCT_CREATE_COMMENTCHILD_RESET:
            return {};
        default:
            return state;
    }
};

// CATEGORY
export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case types.CATEGORY_REQUEST:
            return { loading: true, categories: [...state.categories] };
        case types.CATEGORY_SUCCESS:
            return { loading: false, categories: action.payload };
        case types.CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

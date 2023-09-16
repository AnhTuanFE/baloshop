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
// export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
export const productDetailsReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case types.PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, data: action.payload };
        case types.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// SIMILAR PRODUCT
export const listProductSimilarReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.LIST_PRODUCT_SIMILAR_REQUEST:
            return { ...state, loading: true };
        case types.LIST_PRODUCT_SIMILAR_SUCCESS:
            return { loading: false, products: action.payload };
        case types.LIST_PRODUCT_SIMILAR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, data: action.payload };
        case types.PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case types.PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT COMMENT CREATE
export const productCreateCommentReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_COMMENT_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_COMMENT_SUCCESS:
            return { loading: false, success: true, data: action.payload };
        case types.PRODUCT_CREATE_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        case types.PRODUCT_CREATE_COMMENT_RESET:
            return {};
        default:
            return state;
    }
};

// PRODUCT COMMENTCHILD CREATE
export const productCreateCommentChildReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case types.PRODUCT_CREATE_COMMENTCHILD_REQUEST:
            return { loading: true };
        case types.PRODUCT_CREATE_COMMENTCHILD_SUCCESS:
            return { loading: false, success: true, data: action.payload };
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

import * as types from '../Constants/OrderConstants';
// CREATE ORDER
export const orderCreateReducer = (state = { loading: false, order: {} }, action) => {
    switch (action.type) {
        case types.ORDER_CREATE_REQUEST:
            return { loading: true };
        case types.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case types.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case types.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE ORDER REVIEW
export const orderCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case types.ORDER_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, orderReview: action.payload };
        case types.ORDER_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case types.ORDER_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case types.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case types.ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case types.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER PAY
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_PAY_REQUEST:
            return { loading: true };
        case types.ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case types.ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case types.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};

// USER ORDERS
export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case types.ORDER_LIST_MY_REQUEST:
            return { ...state, loading: true };
        case types.ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload };
        case types.ORDER_LIST_MY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case types.ORDER_LIST_MY_RESET:
            return { orders: [] };
        default:
            return { ...state };
    }
};

export const orderAddressMyReducer = (state = { orderAddress: {} }, action) => {
    switch (action.type) {
        case types.ORDER_ADDRESS_MY_REQUEST:
            return { loading: true, orderAddress: {} };
        case types.ORDER_ADDRESS_MY_SUCCESS:
            return { loading: false, orderAddress: action.payload };
        case types.ORDER_ADDRESS_MY_FAIL:
            return { loading: false, error: action.payload };
        case types.ORDER_ADDRESS_MY_RESET:
            return { orderAddress: {} };
        default:
            return state;
    }
};

//ORDER LIST ALL
export const productbestseller = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.ORDER_LIST_ALL_REQUEST:
            return { loading: true, products: [] };
        case types.ORDER_LIST_ALL_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case types.ORDER_LIST_ALL_FAIL:
            return { loading: false, products: [], error: action.payload };
        default:
            return state;
    }
};

// =================================================
// CREATE ORDER
export const PaypalReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ORDER_PAYPAL_PAID_REQUEST:
            return { loading: true };
        case types.ORDER_PAYPAL_PAID_SUCCESS:
            return { ...state, loading: false, orderPaypalReturn: action.payload };
        case types.ORDER_PAYPAL_PAID_FAIL:
            return { loading: false, error: action.payload };
        case types.ORDER_PAYPAL_PAID_CONFIRM_REQUEST:
            return { ...state, loading: true };
        case types.ORDER_PAYPAL_PAID_CONFIRM_SUCCESS:
            return { ...state, loading: false, orderConfirmReturn: action.payload };
        case types.ORDER_PAYPAL_PAID_CONFIRM_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const GHTK_Reducer = (state = {}, action) => {
    switch (action.type) {
        case types.CALCULATE_FEE_SHIP_REQUEST:
            return { loading: true };
        case types.CALCULATE_FEE_SHIP_SUCCESS:
            return { loading: false, success: true, data_fee_ship: action.payload };
        case types.CALCULATE_FEE_SHIP_FAIL:
            return { loading: false, error: action.payload };
        case types.GET_LABEL_ORDER_GHTK_REQUEST:
            return { loading: true };
        case types.GET_LABEL_ORDER_GHTK_SUCCESS:
            return { loading: false, data_label_order: action.payload };
        case types.GET_LABEL_ORDER_GHTK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateStatusOrderUserReducer = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_STATUS_ORDER_USER_REQUEST:
            return { loading: true };
        case types.UPDATE_STATUS_ORDER_USER_SUCCESS:
            return { loading: false, success: true };
        case types.UPDATE_STATUS_ORDER_USER_FAIL:
            return { loading: false, error: action.payload };
        case types.UPDATE_STATUS_ORDER_USER_RESET:
            return {};
        default:
            return state;
    }
};

export const userRequestConfirmPaidMOMOReducer = (state = {}, action) => {
    switch (action.type) {
        case types.USER_REQUEST_CONFIRM_PAID_REQUEST:
            return { loading: true };
        case types.USER_REQUEST_CONFIRM_PAID_SUCCESS:
            return { loading: false, success: true, data: action.payload };
        case types.USER_REQUEST_CONFIRM_PAID_FAIL:
            return { loading: false, error: action.payload };
        case types.USER_REQUEST_CONFIRM_PAID_RESET:
            return {};
        default:
            return state;
    }
};

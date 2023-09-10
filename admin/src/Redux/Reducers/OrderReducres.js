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

export const orderListReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderListCompleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_LIST_COMPLETE_REQUEST:
            return { loading: true };
        case ORDER_LIST_COMPLETE_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_COMPLETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateStatusOrderAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STATUS_ORDER_ADMIN_REQUEST:
            return { loading: true };
        case UPDATE_STATUS_ORDER_ADMIN_SUCCESS:
            return { loading: false, success: true };
        case UPDATE_STATUS_ORDER_ADMIN_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_STATUS_ORDER_ADMIN_RESET:
            return {};
        default:
            return state;
    }
};

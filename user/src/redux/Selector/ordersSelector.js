import { createSelector } from 'reselect';

export const orderAddress = (state) => state.orderAddress;
export const orderCancel = (state) => state.orderCancel;
export const orderCreate = (state) => state.orderCreate;
export const orderDetails = (state) => state.orderDetails;
export const orderListMy = (state) => state.orderListMy;
export const orderPayReducer = (state) => state.orderPayReducer;
export const order_ghtk_state = (state) => state.order_ghtk_state;

export const listAllOrder = (state) => state.listAllOrder;

export const orderCreateReviewsRetult = (state) => state.orderCreateReviewsRetult;
export const orderCompleteReducer = (state) => state.orderCompleteReducer;

export const ordersRemainingSelector = createSelector(
    orderAddress,
    orderCancel,
    orderCreate,
    orderDetails,
    orderListMy,
    orderPayReducer,
    listAllOrder,
    orderCreateReviewsRetult,
    orderCompleteReducer,
    order_ghtk_state,
    (
        orderAddress,
        orderCancel,
        orderCreate,
        orderDetails,
        orderListMy,
        orderPayReducer,
        listAllOrder,
        orderCreateReviewsRetult,
        orderCompleteReducer,
        order_ghtk_state,
    ) => {
        return {
            orderAddress,
            orderCancel,
            orderCreate,
            orderDetails,
            orderListMy,
            orderPayReducer,
            listAllOrder,
            orderCreateReviewsRetult,
            orderCompleteReducer,
            order_ghtk_state,
        };
    },
);

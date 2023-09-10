import { createSelector } from 'reselect';

export const orderAddress = (state) => state.orderAddress;
export const orderCreate = (state) => state.orderCreate;
export const orderDetails = (state) => state.orderDetails;
export const orderListMy = (state) => state.orderListMy;
export const orderPayReducer = (state) => state.orderPayReducer;
export const order_ghtk_state = (state) => state.order_ghtk_state;
export const stateUpdateStatusOrderUser = (state) => state.stateUpdateStatusOrderUser;

export const listAllOrder = (state) => state.listAllOrder;

export const orderCreateReviewsRetult = (state) => state.orderCreateReviewsRetult;

export const ordersRemainingSelector = createSelector(
    orderAddress,
    orderCreate,
    orderDetails,
    orderListMy,
    orderPayReducer,
    listAllOrder,
    orderCreateReviewsRetult,
    order_ghtk_state,
    stateUpdateStatusOrderUser,
    (
        orderAddress,
        orderCreate,
        orderDetails,
        orderListMy,
        orderPayReducer,
        listAllOrder,
        orderCreateReviewsRetult,
        order_ghtk_state,
        stateUpdateStatusOrderUser,
    ) => {
        return {
            orderAddress,
            orderCreate,
            orderDetails,
            orderListMy,
            orderPayReducer,
            listAllOrder,
            orderCreateReviewsRetult,
            order_ghtk_state,
            stateUpdateStatusOrderUser,
        };
    },
);

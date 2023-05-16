import { createSelector } from 'reselect';

export const orderAddress = (state) => state.orderAddress;
export const orderCancel = (state) => state.orderCancel;
export const orderCreate = (state) => state.orderCreate;
export const orderDetails = (state) => state.orderDetails;
export const orderListMy = (state) => state.orderListMy;
export const orderPayReducer = (state) => state.orderPayReducer;
export const listAllOrder = (state) => state.listAllOrder;

export const orderCreateReviewsRetult = (state) => state.orderCreateReviewsRetult;
export const orderCompleteReducer = (state) => state.orderCompleteReducer;
export const orderGetItem = (state) => state.orderGetItem;
export const returnAmountProductReducer = (state) => state.returnAmountProductReducer;

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
    orderGetItem,
    returnAmountProductReducer,
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
        orderGetItem,
        returnAmountProductReducer,
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
            orderGetItem,
            returnAmountProductReducer,
        };
    },
);

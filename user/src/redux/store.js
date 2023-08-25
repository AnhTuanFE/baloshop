import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from '@redux-devtools/extension';
import {
    productCreateReviewReducer,
    productCreateCommentReducer,
    productCreateCommentChildReducer,
    productDetailsReducer,
    productListReducer,
    productListAllReducer,
    getAllCommentsReducer,
    getAllReviewsReducer,
    categoryListReducer,
} from './Reducers/ProductReducers';
import { cartReducer, CreateCartReducer, DeleteCartReducer } from './Reducers/CartReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userListReducer,
    ProvinceReducer,
    Avatarload,
    userForgotPassWord,
    userVerifyResetPassWordReducer,
    ResetPassWordReducer,
} from './Reducers/userReducers';
import {
    orderAddressMyReducer,
    orderCancelReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
    productbestseller,
    orderCreateReviewReducer,
    orderCompleteReducer,
    returnAmountProductReducer,
    PaypalReducer,
    GHTK_Reducer,
} from './Reducers/OrderReducres';
import { Sliderload } from './Reducers/SliderReducer';
import { getNewsReducer, newsListReducer } from './Reducers/NewsReducer';

const reducer = combineReducers({
    listAllOrder: productbestseller,
    productList: productListReducer,
    productAll: productListAllReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productCreateReviewReducer,
    productCommentCreate: productCreateCommentReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    getAllReviewsProduct: getAllReviewsReducer,
    getAllCommentsProduct: getAllCommentsReducer,
    cart: cartReducer,
    cartCreate: CreateCartReducer,
    cartDelete: DeleteCartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userAll: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderAddress: orderAddressMyReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderCancel: orderCancelReducer,
    orderCreateReviewsRetult: orderCreateReviewReducer,
    orderGetComplete: orderCompleteReducer,
    order_ghtk_state: GHTK_Reducer,
    paypalstate: PaypalReducer,
    returnAmount: returnAmountProductReducer,
    sliderLoad: Sliderload,
    CategoryList: categoryListReducer,
    avatarLoad: Avatarload,
    provincesVietNam: ProvinceReducer,
    listNews: newsListReducer,
    getDetailNews: getNewsReducer,
    forgotPassWordState: userForgotPassWord,
    verifyState: userVerifyResetPassWordReducer,
    resetPasswordState: ResetPassWordReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

// Lấy data từ localStorage
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: [],
    },
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;

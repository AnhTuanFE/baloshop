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
    categoryListReducer,
    listProductSimilarReducer,
} from './Reducers/ProductReducers';
import { cartReducer, CreateCartReducer, DeleteCartReducer } from './Reducers/CartReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    ProvinceReducer,
    Avatarload,
    userForgotPassWord,
    ResetPassWordReducer,
    userUpdatePasswordReducer,
} from './Reducers/userReducers';
import {
    orderAddressMyReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
    productbestseller,
    PaypalReducer,
    GHTK_Reducer,
    updateStatusOrderUserReducer,
    userRequestConfirmPaidMOMOReducer,
} from './Reducers/OrderReducres';
import { Sliderload } from './Reducers/SliderReducer';
import { getNewsReducer, newsListReducer } from './Reducers/NewsReducer';

const reducer = combineReducers({
    listAllOrder: productbestseller,
    productList: productListReducer,
    productAll: productListAllReducer,
    productDetails: productDetailsReducer,
    listProductSimilar: listProductSimilarReducer,
    productReviewCreate: productCreateReviewReducer,
    productCommentCreate: productCreateCommentReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    getAllCommentsProduct: getAllCommentsReducer,
    cart: cartReducer,
    cartCreate: CreateCartReducer,
    cartDelete: DeleteCartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    stateUserUpdatePassword: userUpdatePasswordReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderAddress: orderAddressMyReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    order_ghtk_state: GHTK_Reducer,
    stateUpdateStatusOrderUser: updateStatusOrderUserReducer,
    stateUserRequestConfirmPaidMOMO: userRequestConfirmPaidMOMOReducer,
    paypalstate: PaypalReducer,
    sliderLoad: Sliderload,
    CategoryList: categoryListReducer,
    avatarLoad: Avatarload,
    provincesVietNam: ProvinceReducer,
    listNews: newsListReducer,
    getDetailNews: getNewsReducer,
    forgotPassWordState: userForgotPassWord,
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

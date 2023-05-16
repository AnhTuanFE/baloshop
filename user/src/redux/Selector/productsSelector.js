import { createSelector } from 'reselect';

export const productReviewCreate = (state) => state.productReviewCreate;
export const productCommentCreate = (state) => state.productCommentCreate;
export const productCommentChildCreate = (state) => state.productCommentChildCreate;
export const productDetails = (state) => state.productDetails;
export const productList = (state) => state.productList;
export const productAll = (state) => state.productAll;
export const getAllCommentsProduct = (state) => state.getAllCommentsProduct;
export const getAllReviewsProduct = (state) => state.getAllReviewsProduct;
export const CategoryList = (state) => state.CategoryList;

export const productsRemainingSelector = createSelector(
    productReviewCreate,
    productCommentCreate,
    productCommentChildCreate,
    productDetails,
    productList,
    productAll,
    getAllCommentsProduct,
    getAllReviewsProduct,
    CategoryList,
    (
        productReviewCreate,
        productCommentCreate,
        productCommentChildCreate,
        productDetails,
        productList,
        productAll,
        getAllCommentsProduct,
        getAllReviewsProduct,
        CategoryList,
    ) => {
        return {
            productReviewCreate,
            productCommentCreate,
            productCommentChildCreate,
            productDetails,
            productList,
            productAll,
            getAllCommentsProduct,
            getAllReviewsProduct,
            CategoryList,
        };
    },
);

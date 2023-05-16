import { createSelector } from 'reselect';

export const cart = (state) => state.cart;
export const cartCreate = (state) => state.cartCreate;
export const cartDelete = (state) => state.cartDelete;

export const cartsRemainingSelector = createSelector(cart, cartCreate, cartDelete, (cart, cartCreate, cartDelete) => {
    return {
        cart,
        cartCreate,
        cartDelete,
    };
});

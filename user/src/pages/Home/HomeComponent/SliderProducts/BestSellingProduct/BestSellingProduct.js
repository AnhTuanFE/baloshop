import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProductsBestSellingAction } from '~/redux/Actions/OrderActions';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';
import SliderProducts from '../SliderProducts';
export default function BestSellingProduct() {
    const { listAllOrder } = useSelector(ordersRemainingSelector);
    const { products } = listAllOrder;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductsBestSellingAction());
    }, []);

    return (
        <>{products?.length == 0 ? ' ' : <SliderProducts products={products} labelSlider={'Sản Phẩm Bán chạy'} />}</>
    );
}

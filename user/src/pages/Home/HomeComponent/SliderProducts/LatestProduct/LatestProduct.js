import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListProductLatestAction } from '~/redux/Actions/ProductActions';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import SliderProducts from '../SliderProducts';

export default function LatestProduct() {
    const { productAll } = useSelector(productsRemainingSelector);
    const { products } = productAll;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductLatestAction());
    }, []);
    return <>{products.length == 0 ? ' ' : <SliderProducts products={products} labelSlider={'Sản Phẩm Mới Nhất'} />}</>;
}

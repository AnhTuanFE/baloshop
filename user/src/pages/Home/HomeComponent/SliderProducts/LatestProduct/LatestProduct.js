import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListProductAll } from '~/redux/Actions/ProductActions';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import SliderProducts from '../SliderProducts';

export default function LatestProduct() {
    const { productAll } = useSelector(productsRemainingSelector);
    const { products } = productAll;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);
    return (
        <>
            <SliderProducts products={products} labelSlider={'Sản Phẩm Mới Nhất'} />
        </>
    );
}

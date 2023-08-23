import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '~/redux/Actions/ProductActions';
import SliderProducts from '~/pages/Home/HomeComponent/SliderProducts/SliderProducts';
function SimilarProducts() {
    const dispatch = useDispatch();

    const allProduct = useSelector((state) => state.productAll);
    const { products } = allProduct;

    useEffect(() => {
        dispatch(ListProductAll());
    }, []);
    return (
        <>
            <SliderProducts products={products} labelSlider={'Sản Phẩm Tương Tự'} />
        </>
    );
}
export default SimilarProducts;

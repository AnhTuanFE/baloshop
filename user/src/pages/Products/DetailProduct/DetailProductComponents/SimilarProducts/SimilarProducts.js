import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListProductSimilarAction } from '~/redux/Actions/ProductActions';
import SliderProducts from '~/pages/Home/HomeComponent/SliderProducts/SliderProducts';
function SimilarProducts(prop) {
    const { category } = prop;
    const dispatch = useDispatch();

    const similarProducts = useSelector((state) => state.listProductSimilar);
    const { products } = similarProducts;

    useEffect(() => {
        dispatch(ListProductSimilarAction({ category: category }));
    }, []);
    return (
        <>
            <SliderProducts products={products} labelSlider={'Sản Phẩm Tương Tự'} />
        </>
    );
}
export default SimilarProducts;

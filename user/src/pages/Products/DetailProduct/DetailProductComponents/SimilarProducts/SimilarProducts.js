import { useEffect } from 'react';
import Slider from 'react-slick';
import Rating from '~/components/HomeComponent/Rating/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '~/redux/Actions/ProductActions';

function SimilarProducts(data) {
    const dispatch = useDispatch();

    const allProduct = useSelector((state) => state.productAll);
    const { products } = allProduct;

    useEffect(() => {
        dispatch(ListProductAll());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                },
            },
        ],
    };
    return (
        <div className="mt-5">
            <h2 className="mb-3 ml-2 mt-7">
                <span className="text-2xl font-semibold">Sản Phẩm Tương Tự</span>
            </h2>
            <div className="">
                <Slider {...settings}>
                    {products?.map((product, index) => {
                        return (
                            <div
                                key={index}
                                className="max-h-[300px] hover:-translate-y-4 hover:transform hover:transition hover:duration-200 hover:ease-linear"
                            >
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={`${product?.image[0].urlImage}`}
                                        className="filter-[brightness(1)] m-auto h-[200px]"
                                        alt=""
                                    />
                                    <div className="flex justify-center">
                                        <div className="text-center">
                                            <p className="">{product?.name}</p>
                                            <p className="font-bold">{product?.price?.toLocaleString('de-DE')}đ</p>
                                            <div className="">
                                                <Rating value={product?.rating} text={`(${product?.numReviews})`} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
export default SimilarProducts;

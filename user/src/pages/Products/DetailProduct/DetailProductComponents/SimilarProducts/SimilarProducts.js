import React, { useEffect } from 'react';
import Slider from 'react-slick';
import Rating from '~/components/HomeComponent/Rating/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '~/redux/Actions/ProductActions';

function SimilarProducts(data) {
    //
    // const { products } = data;
    // console.log('products = ', products);
    // console.log('data = ', data);
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
        <>
            <h2 className="section-title" style={{ padding: '0', margin: '30px 0 10px 0' }}>
                <span className="section-title-main">Sản Phẩm Tương Tự</span>
                <p></p>
            </h2>
            <div className="corousel-container container">
                <div className="corousel">
                    <Slider {...settings}>
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className="corousel-div" style={{ maxHeight: '300px' }}>
                                    <Link to={`/product/${product._id}`} className="corousel-link">
                                        <img
                                            src={`${product?.image[0].urlImage}`}
                                            className="corousel-img"
                                            alt=""
                                        ></img>
                                        <p className="corousel-noti">{product?.name}</p>
                                        <p className="corousel-price">{product?.price?.toLocaleString('de-DE')}đ</p>
                                        <div className="corousel-rating">
                                            <Rating value={product?.rating} text={`(${product?.numReviews})`} />
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </>
    );
}
export default SimilarProducts;

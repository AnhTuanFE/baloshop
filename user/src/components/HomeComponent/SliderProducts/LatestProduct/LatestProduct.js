import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Rating from '../../Rating/Rating';
import { ListProductAll } from '~/redux/Actions/ProductActions';
import styles from './LatestProduct.module.scss';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import { Divider, Chip } from '@mui/material';

export default function LatestProduct() {
    const { productAll } = useSelector(productsRemainingSelector);
    const { products } = productAll;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
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
        <div className="mx-auto my-auto max-w-screen-2xl pt-3">
            <h2 className="pb-10 text-center">
                <Divider>
                    <Chip
                        className="font-semibold"
                        sx={{
                            fontSize: '24px',
                            bgcolor: '#ffff',
                        }}
                        label="Sản Phẩm Mới Nhất"
                    />
                </Divider>
            </h2>
            <div className="corousel">
                <Slider {...settings}>
                    {products?.map((product, index) => {
                        return (
                            <div key={product._id} className={clsx(styles.corousel_div)}>
                                <Link to={`/product/${product._id}`} className={clsx(styles.corousel_link)}>
                                    <img
                                        src={`${product?.image[0].urlImage}`}
                                        className={clsx(styles.corousel_img)}
                                        alt=""
                                    ></img>
                                    <p className={clsx(styles.corousel_noti)}>{product.name}</p>
                                    <p className={clsx(styles.corousel_price)}>
                                        {product?.price?.toLocaleString('de-DE')}đ
                                    </p>
                                    <div className={clsx(styles.corousel_rating)}>
                                        <Rating value={product.rating} text={`(${product.numReviews})`} />
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

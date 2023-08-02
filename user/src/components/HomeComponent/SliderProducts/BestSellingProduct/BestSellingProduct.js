import clsx from 'clsx';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../Rating/Rating';
import { listAllOrderAction } from '~/redux/Actions/OrderActions';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';
import { Divider, Chip } from '@mui/material';
import styles from './BestSellingProduct.module.scss';

export default function BestSellingProduct() {
    const { listAllOrder } = useSelector(ordersRemainingSelector);
    const { products } = listAllOrder;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllOrderAction());
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
        <>
            <div className="mx-auto my-auto max-w-screen-2xl pt-10">
                <h2 className="pb-10 text-center">
                    <Divider>
                        <Chip
                            className="font-semibold"
                            sx={{
                                fontSize: '24px',
                                bgcolor: '#ffff',
                            }}
                            label="Sản Phẩm Bán Chạy"
                        />
                    </Divider>
                </h2>
                <div></div>
                <div className="corousel">
                    <Slider {...settings}>
                        {products &&
                            products?.map((product, index) => {
                                return (
                                    <div key={index} className="max-h-80">
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
        </>
    );
}

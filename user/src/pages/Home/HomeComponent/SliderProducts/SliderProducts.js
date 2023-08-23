import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Rating from '~/components/Rating/Rating';
import { Divider, Chip } from '@mui/material';

export default function SliderProducts({ products, labelSlider }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        customPaging: (a) => <button className="bg-red-500 p-6">button {a}</button>,
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
        <div className="mx-auto my-auto mt-3 max-w-screen-2xl pt-3">
            <h2 className="pb-3 text-center">
                <Divider>
                    <Chip
                        className="font-semibold"
                        sx={{
                            fontSize: '18px',
                            bgcolor: '#ffff',
                        }}
                        label={labelSlider}
                    />
                </Divider>
            </h2>
            <div className="min-h-[300px]">
                <Slider className=" " {...settings}>
                    {products?.map((product, index) => {
                        return (
                            <div key={product._id} className="max-h-[300px] ">
                                <Link className="" to={`/product/${product._id}`}>
                                    <div className="mx-2 bg-white py-3">
                                        <div className="hover:-translate-y-4 hover:transform hover:transition hover:duration-200 hover:ease-linear">
                                            <img
                                                src={`${product?.image[0].urlImage}`}
                                                className="filter-[brightness(1)] m-auto h-[200px]"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-center  text-center">
                                            <div>
                                                <p className="">{product.name}</p>
                                                <p className="text-base font-semibold">
                                                    {product?.price?.toLocaleString('de-DE')}đ
                                                </p>
                                                <div>
                                                    <Rating value={product.rating} text={`(${product.numReviews})`} />
                                                </div>
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

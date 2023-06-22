import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '~/redux/Actions/sliderAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slidersRemainingSelector } from '~/redux/Selector/slidersReducer';

export default function Sliders() {
    const { sliderLoad } = useSelector(slidersRemainingSelector);
    const { slider } = sliderLoad;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListSlider());
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        // autoplaySpeed: 4000,
        autoplaySpeed: 4000000,

        cssEase: 'linear',
    };
    return (
        <div className="m-4 rounded-xl bg-custom-color pb-4 pt-6">
            <Slider {...settings}>
                {slider?.map((value, index) => {
                    return (
                        <div key={index}>
                            <img src={value.url} className="mx-auto my-auto h-[450px] rounded-xl" alt="slider image" />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

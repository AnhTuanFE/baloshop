import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '~/redux/Actions/sliderAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slidersRemainingSelector } from '~/redux/Selector/slidersReducer';
import Loading from '~/components/LoadingError/Loading';
import { useEffect } from 'react';

function Test() {
    const { sliderLoad } = useSelector(slidersRemainingSelector);
    const { slider, loading } = sliderLoad;
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
        autoplaySpeed: 2000,
        cssEase: 'linear',
    };
    return (
        <div className="mx-auto my-auto  max-w-screen-2xl">
            <div className="mx-20 mt-20">
                <div className="flex ">
                    <div className="mr-2 w-[70%]">
                        <Slider
                            style={{ maxHeight: '252px', overflow: 'hidden', objectFit: 'cover' }}
                            className=""
                            {...settings}
                        >
                            {slider?.map((value, index) => {
                                return (
                                    <div key={value?.id}>
                                        <img src={value?.url} className=" max-h-[252px] w-full" alt="slider image" />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="w-[30%]">
                        <div className="mb-2">
                            <img className="max-h-[122px]  w-full" src={slider[1]?.url} alt="banner" />
                        </div>
                        <div className="">
                            <img className="max-h-[122px]  w-full" src={slider[1]?.url} alt="banner" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;

//  ;
// import { useState, useEffect } from "react";
// import clsx from "clsx";
// import styles from "./HomeComponentCSS/Sliders.module.scss";
// import {
//   faCircleChevronLeft,
//   faCircleChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// function Sliders() {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   const arrSliders = [
//     {
//       id: 0,
//       link: "https://cf.shopee.vn/file/3c01f7e0e9c412a21aa891dd700d17e6",
//     },
//     {
//       id: 1,
//       link: "https://cf.shopee.vn/file/d10d360b284e396392fa5769088c18a4",
//     },
//     {
//       id: 2,
//       link: "https://cf.shopee.vn/file/c6e5fa5991b447dfb6c08bb0a2f6dcbd",
//     },
//     {
//       id: 3,
//       link: "https://cf.shopee.vn/file/79c43b8850690947d417c61507b20486",
//     },
//   ];
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentIndex < arrSliders?.length - 1) {
//         setCurrentIndex((currentIndex) => currentIndex + 1);
//       } else {
//         setCurrentIndex(0);
//       }
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const handleIndexNext = () => {
//     if (currentIndex < arrSliders.length - 1) {
//       setCurrentIndex((currentIndex) => currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const handleIndexPre = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((currentIndex) => currentIndex - 1);
//     } else {
//       setCurrentIndex(arrSliders.length - 1);
//     }
//   };
//   //==============
//   return (
//     <div className={clsx(styles.wrap_slider)}>
//       <div className={clsx(styles.wrap_image_icon)}>
//         <div className={clsx(styles.wrap_icon)}>
//           <FontAwesomeIcon
//             className={clsx(styles.icon_slider_left)}
//             icon={faCircleChevronLeft}
//             onClick={handleIndexPre}
//           />
//         </div>
//         <img
//           src={arrSliders[currentIndex].link}
//           alt="Slider"
//           className={clsx(styles.image_slider)}
//         />
//         <div className={clsx(styles.wrap_icon)}>
//           <FontAwesomeIcon
//             className={clsx(styles.icon_slider_right)}
//             icon={faCircleChevronRight}
//             onClick={handleIndexNext}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sliders;
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '~/redux/Actions/sliderAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import styles from './Sliders.module.scss';
// import { listCart } from '~/Redux/Actions/cartActions';
import { slidersRemainingSelector } from '~/redux/Selector/slidersReducer';

export default function Sliders() {
    // const sliderList = useSelector((state) => state.sliderLoad);
    const { sliderLoad } = useSelector(slidersRemainingSelector);
    // console.log('sliderLoad = ', sliderLoad);
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
        autoplaySpeed: 4000,
        cssEase: 'linear',
    };
    return (
        <div className="Announcement Announcement-slider">
            <div class="container container-slider">
                <div class="row slider-row">
                    <Slider {...settings}>
                        {slider?.map((value, index) => {
                            return (
                                <div key={index} className="slider-div__image">
                                    <img className={clsx(styles.slider_image)} src={value.url} alt=""></img>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

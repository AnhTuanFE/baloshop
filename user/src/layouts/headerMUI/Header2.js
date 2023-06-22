// import { Box, Button, Typography } from '@mui/material';
// import { Carousel } from 'antd';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import clsx from 'clsx';
// import { useState } from 'react';
// import styles from './Header2.module.css';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useSelector } from 'react-redux';
// import { useTheme } from '@mui/material/styles';
// import axios from 'axios';

// export default function Header2() {
//     const gnhFunction = async () => {
//         const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';
//         const token = 'e3458022-0b93-11ee-8430-a61cf7de0a67';
//         const shopId = 2506150;

//         const data = {
//             from_district_id: 1454,
//             from_ward_code: 21211,
//             service_id: 53320,
//             service_type_id: null,
//             to_district_id: 1452,
//             to_ward_code: '21012',
//             height: 50,
//             length: 20,
//             weight: 200,
//             width: 20,
//             insurance_value: 10000,
//             cod_failed_amount: 2000,
//             coupon: null,
//         };

//         const headers = {
//             'Content-Type': 'application/json',
//             Token: token.toString(),
//             ShopId: shopId,
//         };

//         const { data1 } = await axios.post(url, data, { headers });
//         console.log('data nhận được = ', data1);
//     };
//     return (
//         <Box
//             sx={{
//                 '& > :not(style)': {
//                     m: 5,
//                 },
//             }}
//         >
//             <h1> hello</h1>
//             <Button size="large" variant="contained" onClick={gnhFunction}>
//                 Get phí ship
//             </Button>
//         </Box>
//     );
// }
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '~/redux/Actions/sliderAction';
import { slidersRemainingSelector } from '~/redux/Selector/slidersReducer';
import { useEffect } from 'react';

function Header2() {
    const { sliderLoad } = useSelector(slidersRemainingSelector);
    const { slider } = sliderLoad;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListSlider());
    }, []);
    return (
        // <div id="default-carousel" class="relative w-full" data-carousel="slide">
        //     <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        //         <div class="hidden duration-700 ease-in-out" data-carousel-item>
        //             <img
        //                 src={slider[0]?.url}
        //                 class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
        //                 alt="..."
        //             />
        //         </div>
        //         <div class="hidden duration-700 ease-in-out" data-carousel-item>
        //             <img
        //                 src={slider[0]?.url}
        //                 class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
        //                 alt="..."
        //             />
        //         </div>
        //         <div class="hidden duration-700 ease-in-out" data-carousel-item>
        //             <img
        //                 src={slider[0]?.url}
        //                 class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
        //                 alt="..."
        //             />
        //         </div>
        //         <div class="hidden duration-700 ease-in-out" data-carousel-item>
        //             <img
        //                 src={slider[0]?.url}
        //                 class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
        //                 alt="..."
        //             />
        //         </div>
        //         <div class="hidden duration-700 ease-in-out" data-carousel-item>
        //             <img
        //                 src={slider[0]?.url}
        //                 class="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
        //                 alt="..."
        //             />
        //         </div>
        //     </div>
        //     <div class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        //         <button
        //             type="button"
        //             class="h-3 w-3 rounded-full"
        //             aria-current="true"
        //             aria-label="Slide 1"
        //             data-carousel-slide-to="0"
        //         ></button>
        //         <button
        //             type="button"
        //             class="h-3 w-3 rounded-full"
        //             aria-current="false"
        //             aria-label="Slide 2"
        //             data-carousel-slide-to="1"
        //         ></button>
        //         <button
        //             type="button"
        //             class="h-3 w-3 rounded-full"
        //             aria-current="false"
        //             aria-label="Slide 3"
        //             data-carousel-slide-to="2"
        //         ></button>
        //         <button
        //             type="button"
        //             class="h-3 w-3 rounded-full"
        //             aria-current="false"
        //             aria-label="Slide 4"
        //             data-carousel-slide-to="3"
        //         ></button>
        //         <button
        //             type="button"
        //             class="h-3 w-3 rounded-full"
        //             aria-current="false"
        //             aria-label="Slide 5"
        //             data-carousel-slide-to="4"
        //         ></button>
        //     </div>
        //     <button
        //         type="button"
        //         class="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        //         data-carousel-prev
        //     >
        //         <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
        //             <svg
        //                 aria-hidden="true"
        //                 class="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        //                 fill="none"
        //                 stroke="currentColor"
        //                 viewBox="0 0 24 24"
        //                 xmlns="http://www.w3.org/2000/svg"
        //             >
        //                 <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     stroke-width="2"
        //                     d="M15 19l-7-7 7-7"
        //                 ></path>
        //             </svg>
        //             <span class="sr-only">Previous</span>
        //         </span>
        //     </button>
        //     <button
        //         type="button"
        //         class="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        //         data-carousel-next
        //     >
        //         <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
        //             <svg
        //                 aria-hidden="true"
        //                 class="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        //                 fill="none"
        //                 stroke="currentColor"
        //                 viewBox="0 0 24 24"
        //                 xmlns="http://www.w3.org/2000/svg"
        //             >
        //                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        //             </svg>
        //             <span class="sr-only">Next</span>
        //         </span>
        //     </button>
        // </div>
        <>
            <span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                Default
            </span>
            <span class="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Dark
            </span>
            <span class="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                Red
            </span>
            <span class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                Green
            </span>
            <span class="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                Yellow
            </span>
            <span class="mr-2 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                Indigo
            </span>
            <span class="mr-2 rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Purple
            </span>
            <span class="mr-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                Pink
            </span>
        </>
    );
}

export default Header2;

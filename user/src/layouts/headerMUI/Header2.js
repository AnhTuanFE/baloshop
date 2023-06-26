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

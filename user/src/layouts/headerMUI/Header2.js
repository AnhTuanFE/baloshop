import { Box, Button, Typography } from '@mui/material';
import { Carousel } from 'antd';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './Header2.module.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function Header2() {
    const gnhFunction = async () => {
        const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';
        const token = 'e3458022-0b93-11ee-8430-a61cf7de0a67';
        const shopId = 2506150;

        const data = {
            from_district_id: 1454,
            from_ward_code: 21211,
            service_id: 53320,
            service_type_id: null,
            to_district_id: 1452,
            to_ward_code: '21012',
            height: 50,
            length: 20,
            weight: 200,
            width: 20,
            insurance_value: 10000,
            cod_failed_amount: 2000,
            coupon: null,
        };

        const headers = {
            'Content-Type': 'application/json',
            Token: token.toString(),
            ShopId: shopId,
        };

        const { data1 } = await axios.post(url, data, { headers });
        console.log('data nhận được = ', data1);
    };
    return (
        <Box
            sx={{
                '& > :not(style)': {
                    m: 5,
                },
            }}
        >
            <h1> hello</h1>
            <Button size="large" variant="contained" onClick={gnhFunction}>
                Get phí ship
            </Button>
        </Box>
    );
}

import { Box, Button } from '@mui/material';
import axios from 'axios';

export default function Header2() {
    // const gnhFunction = async () => {
    //     const url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';

    //     const token = 'e3458022-0b93-11ee-8430-a61cf7de0a67';
    //     const shopId = 2506150;

    //     // const token = '51b7c926-d099-11ed-943b-f6b926345ef9';
    //     // const shopId = 123786;

    //     const data = {
    //         service_id: 53320,
    //         service_type_id: null,
    //         to_district_id: 1452,
    //         to_ward_code: '21012',
    //         height: 50,
    //         length: 20,
    //         weight: 200,
    //         width: 20,
    //         insurance_value: 10000,
    //         coupon: null,
    //     };

    //     const headers = {
    //         'Content-Type': 'application/json',
    //         Token: token,
    //         ShopId: shopId,
    //     };

    //     const { data1 } = await axios.get(url, data, { headers });
    //     console.log('data nhận được = ', data1);
    // };

    const getPhiShip = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // const { data } = await axios.get(`/api/ghtk/get_fee_ship`, config);
            const { data } = await axios.get(`/api/ghtk/update_status_order_by_id`, config);
            console.log('data nhận được = ', data);
        } catch (error) {
            console.log('error = ', error);
        }
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
            <Button size="large" variant="contained" onClick={getPhiShip}>
                Get phí ship
            </Button>
        </Box>
    );
}

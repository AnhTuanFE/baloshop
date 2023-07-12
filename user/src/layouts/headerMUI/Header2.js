import { Box, Button } from '@mui/material';
import axios from 'axios';

export default function Header2() {
    const getPhiShip = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const data1 = {
                idOrder: '123',
                label_GHTK: 'label 1',
            };
            // const { data } = await axios.get(`/api/ghtk/get_fee_ship`, config);
            const { data } = await axios.get(`/api/ghtk/get_order_by_id`, config);
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

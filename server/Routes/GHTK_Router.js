import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
const GHTK_Router = express.Router();

// const apiBase = 'https://services.giaohangtietkiem.vn';
const apiBase = 'https://services-staging.ghtklab.com';

GHTK_Router.get(
    '/get_fee_ship',
    asyncHandler(async (req, res) => {
        try {
            const url = `${apiBase}/services/shipment/fee`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const data1 = {
                pick_province: 'Hà Nội',
                pick_district: 'Quận Hai Bà Trưng',
                province: 'Hà nội',
                district: 'Quận Cầu Giấy',
                address: 'P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ',
                weight: 1000,
                value: 3000000,
                transport: 'fly',
                deliver_option: 'xteam',
                tags: [1, 7],
            };
            const { data } = await axios.post(url, data1, config);
            if (data) {
                console.log('data = ', data);
                res.status(200).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);

GHTK_Router.get(
    '/create_order_ghtk',
    asyncHandler(async (req, res) => {
        try {
            const url = `${apiBase}/services/shipment/order`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const data1 = {
                products: [
                    {
                        id_p: 1433,
                        name: 'bút',
                        weight: 0.1,
                        quantity: 1,
                        product_code: 1241,
                    },
                    {
                        id_p: 1223,
                        name: 'tẩy',
                        weight: 0.2,
                        quantity: 1,
                        product_code: 1254,
                    },
                ],
                order: {
                    id: 'a4',
                    pick_name: 'HCM-nội thành',
                    pick_address: '590 CMT8 P.11',
                    pick_province: 'TP. Hồ Chí Minh',
                    pick_district: 'Quận 3',
                    pick_ward: 'Phường 1',
                    pick_tel: '0911222333',
                    tel: '0193456765',
                    name: 'GHTK - HCM - Noi Thanh',
                    email: 'khachhang@gmail.com',
                    address: '123 nguyễn chí thanh',
                    province: 'TP. Hồ Chí Minh',
                    district: 'Quận 1',
                    ward: 'Phường Bến Nghé',
                    hamlet: 'Khác',
                    is_freeship: '1',
                    pick_date: '2016-09-30',
                    pick_money: 47000,
                    note: 'Khối lượng tính cước tối đa: 1.00 kg',
                    value: 3000000,
                    transport: 'road',
                    // pick_option: 'cod', // Đơn hàng xfast yêu cầu bắt buộc pick_option là COD
                    // deliver_option: 'xteam', // nếu lựa chọn kiểu vận chuyển xfast
                    // pick_session: 2, // Phiên lấy xfast
                    // booking_id: 2,
                    tags: [1, 7],
                },
            };
            const { data } = await axios.post(url, data1, config);
            if (data) {
                console.log('data = ', data);
                res.status(201).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);
GHTK_Router.get(
    '/get_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const data1 = 'S22223996.SG01-G60.1250011188';
            const url = `${apiBase}/services/shipment/v2/${data1}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.get(url, config);
            if (data) {
                console.log('data = ', data);
                res.status(201).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);
GHTK_Router.get(
    '/update_status_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const data1 = 'S22223996.SG01-G60.1250011188';
            const url = `${apiBase}/services/shipment/v2/${data1}`;
            const data2 = {
                status: 3,
                status_text: 'Đã tiếp nhận',
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.post(url, data2, config);
            if (data) {
                console.log('data = ', data);
                res.status(201).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);
GHTK_Router.get(
    '/cancel_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const data1 = 'S22223996.SG01-G60.1250011188';
            const url = `${apiBase}/services/shipment/cancel/${data1}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.get(url, config);
            if (data) {
                console.log('data = ', data);
                res.status(201).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);
GHTK_Router.get(
    '/get_label_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const data1 = 'S22223996.SG01-G60.1250011188';
            const url = `${apiBase}/services/label/${data1}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.get(url, config);
            if (data) {
                console.log('data = ', data);
                res.status(201).json(data);
            }
        } catch (error) {
            console.log('lỗi là : ', error);
            res.status(500).json('lỗi', error);
        }
    }),
);
export default GHTK_Router;

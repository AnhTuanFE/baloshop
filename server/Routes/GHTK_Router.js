import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

const GHTK_Router = express.Router();

// const apiBase = 'https://services.giaohangtietkiem.vn';
const apiBase = 'https://services-staging.ghtklab.com';

// lấy dữ liệu từ các tỉnh thành
GHTK_Router.get(
    '/get_data_province',
    asyncHandler(async (req, res) => {
        try {
            const url = `${apiBase}/services/address/getDeliveredAddress`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const data1 = {
                parent_id: 863,
            };
            const { data } = await axios.get(url, config);
            if (data) {
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json('lỗi', error);
        }
    }),
);
// Tính phí ship
GHTK_Router.post(
    '/get_fee_ship',
    asyncHandler(async (req, res) => {
        try {
            // console.log('req = ', req?.body);
            const {
                pick_province,
                pick_district,
                pick_ward,
                pick_address,
                province,
                district,
                ward,
                address,
                weight,
                value,
            } = req?.body;
            const url = `${apiBase}/services/shipment/fee`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const data1 = {
                pick_province: pick_province,
                pick_district: pick_district,
                pick_ward: pick_ward,
                pick_address: pick_address,
                province: province,
                district: district,
                ward: ward,
                address: address,
                weight: weight, // đơn vị gam
                value: value, // giá trị đơn hàng để tính bảo hiểm
                transport: 'road',
                deliver_option: 'none',
                // tags: [1, 7],
            };
            const { data } = await axios.post(url, data1, config);
            if (data) {
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json('lỗi', error);
        }
    }),
);
// tạo đơn hàng mới
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
                        name: 'sách',
                        weight: 0.1,
                        quantity: 1,
                        product_code: 1242,
                    },
                    {
                        name: 'vở',
                        weight: 0.2,
                        quantity: 1,
                        product_code: 1255,
                    },
                ],
                order: {
                    id: 'a5',
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
                res.status(201).json(data);
            }
        } catch (error) {
            res.status(500).json('lỗi', error);
        }
    }),
);

// lấy thông tin đơn hàng theo id
GHTK_Router.get(
    '/get_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            // const data1 = 'S22223996.SG01-A26.1250011557';
            const data1 = 'S22223996.SG01-A26.1000020635';

            const url = `${apiBase}/services/shipment/v2/${data1}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.get(url, config);
            if (data) {
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json('lỗi', error);
        }
    }),
);

// hủy đơn hàng theo id
GHTK_Router.get(
    '/cancel_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const data1 = 'S22223996.SG01-A26.1000020635';
            const url = `${apiBase}/services/shipment/cancel/${data1}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
                },
            };
            const { data } = await axios.post(url, config);
            console.log('data = ', data);

            if (data) {
                console.log('data if = ', data);
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json('lỗi', error);
        }
    }),
);
// lấy nhãn của đơn hàng, sẽ trả về 1 file pdf
GHTK_Router.post(
    '/get_label_order_by_id',
    asyncHandler(async (req, res) => {
        try {
            const { id_Ghtk } = req.body;
            const url = `${apiBase}/services/label/${id_Ghtk}`;
            // ===================================================
            const headers = {
                Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
            };
            fetch(url, { headers })
                .then((response) => response.blob())
                .then((blob) => {
                    console.log('blob = ', blob);
                    const filename = 'file.pdf';
                    const contentType = 'application/pdf';
                    res.setHeader('Content-Type', contentType);
                    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                    // res.send(blob);
                    res.status(200).send(blob);
                })
                .catch((error) => {
                    console.error('Lỗi:', error);
                });
            // ===================================================
            // const config = {
            //     // 'Content-Type': 'application/json',
            //     headers: {
            //         Token: 'dfdb4cb9647b5130ea49d5216fda3c60f9a712cd',
            //     },
            // };
            // const { data } = await axios.get(url, config);

            // if (data) {
            //     res.status(200).send(data);
            //     // fs.writeFile('file.pdf', data, 'binary', function (err) {
            //     //     if (err) throw err;
            //     //     console.log('Tệp PDF đã được lưu vào đĩa mềm.');
            //     // });
            //     // res.writeHead(200, {
            //     //     'Content-Type': 'application/pdf',
            //     //     'Content-Disposition': 'attachment; filename=file.pdf',
            //     //     'Content-Length': data.length,
            //     // });
            //     // res.end(new Buffer.from(data, 'binary'));
            // }
        } catch (error) {
            res.status(500).json(error);
        }
    }),
);
export default GHTK_Router;

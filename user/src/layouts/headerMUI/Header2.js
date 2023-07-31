// import { Box, Button } from '@mui/material';
// import axios from 'axios';
// import { useEffect, useLayoutEffect, useState, useRef } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import pdfjsLib from 'pdfjs-dist';
// import pdfFile from './sample.pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// export default function Header2() {
//     // dự kiến thời gian giao hàng
//     const GetDeliveriime = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             };
//             const { data } = await axios.post(
//                 `/api/ghtk/get_deliver_time`,
//                 {
//                     pick_province: 'Thành phố Hồ Chí Minh',
//                     pick_district: 'Quận Gò Vấp',
//                     pick_ward: 'Phường 05',
//                     pick_address: '566/191 Nguyễn Thái Sơn',
//                     province: 'Thành phố Hồ Chí Minh',
//                     district: 'Quận 10',
//                     ward: 'Phường 08',
//                     address: 'thôn 7 đường quang trung',
//                 },
//                 config,
//             );
//             console.log('data nhận được = ', data);
//         } catch (error) {
//             console.log('error = ', error);
//         }
//     };
//     // hủy đơn hàng
//     const checkDataAPI = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             };
//             // const { data } = await axios.get(`/api/ghtk/get_fee_ship`, config);
//             const { data } = await axios.get(`/api/ghtk/cancel_order_by_id`, config);
//             console.log('data nhận được = ', data);
//         } catch (error) {
//             console.log('error = ', error);
//         }
//     };
//     // lấy thông tin đơn hàng
//     const checkDataAPI1 = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             };
//             const { data } = await axios.get(`/api/ghtk/get_order_by_id`, config);
//             console.log('data nhận được = ', data);
//         } catch (error) {
//             console.log('error = ', error);
//         }
//     };
//     return (
//         <div className="flex">
//             <div className="m-auto">
//                 <h1>hello anh chị em</h1>
//                 <Button
//                     variant="contained"
//                     sx={{
//                         background: 'red',
//                     }}
//                     className=" m-4 block w-full bg-red-500"
//                     onClick={checkDataAPI}
//                 >
//                     Hủy đơn hàng
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{
//                         background: 'blue',
//                     }}
//                     className=" m-4 block w-full bg-blue-600"
//                     onClick={checkDataAPI1}
//                 >
//                     Lấy thông tin đơn hàng
//                 </Button>
//                 <Button
//                     variant="contained"
//                     sx={{
//                         background: 'blue',
//                     }}
//                     className=" m-4 block w-full bg-blue-600"
//                     onClick={GetDeliveriime}
//                 >
//                     Dự kiến time giao hàng
//                 </Button>
//             </div>
//         </div>
//     );
// }
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
const renderTitle = (title) => (
    <span>
        {title}
        <a
            style={{
                float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
            more
        </a>
    </span>
);
const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});
const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: renderTitle('Articles'),
        options: [renderItem('AntDesign design language', 100000)],
    },
];
const Header2 = () => (
    <div className="m-auto flex">
        <div className="m-auto">
            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                options={options}
                onChange={(e) => {
                    console.log('e.target.value = ', e);
                }}
            >
                <Input size="large" placeholder="input here" />
            </AutoComplete>
        </div>
    </div>
);
export default Header2;

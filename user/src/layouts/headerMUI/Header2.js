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
import { useRef, useEffect } from 'react';
import ModalMain from '~/components/Modal/ModalMain';
function Header2() {
    const modalChildRef = useRef();
    console.log('modalChildRef = ', modalChildRef);
    const content = {
        title: 'nội dung',
        child: (
            <div className="flex justify-center ">
                <div>
                    <h1>nội dung chính</h1>
                    <p>chào anh chị em</p>
                    <button
                        onClick={() => {
                            console.log('hello anh chị em');
                        }}
                        className="bg-red-400 px-8 py-2 text-white"
                    >
                        click show
                    </button>
                </div>
            </div>
        ),
    };

    return (
        <>
            <button className="bg-red-400 px-8 py-2 text-white" onClick={modalChildRef.current?.openModal}>
                open modal
            </button>
            <ModalMain content={content} ref={modalChildRef} />
        </>
    );
}

export default Header2;

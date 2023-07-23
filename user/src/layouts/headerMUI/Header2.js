import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
export default function Header2() {
    // hủy đơn hàng
    const checkDataAPI = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            // const { data } = await axios.get(`/api/ghtk/get_fee_ship`, config);
            const { data } = await axios.get(`/api/ghtk/cancel_order_by_id`, config);
            console.log('data nhận được = ', data);
        } catch (error) {
            console.log('error = ', error);
        }
    };
    // lấy thông tin đơn hàng
    const checkDataAPI1 = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get(`/api/ghtk/get_order_by_id`, config);
            console.log('data nhận được = ', data);
        } catch (error) {
            console.log('error = ', error);
        }
    };
    // ====================================================
    const [url, setUrl] = useState(null);
    const [avatar, setAvatar] = useState();
    const handleImageChange = (e) => {
        let file = e.target.files[0];
        console.log('file = ', file);
        console.log('event.target.result = ', e.target.result);
        let reader = new FileReader();
        reader.onload = function (event) {
            setAvatar(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    // =========================================
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        setPageNumber((prevPageNumber) => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1);
    }

    function changePageNext() {
        changePage(+1);
    }
    return (
        <div>
            <div>
                {/* <header className="App-header">
                    <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                        <Page height="600" pageNumber={pageNumber} />
                    </Document>
                    <p>
                        {' '}
                        Page {pageNumber} of {numPages}
                    </p>
                    {pageNumber > 1 && <button onClick={changePageBack}>Previous Page</button>}
                    {pageNumber < numPages && <button onClick={changePageNext}>Next Page</button>}
                </header>
                <center>
                    <div>
                        <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
                    </div>
                </center> */}
            </div>
            <div>
                <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </div>
    );
}

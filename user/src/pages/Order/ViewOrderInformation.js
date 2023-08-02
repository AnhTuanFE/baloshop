// import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { getLabelOrderGHTKAction } from '~/redux/Actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function ViewOrderInformation({ id_Ghtk }) {
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // =======================================================================
    // =======================================================================

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // const getData = async () => {
    //     const { data } = await axios.post(`/api/ghtk/get_label_order_by_id`, { id_Ghtk });
    //     console.log('data axios = ', data);
    //     setData(data);
    // };
    const getData = async () => {
        const url = `/api/ghtk/get_label_order_by_id`;
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify({ id_Ghtk });

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body,
        });

        const blob = await response.blob();
        console.log('blob = ', blob);
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = 'file.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };
    useEffect(() => {
        if (data) {
            // let file = new Blob([data], { type: 'application/pdf' });
            // const url = URL.createObjectURL(file);
            // setPdfFile(url);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'file.pdf';
            // a.click();
        } else {
            return;
        }
        return () => {
            // URL.revokeObjectURL(url);
        };
    }, [data]);

    console.log('typeOf data = ', typeof data);

    return (
        <div className="block w-full">
            {/* {pdfFile ? (
                <div>
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            ) : (
                <div>ko có data</div>
            )} */}
            <button className="bg-orange-400 px-3 py-4 text-fuchsia-50" onClick={getData}>
                get data
            </button>
        </div>
    );
    // =======================
    // const { isLoading, error, data } = useQuery(['getLabelOrderById', id_Ghtk], async () => {
    //     const response = await axios.post(`/api/ghtk/get_label_order_by_id`, { id_Ghtk });
    //     return response.data;
    // });
    // if (isLoading) return 'Loading...';
    // if (error) return `An error has occurred: ${error.message}`;
    // return <>{data && <div>{JSON.stringify(data, null, 2)}</div>}</>;
}

export default ViewOrderInformation;

// import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

function ViewOrderInformation({ id_Ghtk }) {
    const [data1, setData1] = useState(null);
    const [filepdf, setFilepdf] = useState(null);
    const [Url, setUrl] = useState();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    // =======================================

    // =======================================

    const getData = async () => {
        const { data } = await axios.post(`/api/ghtk/get_label_order_by_id`, { id_Ghtk });
        setData1(data);
    };
    // useEffect(() => {
    //     const pdfBlob = new Blob([data1], { type: 'application/pdf' });
    //     const pdfUrl = URL.createObjectURL(pdfBlob);
    //     setUrl(pdfUrl);

    //     return () => {
    //         URL.revokeObjectURL(pdfUrl);
    //     };
    // }, [data1]);

    // const blob = new Blob([dulieu], { type: 'application/pdf' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'file.pdf';
    // a.click();
    // URL.revokeObjectURL(url);
    // ========================================

    return (
        <div className="block h-96">
            <div>
                <Document file="/ngoc4.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
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

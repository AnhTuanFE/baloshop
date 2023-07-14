import { useEffect, useState } from 'react';
// react query
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Document, Page, Text } from 'react-pdf';

function ViewOrderInformation({ id_Ghtk }) {
    const [pdfData, setPdfData] = useState(null);
    const [data1, setData1] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.post(`/api/ghtk/get_label_order_by_id`, { id_Ghtk });
            setData1(data);
        };
        getData();
    }, []);
    useEffect(() => {
        console.log('data1 = ', data1);
        const pdfBlob = new Blob([data1], { type: 'application/pdf' });
        console.log('pdfBlob = ', pdfBlob);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        console.log('pdfUrl = ', pdfUrl);
        setUrl(pdfUrl);
    }, [data1]);
    console.log('url = ', url);

    return (
        <div className="h-96">
            {/* {data1 && <div>{JSON.stringify(data1, null, 2)}</div>} */}
            <h2>hello</h2>
            {url && (
                <>
                    <Document file={url}>
                        <Page pageNumber={1} />
                    </Document>
                </>
            )}
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

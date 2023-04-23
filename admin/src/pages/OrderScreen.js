import { useParams } from 'react-router-dom';

import OrderMain from '~/components/orders/OrderMain';

const OrderScreen = () => {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const status = params.status;
    return (
        <>
            <OrderMain keyword={keyword} status={status} pageNumber={pageNumber} />
        </>
    );
};

export default OrderScreen;

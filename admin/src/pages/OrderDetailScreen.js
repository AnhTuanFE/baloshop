import { useParams } from 'react-router-dom';

import OrderDetailmain from '~/components/orders/OrderDetailmain';

const OrderDetailScreen = () => {
    const params = useParams();
    const orderId = params.id;
    return (
        <>
            <OrderDetailmain orderId={orderId} />
        </>
    );
};

export default OrderDetailScreen;

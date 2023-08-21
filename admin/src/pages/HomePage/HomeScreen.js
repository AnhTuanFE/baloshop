import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '~/Redux/Actions/ProductActions';
import { getOrderCompleteAll, listOrders } from '~/Redux/Actions/OrderActions';
import { listUser } from '~/Redux/Actions/userActions';

import TopTotal from '~/components/Home/TopTotal';
import ListOrderStatistics from '~/components/Home/ListOrderStatistics';
import TotalPriceStatistics from '~/components/Home/TotalPriceStatistics';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const orderListComplete = useSelector((state) => state.orderListComplete);
    const { orders } = orderListComplete;

    const productList = useSelector((state) => state.productList);
    const { countProducts } = productList;

    const userList = useSelector((state) => state.userList);
    const { users } = userList;

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listOrders());
        dispatch(listUser());
        dispatch(getOrderCompleteAll());
    }, []);

    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title fw-bold text-lg"> Trang chủ </h2>
                </div>
                <TopTotal orders={orders} countProducts={countProducts} countUsers={users ? users.length : 0} />

                <div className="row">
                    <ListOrderStatistics />
                    <TotalPriceStatistics />
                </div>
            </section>
        </>
    );
};

export default HomeScreen;

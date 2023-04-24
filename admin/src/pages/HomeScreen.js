import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '~/Redux/Actions/ProductActions';
import { getOrderCompleteAll, listOrders } from '~/Redux/Actions/OrderActions';
import { listUser } from '~/Redux/Actions/userActions';

import TopTotal from '~/components/Home/TopTotal';
import SaleStatistics from '~/components/Home/SalesStatistics';
import NewsStatistics from '~/components/Home/NewsStatistics';
import ProductStatistics from '~/components/Home/ProductStatistics';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const orderListComplete = useSelector((state) => state.orderListComplete);
    const { orders: AllOrders } = orderListComplete;
    const productList = useSelector((state) => state.productList);
    const { countProducts } = productList;
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listProducts());
        dispatch(listOrders());
        dispatch(listUser());
        dispatch(getOrderCompleteAll());
    }, [dispatch]);
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Trang chủ </h2>
                </div>
                <TopTotal orders={AllOrders} countProducts={countProducts} countUsers={users ? users.length : 0} />

                <div className="row">
                    <SaleStatistics />
                    <ProductStatistics />
                    <NewsStatistics />
                </div>
            </section>
        </>
    );
};

export default HomeScreen;

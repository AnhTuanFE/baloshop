import { useEffect } from 'react';
import TopTotal from './TopTotal';
import SaleStatistics from './SalesStatistics';
import NewsStatistics from './NewsStatistics';
import ProductStatistics from './ProductStatistics';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '~/Redux/Actions/ProductActions';
import { getOrderCompleteAll } from '~/Redux/Actions/OrderActions';

const Main = () => {
    const dispatch = useDispatch();
    const orderListComplete = useSelector((state) => state.orderListComplete);
    const { orders: AllOrders } = orderListComplete;
    const productList = useSelector((state) => state.productList);
    const { countProducts } = productList;
    const userList = useSelector((state) => state.userList);
    const { users } = userList;
    useEffect(() => {
        dispatch(listProducts());
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

export default Main;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '~/Redux/Actions/ProductActions';
import { getOrderCompleteAll } from '~/Redux/Actions/OrderActions';
import { listUser } from '~/Redux/Actions/userActions';
// , listOrders
import TopTotal from '~/components/Home/TopTotal';
import ListOrderStatistics from '~/components/Home/ListOrderStatistics';
import TotalPriceStatistics from '~/components/Home/TotalPriceStatistics';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const orderListComplete = useSelector((state) => state.orderListComplete);
    const { data } = orderListComplete;
    // orderList
    const productList = useSelector((state) => state.productList);
    const { total } = productList;

    const userList = useSelector((state) => state.userList);
    const { users } = userList;

    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;

    useEffect(() => {
        if (userInfo) {
            dispatch(listProducts({ category: '', keyword: '', pageNumber: '', limit: '' }));
            dispatch(listUser());
            dispatch(getOrderCompleteAll());
        }
    }, []);

    return (
        <>
            <section className="content-main">
                <div className="content-header mb-1">
                    <h3 className="content-title fw-bold "> Trang chủ </h3>
                </div>
                <TopTotal dataOrders={data} countProducts={total} countUsers={users ? users.length : 0} />

                <div className="row">
                    <ListOrderStatistics />
                    <TotalPriceStatistics />
                </div>
            </section>
        </>
    );
};

export default HomeScreen;

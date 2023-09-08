import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar_Profile from '../Profile/profileComponent/sideBar_profile/SideBar_Profile';
import HistoryOrdersBought from './HistoryOrdersBought/HistoryOrdersBought';
import { listMyOrders } from '~/redux/Actions/OrderActions';
function PurchaseHistory() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch]);
    return (
        <>
            <div className="mt-lg-3 bg-white max-sm:pt-4 sm:pt-10">
                <div className="row col-lg-12">
                    <div className="col-lg-3">
                        <SideBar_Profile userInfo={userInfo} />
                    </div>
                    <div className="col-lg-9">
                        <HistoryOrdersBought orders={orders} loading={loading} error={error} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseHistory;

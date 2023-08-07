import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar_Profile from '../Profile/profileComponent/sideBar_profile/SideBar_Profile';
import HistoryOrdersBought from './HistoryOrdersBought/HistoryOrdersBought';
import { listMyOrders } from '~/redux/Actions/OrderActions';
import './PurchaseHistory.css';
function PurchaseHistory() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;

    //get image
    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch]);

    return (
        <>
            <div className="mt-lg-5 mt-3">
                <div className="flex justify-between">
                    <div className="ml-12 flex-[1]">
                        <SideBar_Profile userInfo={userInfo} />
                    </div>
                    <div className="ml-10 flex-[2]">
                        <div className="col-lg-8 pt-lg-0 pb-5 pt-3">
                            <HistoryOrdersBought orders={orders} loading={loading} error={error} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseHistory;

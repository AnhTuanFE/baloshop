import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar_Profile from '../Profile/profileComponent/sideBar_profile/SideBar_Profile';
import Orders from '~/components/profileComponents/Orders';
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
            <div className="container mt-lg-5 mt-3">
                <div className="row align-items-start">
                    <SideBar_Profile userInfo={userInfo} />
                    <div className='flex-[2] m-auto w-full'>
                        <div class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-profile"
                                role="tabpanel"
                                aria-labelledby="v-pills-profile-tab"
                            >
                                <Orders orders={orders} loading={loading} error={error} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseHistory;

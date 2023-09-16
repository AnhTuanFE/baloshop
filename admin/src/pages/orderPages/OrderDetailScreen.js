import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { getOrderDetails } from '~/Redux/Actions/OrderActions';

import OrderDetailInfo from '~/components/orders/OrderDetailInfo';
import OrderDetailProducts from '~/components/orders/OrderDetailProducts';

import { toast } from 'react-toastify';
import Toast from '~/components/LoadingError/Toast';

import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import { UPDATE_STATUS_ORDER_ADMIN_RESET } from '~/Redux/Constants/OrderConstants';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const OrderDetailScreen = () => {
    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;
    const stateUpdateOrder = useSelector((state) => state.stateUpdateStatusOrderAdmin);
    const { loading: loadingUpdateState, success, data } = stateUpdateOrder;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        if (success) {
            toast.success('Cập nhập đơn hàng thành công', ToastObjects);
            dispatch({ type: UPDATE_STATUS_ORDER_ADMIN_RESET });
        }
    }, [orderId, success]);
    return (
        <section className="content-main">
            <Toast />
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/orders" className="btn btn-danger">
                        Quay lại
                    </Link>
                </div>
                {/* <div className="col-lg-3 col-md-3">
                    <select className="form-select">
                        <>
                            <option value={''}>Trạng thái...</option>
                            <option value={'confirm'}>Xác nhận</option>
                            <option value={'delivery'}>Giao hàng</option>
                            <option value={'delivered'}>Đã giao</option>
                            <option value={'received'}>Đã nhận và thanh toán</option>
                            <option value={'cancel'}>Hủy đơn hàng</option>
                        </>
                    </select>
                </div> */}
            </div>
            {loadingUpdateState && <Loading />}
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div className="card">
                    <header className="card-header Header-white p-3">
                        <div className="row align-items-center ">
                            <div className="col-lg-6 col-md-6">
                                <span>
                                    <i className="far fa-calendar-alt mx-2"></i>
                                    <b className="text-black">
                                        {moment(order?.order.createdAt).hours()}
                                        {':'}
                                        {moment(order?.order.createdAt).minutes() < 10
                                            ? `0${moment(order?.order.createdAt).minutes()}`
                                            : moment(order?.order.createdAt).minutes()}{' '}
                                        {moment(order?.order.createdAt).format('DD/MM/YYYY')}{' '}
                                    </b>
                                </span>
                                <br />
                                <small className="mx-3 text-black ">
                                    <b>ID Đơn hàng: </b>
                                    {order?.order._id}
                                </small>
                            </div>
                        </div>
                    </header>
                    <div className="card-body">
                        <OrderDetailInfo order={order} />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <OrderDetailProducts order={order} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderDetailScreen;

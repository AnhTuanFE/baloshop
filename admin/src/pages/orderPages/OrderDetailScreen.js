import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import {
    cancelOrder,
    deliverOrder,
    getOrderDetails,
    paidOrder,
    waitConfirmationOrder,
    completeAdminOrder,
    updateStatusOrderAction,
} from '~/Redux/Actions/OrderActions';

import OrderDetailInfo from '~/components/orders/OrderDetailInfo';
import OrderDetailProducts from '~/components/orders/OrderDetailProducts';

import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import ConfirmModal from '~/components/Modal/ConfirmModal';

const OrderDetailScreen = () => {
    const params = useParams();
    const orderId = params.id;
    const dispatch = useDispatch();

    const [status, setStatus] = useState('');

    // modal
    const [statusOrder, setStatusOrder] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;
    const orderwaitGetConfirmation = useSelector((state) => state.orderwaitGetConfirmation);
    const { success: successwaitGetConfirmation } = orderwaitGetConfirmation;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { loading: loadingPaid, success: successPaid } = orderPaid;
    const orderGetcompleteAdmin = useSelector((state) => state.orderGetcompleteAdmin);
    const { success: successCompleteAdmin } = orderGetcompleteAdmin;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [
        dispatch,
        orderId,
        successDelivered,
        successPaid,
        successCancel,
        successwaitGetConfirmation,
        successCompleteAdmin,
    ]);
    console.log('statusOrder = ', statusOrder);
    const hanldehidden = () => {
        setStatusOrder(false);
    };
    const cancelOrderHandler1 = () => {
        dispatch(cancelOrder(order));
    };

    const handleUpdateStatusOrder = () => {
        const data = {
            id: orderId,
            status: status,
        };
        dispatch(updateStatusOrderAction(data));
        setStatusOrder(false);
    };
    return (
        <section className="content-main">
            <div>
                {statusOrder && (
                    <ConfirmModal
                        Title="Cập nhật trạng thái"
                        Body="Bạn có chắc chắn cập nhật trạng thái cho đơn hàng này không?"
                        HandleSubmit={handleUpdateStatusOrder}
                        Close="modal"
                        hidenModal={hanldehidden}
                    />
                )}
            </div>
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/orders" className="btn btn-dark text-white">
                        Quay lại
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3">
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setStatusOrder(true);
                        }}
                    >
                        <>
                            <option value={''}>Trạng thái...</option>
                            <option value={'confirm'}>Xác nhận</option>
                            <option value={'delivery'}>Giao hàng</option>
                            <option value={'delivered'}>Đã giao</option>
                            <option value={'received'}>Đã nhận và thanh toán</option>
                            {/* user */}
                            <option value={'cancel'}>Hủy đơn hàng</option>
                        </>
                    </select>
                </div>
            </div>

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
                                        {moment(order?.createdAt).hours()}
                                        {':'}
                                        {moment(order?.createdAt).minutes() < 10
                                            ? `0${moment(order?.createdAt).minutes()}`
                                            : moment(order?.createdAt).minutes()}{' '}
                                        {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                    </b>
                                </span>
                                <br />
                                <small className="mx-3 text-black ">ID Đơn hàng: {order._id}</small>
                            </div>
                            {order?.cancel !== 1 && order?.waitConfirmation !== true ? (
                                <div className="col-lg-3 col-md-6 d-flex justify-content-end align-items-center ms-auto">
                                    <button
                                        // onClick={cancelOrderHandler}
                                        className="btn btn-dark col-12"
                                        style={{ marginBottom: '15px' }}
                                        disabled={order?.waitConfirmation}
                                    >
                                        Hủy đơn hàng này
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </header>
                    <div className="card-body">
                        {/* Order info */}
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

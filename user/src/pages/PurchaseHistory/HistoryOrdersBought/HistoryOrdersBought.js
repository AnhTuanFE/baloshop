import moment from 'moment';
import { Link } from 'react-router-dom';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';

const HistoryOrdersBought = (props) => {
    const { loading, error, orders } = props;
    const checkPay = (order) => {
        const itemProducts = order.orderItems;
        let productReview = itemProducts?.some((item) => item.productReview?.length !== 0);
        return <>{productReview ? 'Chưa đánh giá' : 'Đã đánh giá'}</>;
    };

    return (
        <div>
            <div className="flex flex-col">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {orders.length === 0 ? (
                            <div className="mx-3">
                                <div className="col-12 alert alert-info  mt-3 flex justify-center bg-[var(--blue-color)] text-center">
                                    <div className="">
                                        <div className="mb-2 text-lg">
                                            <p className="">Không có đơn hàng nào</p>
                                        </div>
                                        <Link
                                            className="btn mx-2 bg-[var(--main-color)] px-3 py-2 text-sm font-bold text-white hover:bg-[var(--main-color-hover)]"
                                            to="/"
                                        >
                                            BẮT ĐẦU MUA SẮM
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* style={{ overflowX: 'scroll' }} */}
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="fw-normal fs-6">STT</th>
                                                <th className="fw-normal fs-6">ID</th>
                                                <th className="fw-normal fs-6">Trạng thái</th>
                                                <th className="fw-normal fs-6">Thời gian mua</th>
                                                <th className="fw-normal fs-6">Tổng tiền</th>
                                                <th className="fw-normal fs-6">Thanh toán</th>
                                                <th className="fw-normal fs-6">Đánh giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr
                                                    className={`${
                                                        order.isPaid ? 'alert-success' : 'alert-color-white'
                                                    }`}
                                                    key={order._id}
                                                >
                                                    <td>
                                                        <p>{index + 1}</p>
                                                    </td>
                                                    <td>
                                                        <Link to={`/order/${order._id}`} className="text-[#1976d2]">
                                                            {order._id}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {order?.cancel !== 1 ? (
                                                            order?.waitConfirmation &&
                                                            order?.isDelivered &&
                                                            order?.isPaid &&
                                                            order?.completeUser &&
                                                            order?.completeAdmin ? (
                                                                <span className="fs-6 font-semibold text-success">
                                                                    Hoàn tất
                                                                </span>
                                                            ) : order?.waitConfirmation &&
                                                              order?.isDelivered &&
                                                              order?.isPaid ? (
                                                                <span className="fs-6 font-semibold text-success">
                                                                    Đã thanh toán
                                                                </span>
                                                            ) : order?.waitConfirmation && order?.isDelivered ? (
                                                                <span className="fs-6 font-semibold text-warning">
                                                                    Đang giao
                                                                </span>
                                                            ) : order?.waitConfirmation ? (
                                                                <span className="fs-6 font-semibold text-warning">
                                                                    Đã xác nhận
                                                                </span>
                                                            ) : (
                                                                <span className="fs-6 font-semibold text-warning">
                                                                    Chờ xác nhận
                                                                </span>
                                                            )
                                                        ) : (
                                                            <span className="fs-6 font-semibold text-red-600">
                                                                Đơn này đã bị hủy
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="fs-6 ">
                                                        {moment(order.createdAt).hours()}
                                                        {':'}
                                                        {moment(order.createdAt).minutes() < 10
                                                            ? `0${moment(order.createdAt).minutes()}`
                                                            : moment(order.createdAt).minutes()}{' '}
                                                        {moment(order.createdAt).format('MM/DD/YYYY')}
                                                    </td>
                                                    <td className="font-semibold">
                                                        {order.totalPrice.toLocaleString('de-DE')}đ
                                                    </td>
                                                    <td className="">{order.paymentMethod}</td>
                                                    <td className="fs-6 font-semibold">{checkPay(order)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HistoryOrdersBought;

import moment from 'moment';
import { Link } from 'react-router-dom';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { handleChangePayMethod, handleChangeStateOrder } from '~/hooks/HandleChangeMethod';

const HistoryOrdersBought = (props) => {
    const { loading, error, orders } = props;
    const checkReview = (orderItems, id) => {
        let productReview = orderItems?.some((item) => item.isAbleToReview);
        // có thể đánh giá nếu true là chưa đánh giá, là false thì không được đánh giá
        return (
            <>
                {productReview ? (
                    <Link to={`/order/${id}`}>
                        <div className=" cursor-pointer text-center text-[#1976d2] hover:text-[var(--main-color)]">
                            Đánh giá sản phẩm
                        </div>
                    </Link>
                ) : (
                    ''
                )}
            </>
        );
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
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                            className="font-semibold text-[#1976d2]"
                                                        >
                                                            {order._id}
                                                        </Link>
                                                    </td>
                                                    <td className="text-center">
                                                        {handleChangeStateOrder(order.status)}
                                                    </td>
                                                    <td className="fs-6 text-center ">
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
                                                    <td className="text-center">
                                                        {handleChangePayMethod(order?.paymentMethod)}
                                                    </td>
                                                    <td className="fs-6 font-semibold">
                                                        {checkReview(order.orderItems, order._id)}
                                                    </td>
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

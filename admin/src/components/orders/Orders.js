import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { listOrders } from '~/Redux/Actions/OrderActions';
import { useSelector, useDispatch } from 'react-redux';
import PaginatorOrder from './PaginatorOrder';
import { handleChangePayMethod, handleChangeStateOrder } from '~/useHooks/HandleChangeMethod';
const Orders = (props) => {
    const { keyword, status, pageNumber } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;
    const [kewywordSearch, setKewywordSearch] = useState('');
    useEffect(() => {
        const limit = 10;
        dispatch(listOrders({ keyword: keyword, status: status, pageNumber: pageNumber, limit: limit }));
    }, [dispatch, status, keyword, pageNumber]);

    const handleStatus = (e) => {
        if (keyword) {
            navigate(`/orders/search/${keyword}/status/${e.target.value}`);
        } else {
            if (e.target.value == '') {
                navigate(`/orders`);
            } else {
                navigate(`/orders/status/${e.target.value}`);
            }
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (kewywordSearch.trim() && kewywordSearch) {
            navigate(`/orders/search/${kewywordSearch}`);
        } else {
            navigate(`/orders`);
        }
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <>
                    <div
                        style={{
                            marginBottom: '12px',
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div className="col-lg-2 col-3 col-md-3 ms-2">
                            <form onSubmit={handleSearch}>
                                <div className="input-group" style={{ alignItems: 'center' }}>
                                    <input
                                        type="search"
                                        placeholder="Tìm kiếm..."
                                        className="form-control p-2"
                                        onChange={(e) => {
                                            setKewywordSearch(e.target.value);
                                        }}
                                    />
                                    <button className="btn btn-light bg" type="submit" style={{ height: '42px' }}>
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 d-flex col-6 col-md-6 justify-content-center me-4 ">
                            <div className="d-flex flex-column justify-content-center w-full">
                                <div className="font-semibold ">Trạng thái : </div>
                            </div>
                            <select className="form-select w-full" value={status} onChange={handleStatus}>
                                <option value={''}>Tất cả...</option>
                                <option value={'placed'}>Chờ xác nhận</option>
                                <option value={'confirm'}>Đã xác nhận</option>
                                <option value={'delivering'}>Đang giao</option>
                                <option value={'delivered'}>Đã giao</option>
                                <option value={'unpaid'}>Chưa thanh toán</option>
                                <option value={'paid'}>Đã thanh toán</option>
                                <option value={'completed'}>Đã hoàn tất</option>
                                <option value={'cancelled'}>Đã hủy đơn</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className="overflow-auto"
                        style={{ height: '61vh', boxShadow: '0px 0px 8px 2px rgba(0,0,0,0.24) inset' }}
                    >
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Thanh toán bằng</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Thanh toán</th>
                                    <th scope="col">Thời gian mua</th>
                                    <th>Trạng thái</th>
                                    <th scope="col" className="text-end">
                                        Quản lý
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <div>
                                                <b>{order.name}</b>
                                                <div>{order.user}</div>
                                            </div>
                                        </td>
                                        <td>{handleChangePayMethod(order.paymentMethod)}</td>
                                        <td>{Number(order?.totalPrice)?.toLocaleString('de-DE')}đ</td>
                                        <td>
                                            <span className="">
                                                {order?.payment?.paid ? (
                                                    <div className="badge alert-success">
                                                        <div>Đã thanh toán</div>
                                                        <span className="">
                                                            {moment(order?.createdAt).hours()}
                                                            {':'}
                                                            {moment(order.payment?.createdAt).minutes() < 10
                                                                ? `0${moment(order?.createdAt).minutes()}`
                                                                : moment(order.payment?.createdAt).minutes()}{' '}
                                                            {moment(order.payment?.createdAt).format('DD/MM/YYYY')}{' '}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="badge alert-danger">Chờ thanh toán</span>
                                                )}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge alert-warning">
                                                {moment(order?.createdAt).hours()}
                                                {':'}
                                                {moment(order?.createdAt).minutes() < 10
                                                    ? `0${moment(order?.createdAt).minutes()}`
                                                    : moment(order?.createdAt).minutes()}{' '}
                                                {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                            </span>
                                        </td>
                                        <td>{handleChangeStateOrder(order)}</td>
                                        <td className="d-flex justify-content-end align-item-center">
                                            <Link to={`/order/${order._id}`} className="text-success">
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginatorOrder
                        pages={pages}
                        page={page}
                        status={status ? status : ''}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

export default Orders;

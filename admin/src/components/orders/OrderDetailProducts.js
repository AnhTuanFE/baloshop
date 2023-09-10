import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ConfirmModal from '../Modal/ConfirmModal';
import { updateStatusOrderAdminAction } from '~/Redux/Actions/OrderActions';

const OrderDetailProducts = (props) => {
    const { order, loading } = props;
    const dispatch = useDispatch();
    const [statusModal, setStatusModal] = useState(false);
    const [status, setStatus] = useState('');

    const handleHidden = () => {
        setStatusModal(false);
    };
    const handleUpdateStatusOrder = () => {
        const data = {
            id: order?.order._id,
            status: status,
        };
        dispatch(updateStatusOrderAdminAction(data));
        setStatusModal(false);
    };
    const handleSetStatusAndShowModal = (statusDep) => {
        setStatus(statusDep);
        setStatusModal(true);
    };
    return (
        <div>
            <div>
                {statusModal && (
                    <ConfirmModal
                        Title="Cập nhật trạng thái"
                        Body="Bạn có chắc chắn cập nhật trạng thái cho đơn hàng này không?"
                        HandleSubmit={handleUpdateStatusOrder}
                        Close="modal"
                        hidenModal={handleHidden}
                    />
                )}
            </div>
            <table className="table-lg table border">
                <thead>
                    <tr>
                        <th style={{ width: '35%' }}>Sản phẩm</th>
                        <th style={{ width: '15%' }}>Màu sắc</th>
                        <th style={{ width: '15%' }}>Đơn giá</th>
                        <th style={{ width: '15%' }}>Số lượng</th>
                        <th style={{ width: '20%' }} className="">
                            Giá tiền
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order.order?.orderItems?.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link className="itemside" to="#">
                                    <div className="left">
                                        <img
                                            src={`${item?.image}`}
                                            alt={item.name}
                                            style={{ width: '40px', height: '40px' }}
                                            className="img-xs"
                                        />
                                    </div>
                                    <div className="info">{item.name}</div>
                                </Link>
                            </td>
                            <td>{item?.color}</td>
                            <td>{item?.price?.toLocaleString('de-DE')}đ </td>
                            <td>{item.quantity} </td>
                            <td> {(item.quantity * item.price)?.toLocaleString('de-DE')}đ</td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="6">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column justify-content-center  text-center ">
                                    <div>
                                        <b>Thanh toán : </b>
                                        <div>
                                            {order?.order.payment.paid ? (
                                                <div
                                                    style={{
                                                        fontSize: '16px',
                                                        marginTop: '6px',
                                                    }}
                                                    className="badge alert-success"
                                                >
                                                    Đã thanh toán
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        fontSize: '16px',
                                                        marginTop: '6px',
                                                    }}
                                                    className="badge alert-warning"
                                                >
                                                    Chưa thanh toán
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <article className="">
                                    <dl className="dlist">
                                        <dt className="fs-6" style={{ fontWeight: '600' }}>
                                            Tổng tiền:
                                        </dt>{' '}
                                        <dd className="fs-6" style={{ fontWeight: '600' }}>
                                            {Number(order?.order.totalProductPrice)?.toLocaleString('de-DE')}đ
                                        </dd>
                                    </dl>
                                    <dl className="dlist">
                                        <dt className="fs-6" style={{ fontWeight: '600' }}>
                                            Phí ship:
                                        </dt>{' '}
                                        <dd className="fs-6" style={{ fontWeight: '600' }}>
                                            {Number(order?.order.shippingPrice)?.toLocaleString('de-DE')}đ
                                        </dd>
                                    </dl>
                                    <dl className="dlist">
                                        <dt className="fs-6" style={{ fontWeight: '600' }}>
                                            Tổng cộng:
                                        </dt>
                                        <dd className="fs-5" style={{ fontWeight: '600' }}>
                                            {Number(order?.order.totalPrice)?.toLocaleString('de-DE')}đ
                                        </dd>
                                    </dl>
                                    <dl className="dlist">
                                        <dt className="text-muted fs-6" style={{ fontWeight: '600' }}>
                                            Trạng thái:
                                        </dt>
                                        <dd>
                                            <>
                                                {order.order?.status == 'placed' && (
                                                    <span className="badge alert-danger">Chờ xác nhận</span>
                                                )}
                                                {order.order?.status == 'confirm' && (
                                                    <span className="badge alert-danger">Đã xác nhận</span>
                                                )}
                                                {order.order?.status == 'delivering' && (
                                                    <span className="badge alert-warning">Đang giao</span>
                                                )}
                                                {order.order?.status == 'paid' && (
                                                    <span className="badge alert-success">Đã thanh toán</span>
                                                )}
                                                {order.order?.status == 'delivered' && (
                                                    <span className="badge alert-success">Đã giao</span>
                                                )}
                                                {order.order?.status == 'completed' && (
                                                    <span className="badge alert-success">Đã hoàn thành</span>
                                                )}
                                                {order.order?.status == 'cancelled' && (
                                                    <span className="badge bg-dark">Đơn hàng bị hủy</span>
                                                )}
                                                {/* <span className="badge alert-success">{order.order?.status}</span> */}
                                            </>
                                        </dd>
                                    </dl>
                                </article>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="">
                {order.order?.status == 'placed' && (
                    <button
                        value={'confirm'}
                        onClick={(e) => {
                            handleSetStatusAndShowModal(e.target.value);
                        }}
                        className="btn btn-success w-full"
                    >
                        Xác nhận đơn hàng
                    </button>
                )}
                {order.order?.status == 'confirm' && (
                    <button
                        value={'delivery'}
                        onClick={(e) => {
                            handleSetStatusAndShowModal(e.target.value);
                        }}
                        className="btn btn-success w-full"
                    >
                        Xác nhận giao hàng
                    </button>
                )}
                {order.order?.status == 'delivering' && (
                    <button
                        value={'delivered'}
                        onClick={(e) => {
                            handleSetStatusAndShowModal(e.target.value);
                        }}
                        style={{
                            color: '#ffff',
                        }}
                        className="btn bg-warning w-full"
                    >
                        Xác nhận đã giao và thanh toán
                    </button>
                )}

                {order.order?.status == 'delivered' && (
                    <button
                        style={{
                            cursor: 'default',
                        }}
                        // value={'received'}
                        // onClick={(e) => {
                        //     handleSetStatusAndShowModal(e.target.value);
                        // }}
                        className="btn btn-success  w-full opacity-75 "
                    >
                        Đơn hàng đã giao
                    </button>
                )}
                {order.order?.status == 'completed' && (
                    <button
                        style={{
                            cursor: 'default',
                        }}
                        className="btn btn-success  w-full opacity-75 "
                    >
                        Đơn hàng đã hoàn tất
                    </button>
                )}
                {order.order?.status == 'cancelled' && (
                    <button
                        style={{
                            cursor: 'default',
                        }}
                        className="btn btn-dark  w-full opacity-75 "
                    >
                        Đơn hàng đã bị hủy
                    </button>
                )}
                {(order?.order.status == 'placed' ||
                    order?.order.status == 'confirm' ||
                    order?.order.status == 'delivering' ||
                    order?.order.status == 'paid') && (
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            value={'cancel'}
                            onClick={(e) => {
                                handleSetStatusAndShowModal(e.target.value);
                            }}
                            className="btn btn-dark mt-2  w-full p-2 "
                            style={{ marginBottom: '15px' }}
                        >
                            Hủy đơn hàng này
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailProducts;

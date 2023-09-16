import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ConfirmModal from '../Modal/ConfirmModal';
import { updateStatusOrderAdminAction } from '~/Redux/Actions/OrderActions';
import { handleChangeStateOrder } from '~/useHooks/HandleChangeMethod';
import {
    HandleChangeButtonSetStatusOrder,
    HandleChangeButtonCancelOrder,
} from '~/useHooks/HandleChangeButtonSetStatusOrder';

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
                                            <>{handleChangeStateOrder(order?.order)}</>
                                        </dd>
                                    </dl>
                                </article>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="">
                {HandleChangeButtonSetStatusOrder(order?.order, handleSetStatusAndShowModal)}
                {HandleChangeButtonCancelOrder(order?.order, handleSetStatusAndShowModal)}
            </div>
        </div>
    );
};

export default OrderDetailProducts;

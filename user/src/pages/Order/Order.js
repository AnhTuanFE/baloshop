import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'primereact/rating';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { notification } from 'antd';
import {
    cancelOrder,
    getOrderDetails,
    createOrderReview,
    orderGetItemOrder,
    completeOrder,
    returnAmountProduct,
} from '~/redux/Actions/OrderActions';
import { createProductReview } from '~/redux/Actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/redux/Constants/ProductConstants';
import {
    ORDER_CREATE_REVIEW_RESET,
    ORDER_COMPLETE_USER_RESET,
    ORDER_CANCEL_RESET,
} from '~/redux/Constants/OrderConstants';
import { ORDER_PAY_RESET } from '~/redux/Constants/OrderConstants';
import { listCart } from '~/redux/Actions/cartActions';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Steppers from './custom_stepper_MUI/Steppers';
import DisabledByDefaultSharpIcon from '@mui/icons-material/DisabledByDefaultSharp';
import InfoPayer from './InfoPayer';
import ViewOrderInformation from './ViewOrderInformation';
import { Modal } from 'antd';
import './Order.css';

function Order() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const params = useParams();
    const orderId = params.id;

    const [productId, setProductId] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState('');
    const [bulean, setBulean] = useState(false);
    const [orderItemId, setOrderItemId] = useState('');
    const [screenInformationOrder, setScreenInformationOrder] = useState(false);
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderGetItemRetult = useSelector((state) => state.orderGetItemRetult);
    const { itemOrder } = orderGetItemRetult;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel, error: errorCancel } = orderCancel;
    const reviews = useSelector((state) => state.productReviewCreate);
    const { success: successReview, error: errorReview } = reviews;
    const orderGetComplete = useSelector((state) => state.orderGetComplete);
    const { success: successComplete } = orderGetComplete;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        setProductId('');
        setRating('');
        setComment('');
        setBulean('');
    }, [bulean]);
    const cancelOrderHandler = () => {
        if (window.confirm('Bạn có đồng ý hủy đơn hàng không?')) {
            dispatch(cancelOrder(order));
            dispatch(returnAmountProduct(order.orderItems));
        }
    };

    useEffect(() => {
        if (errorCancel === 'account lock up') {
            dispatch({ type: ORDER_CANCEL_RESET });
            openNotification('top', 'Tài khoản của bạn đã bị khóa', 'error');
        }
    }, [errorCancel]);

    //gọi thêm userLogin để lấy số điện thoại
    const orderCreateReviewsRetult = useSelector((state) => state.orderCreateReviewsRetult);
    const { success: successReviewOrder, orderReview } = orderCreateReviewsRetult;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (orderId) {
            dispatch(listCart());
        }
        dispatch(orderGetItemOrder(orderId));
    }, [orderId, successReviewOrder]);
    useEffect(() => {
        if (successReviewOrder) {
            dispatch({ type: ORDER_CREATE_REVIEW_RESET });
        }
        if (successComplete) {
            dispatch({ type: ORDER_COMPLETE_USER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [successReviewOrder, successComplete]);

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(0);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [successCancel]);
    useEffect(() => {
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, order]);

    const handlerSuccessCart = () => {
        const filterCart = itemOrder.filter((item) => item.productReview.length === 0);
        if (filterCart.length === 0) {
            if (window.confirm('Cảm ơn bạn đã mua hàng chúc bạn một ngày tốt lành!')) {
                dispatch(completeOrder(orderId));
            }
        } else {
            if (window.confirm('Bạn cần đánh giá hết sản phẩm để hoàn tất đơn hàng')) {
            }
        }
    };
    // ==========================================
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className="mx-32 mb-20">
                    {contextHolder}

                    {loadingCancel && <Loading />}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <>
                            <InfoPayer order={order} />
                            <Steppers order={order} />
                            <div className="flex justify-around">
                                <div className="mr-5 flex-[3]">
                                    {order.orderItems.length === 0 ? (
                                        <Message variant="alert-info mt-5">Đơn đặt hàng của bạn trống</Message>
                                    ) : (
                                        <>
                                            {order.orderItems.map((item, index) => (
                                                <div
                                                    className="flex justify-around rounded p-4 "
                                                    style={{
                                                        border: '1px solid #dad8d8',
                                                    }}
                                                    key={index}
                                                >
                                                    <div
                                                        // className={
                                                        //     order?.isPaid && itemOrder[index].productReview.length === 0
                                                        //         ? 'col-md-1 col-4'
                                                        //         : 'col-md-2 col-6'
                                                        // }
                                                        className="h-32 w-32"
                                                    >
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div
                                                        // className={
                                                        //     order?.isPaid && itemOrder[index].productReview.length === 0
                                                        //         ? 'col-md-3 col-4 d-flex align-items-center'
                                                        //         : 'col-md-4 col-6 d-flex align-items-center'
                                                        // }
                                                        className="m-auto text-center"
                                                    >
                                                        <Link to={`/products/${item.product}`}>
                                                            <h6 className="text-base font-semibold">{item.name}</h6>
                                                        </Link>
                                                    </div>
                                                    <div className="m-auto text-center">
                                                        <h4 className="text-base font-semibold">Phân loại hàng</h4>
                                                        <h6>{item?.color}</h6>
                                                    </div>
                                                    <div className="m-auto text-center">
                                                        <h4 className="text-base font-semibold">Số lượng</h4>
                                                        <h6>{item.qty}</h6>
                                                    </div>
                                                    <div className="m-auto text-center">
                                                        <h4 className="text-base font-semibold">Tổng tiền</h4>
                                                        <h6>{(item.qty * item.price)?.toLocaleString('de-DE')}đ</h6>
                                                    </div>
                                                    {order?.isPaid && itemOrder[index].productReview.length === 0 && (
                                                        <div className="m-auto text-center">
                                                            <h4 className="text-base font-semibold">Đánh giá</h4>
                                                            <i
                                                                class="fal fa-comment-edit fs-4"
                                                                style={{ cursor: 'pointer' }}
                                                                type="submit"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop"
                                                                onClick={() => {
                                                                    setProduct(item);
                                                                    setProductId(item.product);
                                                                    setOrderItemId(item._id);
                                                                }}
                                                            ></i>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                {/* =================================================================================================== */}
                                {/* <div className="col-lg-3 d-flex align-items-end flex-column subtotal-order"> */}
                                <div className=" flex-[1] items-center">
                                    <table className="table-bordered table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Sản phẩm:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.itemsPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Phí vận chuyển:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.shippingPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Tổng tiền:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.totalPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {order?.cancel === 1 && (
                                        <div className="bg-dark col-12 fs-6 rounded-md p-2 text-center text-white">
                                            Đơn hàng này đã bị hủy bỏ
                                        </div>
                                    )}
                                    <div className="m-2 cursor-pointer rounded-md bg-[#fe6233] py-2 text-center text-fuchsia-50 ">
                                        <button onClick={showModal}>Xem chi tiết đơn hàng</button>
                                        <Modal title="Title" open={open} onOk={handleOk} onCancel={handleCancel}>
                                            <ViewOrderInformation id_Ghtk={order?.label_id_GiaoHangTK} />
                                        </Modal>
                                    </div>
                                    {order?.isPaid && order?.completeUser !== true && (
                                        <div className="">
                                            <div className="">
                                                <button
                                                    className=" bg-success mb-2 w-full cursor-pointer rounded-lg px-1 py-3 text-lg font-semibold uppercase text-white"
                                                    onClick={handlerSuccessCart}
                                                >
                                                    Hoàn tất đơn hàng
                                                </button>
                                                <a
                                                    className="mt-3  cursor-pointer rounded-lg bg-red-600 py-2 text-center text-white"
                                                    href="https://m.me/balostore.owner"
                                                >
                                                    <button className="w-full text-lg font-semibold uppercase">
                                                        Trả hàng
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {!order?.waitConfirmation && (
                                        <div className="pt-4">
                                            <button
                                                onClick={cancelOrderHandler}
                                                className="w-full cursor-pointer rounded-lg bg-red-600 py-3 text-lg font-semibold uppercase text-white"
                                                disabled={order?.isPaid || order?.cancel == 1}
                                            >
                                                HỦY ĐƠN HÀNG NÀY
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* ====================================================================================================== */}
                            {/* MODAL */}
                            <div>
                                <div
                                    class="modal fade"
                                    id="staticBackdrop"
                                    data-bs-backdrop="static"
                                    data-bs-keyboard="false"
                                    tabindex="-1"
                                    aria-labelledby="staticBackdropLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header" style={{ padding: '0.5rem 1rem' }}>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => {
                                                        setBulean(true);
                                                    }}
                                                >
                                                    <DisabledByDefaultSharpIcon
                                                        fontSize="medium"
                                                        className="text-red-600"
                                                    />
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div>
                                                    <h6 className="write-review text-center text-xl font-semibold">
                                                        Đánh giá sản phẩm
                                                    </h6>
                                                    <div className="my-4">
                                                        {errorReview && (
                                                            <Message variant="alert-danger text-center fs-6">
                                                                {errorReview}
                                                            </Message>
                                                        )}
                                                        {successReview && (
                                                            <Message variant="alert-primary text-center fs-6">
                                                                Cảm ơn bạn đã đánh giá
                                                            </Message>
                                                        )}
                                                    </div>

                                                    <form>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <img
                                                                src={`${product?.image}`}
                                                                className="m-auto h-32 w-32 items-center"
                                                                alt="hình ảnh"
                                                            ></img>
                                                            <p style={{ fontSize: '16px' }}>{product?.name}</p>
                                                            <div
                                                                style={{
                                                                    fontSize: '16px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <p style={{ paddingRight: '5px' }}>
                                                                    Giá:{' '}
                                                                    {Number(product?.price)?.toLocaleString('de-DE')}
                                                                    <span style={{ fontSize: '14px' }}>đ</span>
                                                                </p>

                                                                <p style={{ paddingLeft: '5px' }}>
                                                                    Màu: {product?.color}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <Rating
                                                                    value={rating}
                                                                    className="my-2 flex justify-center"
                                                                    onChange={(e) => setRating(e.value)}
                                                                    stars={5}
                                                                    cancel={false}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="my-4">
                                                            <p
                                                                style={{
                                                                    textAlign: 'center',
                                                                    fontSize: '17px',
                                                                    fontWeight: '600',
                                                                }}
                                                            >
                                                                Nội dung
                                                            </p>
                                                            <textarea
                                                                row="3"
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                className="col-12 mt-2 rounded border-0 p-3"
                                                                style={{
                                                                    backgroundColor: '#e9eaed80',
                                                                    fontSize: '14px',
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                        <div className="my-3">
                                                            <button
                                                                className="col-12 bg-orange rounded border-0 p-3 text-white"
                                                                type="button"
                                                                data-bs-dismiss={
                                                                    successReviewOrder === true ? 'modal' : ''
                                                                }
                                                                style={{ backgroundColor: 'var(--main-color)' }}
                                                                onClick={() => {
                                                                    dispatch(
                                                                        createProductReview(
                                                                            productId,
                                                                            rating,
                                                                            product.color,
                                                                            comment,
                                                                            order.name,
                                                                        ),
                                                                        setRating(''),
                                                                        setComment(''),
                                                                    );
                                                                    dispatch(
                                                                        createOrderReview(
                                                                            orderId,
                                                                            orderItemId,
                                                                            rating,
                                                                            comment,
                                                                            order.name,
                                                                        ),
                                                                        setRating(''),
                                                                        setComment(''),
                                                                    );
                                                                }}
                                                            >
                                                                <p>Gửi đánh giá</p>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Order;

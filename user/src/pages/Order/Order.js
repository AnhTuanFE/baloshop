import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'primereact/rating';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
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
import CustomizedSteppers from './custom_stepper_MUI/CustomizedSteppers';
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
    return (
        <>
            <div className="container">
                {contextHolder}

                {loadingCancel && <Loading />}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="content-header"></div>
                        <div
                            className="row  order-detail"
                            style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                        >
                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-lg-2 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i class="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-sm-9 mb-lg-9 fix-display">
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Họ tên:</span> {order.name}
                                        </p>
                                        <p>
                                            {' '}
                                            <span style={{ fontWeight: '600' }}>Số điện thoại:</span> {order.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div
                                    className="row"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                                >
                                    <div className="col-lg-2 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-sm-9 mb-lg-9">
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Địa chỉ:</span>{' '}
                                            {`${order.shippingAddress.city}, ${order.shippingAddress.distric}, ${order.shippingAddress.ward}, ${order.shippingAddress.address}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* 3 */}

                            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-lg-2 col-sm-3 mb-lg-3 center fix-bottom">
                                        <div className="alert-success order-box fix-none">
                                            <i class="fab fa-paypal"></i>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-sm-9 mb-lg-9">
                                        <p>
                                            <p>
                                                <span style={{ fontWeight: '600' }}>Phương thức:</span>{' '}
                                                {order.paymentMethod}
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomizedSteppers order={order} />
                        <div className="row order-products justify-content-between" style={{ marginBottom: '30px' }}>
                            <div className="col-lg-9 fix-padding cart-scroll">
                                {order.orderItems.length === 0 ? (
                                    <Message variant="alert-info mt-5">Đơn đặt hàng của bạn trống</Message>
                                ) : (
                                    <>
                                        {order.orderItems.map((item, index) => (
                                            <div
                                                className="order-product row"
                                                style={{ border: '1px solid #dad8d8', borderRadius: '4px' }}
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        order?.isPaid && itemOrder[index].productReview.length === 0
                                                            ? 'col-md-1 col-4'
                                                            : 'col-md-2 col-6'
                                                    }
                                                >
                                                    <img
                                                        src={item.image}
                                                        // src={`/productImage/${item.image}`}
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        order?.isPaid && itemOrder[index].productReview.length === 0
                                                            ? 'col-md-3 col-4 d-flex align-items-center'
                                                            : 'col-md-4 col-6 d-flex align-items-center'
                                                    }
                                                >
                                                    <Link to={`/products/${item.product}`}>
                                                        <h6 style={{ fontSize: '16px' }}>{item.name}</h6>
                                                    </Link>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-4  d-flex align-items-center flex-column justify-content-center ">
                                                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>
                                                        Phân loại hàng
                                                    </h4>
                                                    <h6>{item?.color}</h6>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-4  d-flex align-items-center flex-column justify-content-center ">
                                                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Số lượng</h4>
                                                    <h6>{item.qty}</h6>
                                                </div>
                                                <div className="mt-3 mt-md-0 col-md-2 col-4 align-items-center  d-flex flex-column justify-content-center ">
                                                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Tổng tiền</h4>
                                                    <h6>{(item.qty * item.price)?.toLocaleString('de-DE')}đ</h6>
                                                </div>
                                                {order?.isPaid && itemOrder[index].productReview.length === 0 && (
                                                    <div className="mt-3 mt-md-0 col-md-2 col-4 align-items-center  d-flex flex-column justify-content-center ">
                                                        <h4 style={{ fontWeight: '600', fontSize: '16px' }}>
                                                            Đánh giá
                                                        </h4>
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
                            {/* total */}
                            <div className="col-lg-3 d-flex align-items-end flex-column subtotal-order">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong className="fs-6">Sản phẩm:</strong>
                                            </td>
                                            <td className="fs-6">
                                                {Number(order?.itemsPrice)?.toLocaleString('de-DE')}đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="fs-6">Phí vận chuyển:</strong>
                                            </td>
                                            <td className="fs-6">
                                                {Number(order?.shippingPrice)?.toLocaleString('de-DE')}đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="fs-6">Tổng tiền:</strong>
                                            </td>
                                            <td className="fs-6">
                                                {Number(order?.totalPrice)?.toLocaleString('de-DE')}đ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    // !order.isPaid && (
                                    //   <div className="col-12">
                                    //     {loadingPay && <Loading />}
                                    //     <span>Đang chờ giao hàng</span>
                                    //     {

                                    //     /* {!sdkReady ? (
                                    //       <Loading />
                                    //     ) : (
                                    //       <PayPalButton
                                    //         amount={order.totalPrice}
                                    //         onSuccess={successPaymentHandler}
                                    //       />
                                    //     )} */}
                                    //   </div>
                                    // )

                                    order?.cancel === 1 && (
                                        <div className="text-white bg-dark p-2 col-12 fs-6 text-center">
                                            Đơn hàng này đã bị hủy bỏ
                                        </div>
                                    )
                                }
                                {order?.isPaid && order?.completeUser !== true && (
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="row">
                                            <button
                                                className="col-12 col-sm-12 col-md-12 col-lg-12 bg-success button-hover-cart"
                                                style={{
                                                    textTransform: ' capitalize',
                                                    marginBottom: '5px',
                                                    borderRadius: '4px',
                                                    fontSize: '17px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={handlerSuccessCart}
                                            >
                                                Hoàn tất đơn hàng
                                            </button>
                                            <a
                                                className="col-12 col-sm-12 col-md-12 col-lg-12 button-hover-cart"
                                                href="https://m.me/balostore.owner"
                                                style={{ padding: '0px 0px' }}
                                            >
                                                <button className="btn_return">Trả hàng</button>
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {!order?.waitConfirmation && (
                                    <div className="col-lg-12 " style={{ paddingTop: '25px' }}>
                                        <button
                                            onClick={cancelOrderHandler}
                                            className="btn btn-dark col-12"
                                            style={{ marginBottom: '15px' }}
                                            disabled={order?.isPaid || order?.cancel == 1}
                                        >
                                            HỦY ĐƠN HÀNG NÀY
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-12 product-rating">
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
                                            ></button>
                                        </div>
                                        <div class="modal-body">
                                            <div>
                                                <h6 className="write-review text-center" style={{ fontSize: '20px' }}>
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
                                                            // src={`/productImage/${product?.image}`}
                                                            src={`${product?.image}`}
                                                            style={{ height: '120px', width: '120px' }}
                                                            alt=""
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
                                                                Giá: {Number(product?.price)?.toLocaleString('de-DE')}
                                                                <span style={{ fontSize: '14px' }}>đ</span>
                                                            </p>

                                                            <p style={{ paddingLeft: '5px' }}>Màu: {product?.color}</p>
                                                        </div>
                                                        <div className="rating-reviews">
                                                            <Rating
                                                                value={rating}
                                                                style={{ color: 'yellow' }}
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
                                                            className="col-12 p-3 mt-2 border-0 rounded"
                                                            style={{ backgroundColor: '#e9eaed80', fontSize: '14px' }}
                                                        ></textarea>
                                                    </div>
                                                    <div className="my-3">
                                                        <button
                                                            className="col-12 bg-orange border-0 p-3 rounded text-white"
                                                            type="button"
                                                            data-bs-dismiss={successReviewOrder === true ? 'modal' : ''}
                                                            style={{ backgroundColor: '#00483d' }}
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
        </>
    );
}

export default Order;

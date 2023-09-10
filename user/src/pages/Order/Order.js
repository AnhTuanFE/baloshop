import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button, notification } from 'antd';
import { getOrderDetails, createOrderReview, updateStatusOrderUserAction } from '~/redux/Actions/OrderActions';
import { createProductReview } from '~/redux/Actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '~/redux/Constants/ProductConstants';
import {
    ORDER_CREATE_REVIEW_RESET,
    ORDER_PAY_RESET,
    UPDATE_STATUS_ORDER_USER_RESET,
} from '~/redux/Constants/OrderConstants';
import { listCart } from '~/redux/Actions/cartActions';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import Steppers from './custom_stepper_MUI/Steppers';
import InfoPayer from './InfoPayer';
import ModalDaiSyUI from '~/components/Modal/ModalDaiSyUI';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';

const labels = {
    1: 'Không hài lòng',
    2: 'Tạm được',
    3: 'Hài lòng',
    4: 'Tốt',
    5: 'Rất tốt',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
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

    const { stateUpdateStatusOrderUser } = useSelector(ordersRemainingSelector);
    const { loading: loadingUpdateOrder, success: successUpdateOrder } = stateUpdateStatusOrderUser;
    const [productId, setProductId] = useState('');
    // ======================
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);
    // ======================
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState('');
    const [bulean, setBulean] = useState(false);
    const [orderItemId, setOrderItemId] = useState('');
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const reviews = useSelector((state) => state.productReviewCreate);
    const { success: successReview, error: errorReview } = reviews;
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        setProductId('');
        setRating('');
        setComment('');
        setBulean('');
    }, [bulean]);

    const cancelOrderHandler = () => {
        dispatch(updateStatusOrderUserAction({ id: order?.order?._id, status: 'cancel' }));
    };

    const orderCreateReviewsRetult = useSelector((state) => state.orderCreateReviewsRetult);
    const { success: successReviewOrder, orderReview } = orderCreateReviewsRetult;

    useEffect(() => {
        if (orderId) {
            dispatch(listCart());
        }
    }, [orderId, successReviewOrder]);
    useEffect(() => {
        if (successReviewOrder) {
            dispatch({ type: ORDER_CREATE_REVIEW_RESET });
            return;
        }
    }, [successReviewOrder]);

    useEffect(() => {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(orderId));
        if (successUpdateOrder) {
            dispatch({ type: UPDATE_STATUS_ORDER_USER_RESET });
        }
    }, [orderId, successUpdateOrder]);

    const handleUpdateStatusOrder = () => {
        dispatch(updateStatusOrderUserAction({ id: order?.order?._id, status: 'received' }));
    };
    return (
        <>
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className="mx-10 pb-10">
                    {contextHolder}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <>
                            <InfoPayer order={order?.order} />
                            <Steppers order={order?.order} />
                            <div className="flex justify-around rounded bg-white px-4 pb-10 pt-3">
                                <div className="mr-5 flex-[3]">
                                    {order?.order.orderItems?.length === 0 ? (
                                        <Message variant="alert-info mt-5">Đơn đặt hàng của bạn trống</Message>
                                    ) : (
                                        <>
                                            {order?.order.orderItems?.map((item, index) => (
                                                <div
                                                    className="mb-2 flex justify-around rounded px-4"
                                                    style={{
                                                        border: '1px solid #dad8d8',
                                                    }}
                                                    key={index}
                                                >
                                                    <div className="h-[100px] w-[100px]">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className="m-auto text-center">
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
                                                        <h6>{item.quantity}</h6>
                                                    </div>
                                                    <div className="m-auto text-center">
                                                        <h4 className="text-base font-semibold">Tổng tiền</h4>
                                                        <h6>
                                                            {(item.quantity * item.price)?.toLocaleString('de-DE')}đ
                                                        </h6>
                                                    </div>
                                                    {item.isAbleToReview && (
                                                        <div className="m-auto text-center">
                                                            <Button
                                                                type="default"
                                                                className="bg-[var(--main-color2)] text-base font-semibold text-white"
                                                                onClick={() => {
                                                                    setProduct(item);
                                                                    setProductId(item.product);
                                                                    setOrderItemId(item._id);
                                                                    window.my_modal_2.showModal();
                                                                }}
                                                            >
                                                                Đánh giá
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className=" flex-[1] items-center">
                                    <table className="table-bordered table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Sản phẩm:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.order.totalProductPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Phí vận chuyển:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.order.shippingPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="text-base">Tổng tiền:</strong>
                                                </td>
                                                <td className="text-base">
                                                    {Number(order?.order.totalPrice)?.toLocaleString('de-DE')}đ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {order?.order.status == 'delivered' && (
                                        <div className="">
                                            <div className="">
                                                <button
                                                    value={'received'}
                                                    className=" btn mb-2 w-full cursor-pointer rounded-lg bg-success px-1 py-2 text-base font-semibold uppercase text-white hover:opacity-[0.9]"
                                                    onClick={() => window.my_modal_3.showModal()}
                                                >
                                                    Hoàn tất đơn hàng
                                                </button>
                                                <a
                                                    className="mt-3 cursor-pointer rounded-lg bg-red-600 py-2 text-center text-white hover:opacity-[0.9]"
                                                    onClick={() => window.my_modal_4.showModal()}
                                                >
                                                    <button className="w-full text-lg font-semibold uppercase">
                                                        Trả hàng
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {order?.order.status == 'placed' && (
                                        <div className="mx-2 pt-2">
                                            <button
                                                onClick={() => window.my_modal_1.showModal()}
                                                className=" w-full cursor-pointer rounded-lg bg-red-600 py-1 text-sm font-semibold uppercase text-white"
                                            >
                                                HỦY ĐƠN HÀNG
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* ====================================================================================================== */}
                            {/* MODAL */}
                            <>
                                <ModalDaiSyUI
                                    Title="Hủy đơn hàng"
                                    Body="Bạn xác nhận hủy đơn hàng này?"
                                    HandleSubmit={cancelOrderHandler}
                                />
                                <div>
                                    <dialog
                                        id="my_modal_3"
                                        className="col-lg-5 modal modal-top m-auto mt-5 w-[400px] rounded-lg"
                                    >
                                        <form method="dialog" className="modal-box">
                                            <div className="rounded-md text-center">
                                                <h3 className="text-lg font-bold">Hoàn tất đơn hàng!</h3>
                                            </div>
                                            <p className="py-4">Bạn đã nhận được hàng và thanh toán</p>
                                            <div className="modal-action">
                                                <button className="btn">Hủy</button>
                                                <button
                                                    className="btn bg-[var(--main-color2)] text-white"
                                                    onClick={handleUpdateStatusOrder}
                                                >
                                                    Đồng ý
                                                </button>
                                            </div>
                                        </form>
                                    </dialog>
                                </div>
                                <div>
                                    <dialog
                                        id="my_modal_4"
                                        className="col-lg-5 modal modal-top m-auto mt-5 w-[400px] rounded-lg"
                                    >
                                        <form method="dialog" className="modal-box">
                                            <div className="rounded-md text-center">
                                                <h3 className="text-lg font-bold">Trả hàng!</h3>
                                            </div>
                                            <p className="py-4">Bạn cần liên hệ với shop để yêu cầu trả hàng</p>
                                            <div className="modal-action">
                                                <button className="btn">Hủy</button>
                                                <button
                                                    className="btn bg-[var(--main-color2)] text-white"
                                                    onClick={() => {
                                                        window.location.href = `https://m.me/balostore.owner`;
                                                    }}
                                                >
                                                    Đồng ý
                                                </button>
                                            </div>
                                        </form>
                                    </dialog>
                                </div>
                                <dialog id="my_modal_2" className="modal">
                                    <form method="dialog" className="modal-box">
                                        <h3 className="text-center text-lg font-bold">Đánh giá sản phẩm!</h3>
                                        <div className="my-4">
                                            {errorReview && (
                                                <Message variant="alert-danger text-center fs-6">{errorReview}</Message>
                                            )}
                                            {successReview && (
                                                <Message variant="alert-primary text-center fs-6">
                                                    Cảm ơn bạn đã đánh giá
                                                </Message>
                                            )}
                                        </div>
                                        <form>
                                            <div>
                                                <img
                                                    src={`${product?.image}`}
                                                    className="m-auto h-32 w-32 items-center"
                                                    alt="hình ảnh"
                                                ></img>
                                                <p className="text-center">{product?.name}</p>
                                                <div className="flex justify-center text-base">
                                                    <p className="pr-1">
                                                        Giá: {Number(product?.price)?.toLocaleString('de-DE')}đ
                                                    </p>
                                                    <p className="pr-1">Màu: {product?.color}</p>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Box>
                                                        <Rating
                                                            name="hover-feedback"
                                                            value={rating}
                                                            size="large"
                                                            getLabelText={getLabelText}
                                                            onChange={(event, newValue) => {
                                                                setRating(newValue);
                                                            }}
                                                            onChangeActive={(event, newHover) => {
                                                                setHover(newHover);
                                                            }}
                                                            emptyIcon={
                                                                <StarIcon
                                                                    style={{ opacity: 0.55 }}
                                                                    fontSize="inherit"
                                                                />
                                                            }
                                                        />
                                                        <div className="min-h-[40px]">
                                                            {rating !== null && (
                                                                <Box className="text-center">
                                                                    {labels[hover !== -1 ? hover : rating]}
                                                                </Box>
                                                            )}
                                                        </div>
                                                    </Box>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <p className="text-center text-lg font-semibold">Nội dung</p>
                                                <textarea
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    className="col-12 mt-2 rounded border-0 bg-[#e9eaed80] p-3 text-sm"
                                                ></textarea>
                                            </div>
                                            <div className="my-3">
                                                <button
                                                    className="col-12 bg-orange rounded border-0 bg-[var(--main-color)] px-3 py-2 text-white"
                                                    type="button"
                                                    data-bs-dismiss={successReviewOrder === true ? 'modal' : ''}
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
                                        <div className="modal-action">
                                            <button className="btn">Đóng</button>
                                        </div>
                                    </form>
                                </dialog>
                            </>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Order;

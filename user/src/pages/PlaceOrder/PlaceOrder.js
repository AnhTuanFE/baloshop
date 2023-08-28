import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, redirect, Navigate } from 'react-router-dom';
import { message, Select } from 'antd';
import { listCart } from '~/redux/Actions/cartActions';
import { createOrder } from '~/redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '~/redux/Constants/OrderConstants';

import ModalDaiSyUI from '~/components/Modal/ModalDaiSyUI';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AddLocationSharpIcon from '@mui/icons-material/AddLocationSharp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';
import { calculate_fee_ship_action } from '~/redux/Actions/OrderActions';
import LoadingLarge from '~/components/LoadingError/LoadingLarge';

function PlaceOrder() {
    const [paymentMethodState, setPaymentMethodState] = useState('payment-with-momo');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const successPlaceholder = () => {
        messageApi.open({
            type: 'success',
            content: 'Đặt hàng thành công',
        });
    };
    const errorPlaceholder = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error, loading } = orderCreate;
    const { order_ghtk_state } = useSelector(ordersRemainingSelector);
    const fee_VC = order_ghtk_state?.data_fee_ship?.fee.fee;
    // =====================================================
    const currenCartItems = cartItems
        .filter((item) => {
            const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
            if (findCart?.countInStock >= item?.qty && item?.isBuy === true) {
                return true;
            }
        })
        .reduce((arr, pro) => {
            arr.push({
                name: pro.product.name,
                color: pro.color,
                qty: pro.qty,
                image: pro.product.image[0].urlImage,
                price: pro.product.price,
                id_product: pro.id_product,
                product: pro.product._id,
            });
            return arr;
        }, []);

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(0);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems
            .filter((item) => {
                const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
                if (findCart?.countInStock >= item?.qty && item?.isBuy === true) {
                    return true;
                }
            })
            .reduce((a, i) => a + i.qty * i.product.price, 0)
            .toFixed(0),
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 0 ? fee_VC : 30000);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(0);

    useEffect(() => {
        if (error) {
            errorPlaceholder('Đặt hàng thất bại, vui lòng thử lại sau');
            dispatch({ type: ORDER_CREATE_RESET });
        }
        if (success) {
            console.log('order = ', order);
            if (order?.newOrder.paymentMethod == 'payment-with-momo') {
                window.location.href = `${order.newOrder.payment.payUrl}`;
                return;
            }
            if (order?.newOrder.paymentMethod == 'payment-with-paypal') {
                navigate(`/placeorder/paymentpaypal/${order?.newOrder?._id}`);
                return;
            } else {
                successPlaceholder();
                dispatch({ type: ORDER_CREATE_RESET });
                navigate(`/order/${order?.newOrder?._id}`);
            }
        }
    }, [error, success]);
    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: currenCartItems,
                shippingAddress: {
                    city: userInfo.city,
                    distric: userInfo.distric,
                    ward: userInfo.ward,
                    address: userInfo.address,
                    postalCode: '',
                },
                paymentMethod: paymentMethodState,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
                phone: userInfo.phone,
                name: userInfo.name,
                email: userInfo.email,
                address_shop: userInfo.address_shop,
            }),
        );
    };

    function findCartCountInStock(item) {
        const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
        return (
            <div className="col-lg-12 row py-2">
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-lg-2">
                        <span className="text-xs text-red-600">
                            Sản phẩm không đủ đáp ứng bạn cần điều chỉnh lại số lượng
                        </span>
                    </div>
                ) : (
                    <div className="col-lg-1"></div>
                )}
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-lg-3">
                        <img className="h-[100px]" src={`${item.product?.image[0]?.urlImage}`} alt={item.name} />
                    </div>
                ) : (
                    <div className="col-lg-2">
                        <img className="h-[100px]" src={`${item.product?.image[0]?.urlImage}`} alt={item.name} />
                    </div>
                )}
                <div className="col-lg-2 flex items-center">
                    <Link to={`/products/${item.product}`}>
                        <h6>{item.product.name}</h6>
                    </Link>
                </div>
                <div className="col-lg-2 mt-3 flex flex-col items-center justify-center ">
                    <h4 className="text-lg font-semibold">Màu sắc</h4>
                    <h6>{item?.color}</h6>
                </div>
                <div className="col-lg-2 mt-3 flex flex-col items-center justify-center ">
                    <h4 className="text-base font-semibold">Số lượng</h4>
                    <h6>{item?.qty}</h6>
                </div>
                <div className="col-lg-2 mt-3 flex flex-col items-end justify-center ">
                    <h4 className="text-base font-semibold">Giá</h4>
                    <h6>{(item?.qty * item?.product?.price)?.toLocaleString('de-DE')}đ</h6>
                </div>
            </div>
        );
    }

    //========================= handle thanh toán paypal =========================
    // chuyển tiền việt thành tiền dollar
    const handleExchangeCurrency = (vnd) => {
        const usd = (vnd / 23000).toFixed(1);
        return usd;
    };
    let moneyNeedPaid = handleExchangeCurrency(cart.totalPrice);
    useLayoutEffect(() => {
        if (cartItems.length === 0) {
            dispatch(listCart());
        }
    }, []);

    useEffect(() => {
        if (cartItems.length != 0 && Object.keys(order_ghtk_state).length === 0) {
            dispatch(
                calculate_fee_ship_action({
                    pick_province: userInfo.address_shop.city,
                    pick_district: userInfo.address_shop.distric,
                    pick_ward: userInfo.address_shop.ward,
                    pick_address: userInfo.address_shop.address,
                    province: userInfo.city,
                    district: userInfo.distric,
                    ward: userInfo.ward,
                    address: userInfo.address,
                    weight: 1000, // đơn vị gam
                    value: cart.totalPrice, // giá trị đơn hàng để tính bảo hiểm
                    transport: 'road',
                    deliver_option: 'none',
                    // tags: [1, 7],
                }),
            );
        }
    }, [cart]);
    const handleChangePayment = (value) => {
        setPaymentMethodState(value);
    };
    return (
        <>
            {error && <Loading />}
            {/* {loading && <Loading />} */}
            {loading && <LoadingLarge content={'Đang tạo đơn hàng'} />}
            {contextHolder}
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className="mx-10 pb-20 ">
                    <div className="m-auto  ">
                        <ModalDaiSyUI
                            Title="Mua hàng"
                            Body="Bạn xác nhận đặt hàng?"
                            HandleSubmit={placeOrderHandler}
                        ></ModalDaiSyUI>

                        <div className=" row mb-2 rounded bg-white px-4 shadow-custom-shadow">
                            <div className="row col-lg-12 my-3 rounded-md pt-3">
                                <div className="col-lg-3 flex px-2">
                                    <div className="mr-2 px-2">
                                        <AccountCircleSharpIcon className="text-[var(--main-color)]" fontSize="large" />
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Họ tên:</span> {userInfo.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Số điện thoại:</span> {userInfo.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-5 flex px-2">
                                    <div className="mr-2 px-2">
                                        <AddLocationSharpIcon className="text-[var(--main-color)]" fontSize="large" />
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Địa chỉ:</span>{' '}
                                            {`${userInfo?.city}, ${userInfo?.distric}, ${userInfo?.ward}, ${userInfo?.address}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 flex px-2">
                                    <div className="mr-2 px-2">
                                        <MonetizationOnIcon className="text-[var(--main-color)]" fontSize="large" />
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Phương thức thanh toán:</span>
                                            <Select
                                                className="w-[212px] [&_.ant-select-selection-item]:font-semibold"
                                                onChange={handleChangePayment}
                                                defaultValue={paymentMethodState}
                                                options={[
                                                    {
                                                        value: 'payment-with-momo',
                                                        label: 'Thanh toán qua momo',
                                                    },
                                                    {
                                                        value: 'payment-with-cash',
                                                        label: 'Thanh toán bằng tiền mặt',
                                                    },
                                                    {
                                                        value: 'payment-with-paypal',
                                                        label: 'Thanh toán qua paypal',
                                                    },
                                                ]}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">Không có sản phẩm nào được chọn</Message>
                        ) : (
                            <>
                                {cart.cartItems
                                    .filter((item) => item.isBuy == true)
                                    .map((item, index) => (
                                        <div className="row rounded bg-white" key={index}>
                                            {findCartCountInStock(item)}
                                        </div>
                                    ))}
                            </>
                        )}
                        <div className="row mt-2 bg-white">
                            <div className="col-lg-12">
                                <table className=" table text-base">
                                    <tbody className="">
                                        <tr>
                                            <td>
                                                <strong>Tiền Sản phẩm</strong>
                                            </td>
                                            <td>{Number(cart?.itemsPrice)?.toLocaleString('de-DE')}đ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Phí vận chuyển</strong>
                                            </td>
                                            <td>{Number(cart?.shippingPrice)?.toLocaleString('de-DE')}đ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Tổng tiền</strong>
                                            </td>
                                            <td className="text-lg font-semibold">
                                                {Number(cart?.totalPrice)?.toLocaleString('de-DE')}đ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-2 bg-white py-4">
                            <div className="">
                                {paymentMethodState == 'payment-with-paypal' ? (
                                    <div className="mb-4 text-center text-xl font-bold uppercase">
                                        Tổng thanh toán: {moneyNeedPaid} USD
                                    </div>
                                ) : (
                                    <div className="mb-3 text-center  text-xl font-bold uppercase">
                                        Tổng thanh toán: {Number(cart.totalPrice)?.toLocaleString('de-DE')} VNĐ
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="m-auto flex justify-center rounded-lg bg-[var(--main-color)] px-16 py-2 text-fuchsia-50 hover:opacity-[0.8]"
                                    onClick={() => window.my_modal_1.showModal()}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaceOrder;

import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { clearFromCart, listCart } from '~/redux/Actions/cartActions';
import { createOrder } from '~/redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '~/redux/Constants/OrderConstants';

import ModalDaiSyUI from '~/components/Modal/ModalDaiSyUI';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AddLocationSharpIcon from '@mui/icons-material/AddLocationSharp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';
import { calculate_fee_ship_action } from '~/redux/Actions/OrderActions';

// import './PlaceOrder.css';

function PlaceOrder() {
    const [paymentPaypal, setPaymentPaypal] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paymentMethods_from_localStorage = localStorage.getItem('paymentMethod');

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
    const { order, success, error } = orderCreate;
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
            successPlaceholder();
            // setTimeout(() => {
            // }, 3000);
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch(clearFromCart(userInfo._id));
            navigate(`/order/${order.ShopOrder._id}`);
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
                paymentMethod: paymentMethods_from_localStorage,
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
            <>
                {findCart?.countInStock < item?.qty && (
                    <div className="col-md-1 col-2">
                        <span className="span" style={{ fontSize: '12px', color: 'red' }}>
                            Sản phẩm không đủ đáp ứng bạn cần điều chỉnh lại số lượng
                        </span>
                    </div>
                )}
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-md-2 col-5">
                        <img src={`${item.product?.image[0]?.urlImage}`} alt={item.name} />
                    </div>
                ) : (
                    <div className="col-md-2 col-6">
                        <img src={`${item.product?.image[0]?.urlImage}`} alt={item.name} />
                    </div>
                )}
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-md-3 col-5 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                            <h6>{item.product.name}</h6>
                        </Link>
                    </div>
                ) : (
                    <div className="col-md-4 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                            <h6>{item.product.name}</h6>
                        </Link>
                    </div>
                )}
                <div className="mt-md-0 col-md-2 col-4 d-flex  align-items-center flex-column justify-content-center mt-3 ">
                    <h4 className="text-lg font-semibold">Màu sắc</h4>
                    <h6>{item?.color}</h6>
                </div>
                <div className="mt-md-0 col-md-2 col-4 d-flex  align-items-center flex-column justify-content-center mt-3 ">
                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Số lượng</h4>
                    <h6>{item?.qty}</h6>
                </div>
                <div className="mt-md-0 col-md-2 col-4 align-items-end d-flex  flex-column justify-content-center mt-3 ">
                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Giá</h4>
                    <h6>{(item?.qty * item?.product?.price)?.toLocaleString('de-DE')}đ</h6>
                </div>
            </>
        );
    }

    //========================= handle thanh toán paypal =========================
    // chuyển tiền việt thành tiền dollar
    const handleExchangeCurrency = (vnd) => {
        const usd = (vnd / 23000).toFixed(1);
        return usd;
    };
    let moneyNeedPaid = handleExchangeCurrency(cart.totalPrice);
    const createOrderPaypal = (data, actions) => {
        // console.log('data create order = ', data);
        // paymentSource: 'paypal
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `${moneyNeedPaid}`,
                    },
                },
            ],
        });
    };

    // Định nghĩa hàm xử lý khi thanh toán được xử lý thành công
    const onApprove = (data, actions) => {
        const { orderID, payerID } = data;
        if (orderID && payerID) {
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
                    paymentMethod: paymentMethods_from_localStorage,
                    paypalOrder: {
                        orderID: orderID,
                        payerID: payerID,
                        cost: Number(moneyNeedPaid),
                    },
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    totalPrice: cart.totalPrice,
                    phone: userInfo.phone,
                    name: userInfo.name,
                    email: userInfo.email,
                    address_shop: userInfo.address_shop,
                }),
            );
        }
        // orderID: '11B73242Y0409550V';
        // payerID: 'JHQ5FY4NNVYSC';

        return actions.order.capture().then(function (details) {
            successPlaceholder();
            // alert('Transaction completed by ' + details.payer.name.given_name);
        });
    };
    // Định nghĩa hàm xử lý khi có lỗi xảy ra trong quá trình thanh toán
    const onError = (err) => {
        errorPlaceholder('Có lỗi xảy ra khi thanh toán, vui lòng thử lại sau');
        // console.log('data err = ', err);
    };
    // Định nghĩa hàm xử lý khi người dùng hủy thanh toán
    const onCancel = (data) => {
        errorPlaceholder('Bạn đã hủy thanh toán, vui lòng hoàn tất thanh toán trong 24h');
        // console.log(' data Cancelled =', data);
    };
    const ID_CLENT = 'Af5R_f2_MvnxLxpFeDO56MRvo6PGOIfXR3c0P9z8wyRGek_Th6JPBU7ktH5kgPpHW0Bb5pw0aasuA2NR';

    // ===================================================
    useLayoutEffect(() => {
        if (cartItems.length === 0) {
            dispatch(listCart());
        }
        if (paymentMethods_from_localStorage == '"Thanh toán qua paypal"') {
            setPaymentPaypal('Thanh toán qua paypal');
        }
        if (paymentMethods_from_localStorage != '"Thanh toán qua paypal"') {
            setPaymentPaypal('Thanh toán bằng tiền mặt');
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
    return (
        <>
            {error && <Loading />}
            {contextHolder}
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className="mx-20 ">
                    <div className="m-auto  ">
                        <ModalDaiSyUI
                            Title="Mua hàng"
                            Body="Bạn xác nhận đặt hàng?"
                            HandleSubmit={placeOrderHandler}
                        ></ModalDaiSyUI>
                        <div className="mb-4 h-32 px-4 shadow-custom-shadow">
                            <div className="my-3 flex items-center justify-around rounded-md pt-3">
                                <div className="flex">
                                    <div className="mr-2 px-2">
                                        <AccountCircleSharpIcon className="" fontSize="large" color="secondary" />
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
                                <div className="flex">
                                    <div className="mr-2 px-2">
                                        <AddLocationSharpIcon className="" fontSize="large" color="secondary" />
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Địa chỉ:</span>{' '}
                                            {`${userInfo?.city}, ${userInfo?.distric}, ${userInfo?.ward}, ${userInfo?.address}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 px-2">
                                        <MonetizationOnIcon className="" fontSize="large" color="secondary" />
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Phương thức:</span>{' '}
                                            {paymentMethods_from_localStorage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row order-products justify-content-between">
                            <div className="col-lg-12 fix-padding cart-scroll">
                                {cart.cartItems.length === 0 ? (
                                    <Message variant="alert-info mt-5">Không có sản phẩm nào được chọn</Message>
                                ) : (
                                    <>
                                        {cart.cartItems
                                            .filter((item) => item.isBuy == true)
                                            .map((item, index) => (
                                                <div className="order-product row" key={index}>
                                                    {findCartCountInStock(item)}
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="row" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                            {/* total */}
                            <div
                                className="col-lg-12 d-flex align-items-end flex-column subtotal-order"
                                style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                            >
                                <table className="fix-bottom table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Sản phẩm</strong>
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
                                            <td>{Number(cart?.totalPrice)?.toLocaleString('de-DE')}đ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{
                                padding: '10px 0',
                                backgroundColor: '#fff',
                                marginTop: '10px',
                                marginBottom: '30px',
                            }}
                        >
                            <div className="">
                                {paymentPaypal == 'Thanh toán qua paypal' ? (
                                    <div className="mb-4 text-center text-xl font-bold uppercase">
                                        Tổng thanh toán: {moneyNeedPaid} USD
                                    </div>
                                ) : (
                                    <div className="mb-4 text-center  text-xl font-bold uppercase">
                                        Tổng thanh toán: {Number(cart.totalPrice)?.toLocaleString('de-DE')} VNĐ
                                    </div>
                                )}

                                {cart.cartItems.length === 0 ? null : paymentPaypal == 'Thanh toán qua paypal' ? (
                                    <div className="m-8 text-center ">
                                        <PayPalScriptProvider
                                            options={{
                                                'client-id': `${ID_CLENT}`,
                                            }}
                                            className=""
                                        >
                                            <PayPalButtons
                                                createOrder={createOrderPaypal}
                                                onApprove={onApprove}
                                                onError={onError}
                                                onCancel={onCancel}
                                                // layout: 'horizontal',
                                                style={{ label: 'pay' }}
                                                className="mx-[22%]"
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="m-auto flex justify-center rounded-lg bg-[var(--main-color)] px-16 py-3 text-fuchsia-50"
                                        onClick={() => window.my_modal_1.showModal()}
                                    >
                                        Đặt hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaceOrder;

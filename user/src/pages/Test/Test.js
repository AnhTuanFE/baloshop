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
import { ordersRemainingSelector } from '~/redux/Selector/ordersSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons';

function Test() {
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
    // console.log('order.newOrder    = ', order?.newOrder?.payment?.payUrl);
    //========================= handle thanh toán paypal =========================
    // chuyển tiền việt thành tiền dollar
    const handleExchangeCurrency = (vnd) => {
        const usd = (vnd / 23000).toFixed(1);
        return usd;
    };
    const createOrderPaypal = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        // value: `${moneyNeedPaid}`,
                        value: 100,
                    },
                },
            ],
        });
    };
    // chấp nhận thanh toán
    const onApprove = (data, actions) => {
        const { orderID, payerID } = data;
        // if (orderID && payerID) {
        //     dispatch(
        //         createOrder({
        //             orderItems: currenCartItems,
        //             shippingAddress: {
        //                 city: userInfo.city,
        //                 distric: userInfo.distric,
        //                 ward: userInfo.ward,
        //                 address: userInfo.address,
        //                 postalCode: '',
        //             },
        //             paymentMethod: paymentMethodState,
        //             paypalOrder: {
        //                 orderID: orderID,
        //                 payerID: payerID,
        //                 cost: Number(moneyNeedPaid),
        //             },
        //             itemsPrice: cart.itemsPrice,
        //             shippingPrice: cart.shippingPrice,
        //             totalPrice: cart.totalPrice,
        //             phone: userInfo.phone,
        //             name: userInfo.name,
        //             email: userInfo.email,
        //             address_shop: userInfo.address_shop,
        //         }),
        //     );
        // }
        return actions.order.capture().then(function (details) {
            // successPlaceholder();
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    };
    // lỗi thanh toán
    const onError = (err) => {
        errorPlaceholder('Có lỗi xảy ra khi thanh toán, vui lòng thử lại sau');
    };
    // hủy thanh toán
    const onCancel = (data) => {
        errorPlaceholder('Bạn đã hủy thanh toán, vui lòng hoàn tất thanh toán trong 24h');
    };
    const ID_CLENT = 'Af5R_f2_MvnxLxpFeDO56MRvo6PGOIfXR3c0P9z8wyRGek_Th6JPBU7ktH5kgPpHW0Bb5pw0aasuA2NR';

    useLayoutEffect(() => {
        if (cartItems.length === 0) {
            dispatch(listCart());
        }
    }, []);

    return (
        <>
            {contextHolder}
            <div className=" bg-[var(--content-color)]">
                <div className="bg-white px-20 py-2 shadow-custom-shadow">
                    <div className="flex">
                        <img className="h-[50px]" src="./images/Paypal_icon_large.png" />
                        <p className="pt-2.5 text-base">Cổng thanh toán Paypal</p>
                    </div>
                </div>
                <div className="mx-14">
                    <div className="row col-lg-12 mt-10 px-10">
                        <div className="col-4 mr-4 ">
                            <div className=" rounded-lg bg-white text-center outline outline-1 outline-gray-500">
                                <div className="px-3 pt-3">
                                    <strong>Thông tin đơn hàng</strong>
                                    <table className=" table text-base">
                                        <tbody className="">
                                            <tr>
                                                <td>
                                                    <p className=" text-gray-400">Nhà cung cấp</p>
                                                    <strong className="flex pt-2">
                                                        <img
                                                            className="h-[30px]"
                                                            src="./images/Paypal_icon_small.png"
                                                        />
                                                        <p>Paypal Payment</p>
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className=" text-gray-400">Mã đơn hàng</p>
                                                    <strong className="flex pt-2">
                                                        <p>64ec2e1c3775d938b27d0571</p>
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className=" text-gray-400">Mô tả</p>
                                                    <strong className="flex pt-2">
                                                        <p>Thanh toán đơn hàng tại Balo Shop</p>
                                                    </strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className=" text-gray-400">Số tiền</p>
                                                    <strong className="flex pt-2">
                                                        <p>510.000đ</p>
                                                    </strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="rounded-md bg-white px-2 pt-2">
                                <div className="rounded-md bg-orange-100 px-4 py-4 text-lg font-medium text-orange-400">
                                    <p>Đơn hàng sẽ hết hạn sau 2 ngày</p>
                                </div>
                                <div className="px-3 pt-2">
                                    <p>
                                        Gặp khó khăn khi thanh toán?{' '}
                                        <span className="cursor-pointer font-semibold text-[var(--blue-color)]">
                                            Xem hướng dẫn
                                        </span>
                                    </p>
                                </div>
                                <div className="py-2 text-center">
                                    <Link to={'/placeorder'}>
                                        <p className=" cursor-pointer text-xl font-semibold text-[var(--main-color)] hover:text-[var(--main-color-hover)]">
                                            Quay về
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 rounded-lg bg-white shadow-custom-shadow">
                            <div className="py-4">
                                <div>
                                    <h1 className=" text-center text-xl font-bold">Chọn phương thức thanh toán</h1>
                                </div>
                                <div className="py-4">
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
                                            style={{ label: 'pay' }}
                                            className="mx-[22%]"
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-around bg-[#0065bd] px-40 py-10">
                    <div>
                        <p className="text-white">© 2023 - Cổng thanh toán paypal</p>
                    </div>
                    <div>
                        <p className="text-white">Hỗ trợ khách hàng</p>
                        <div>
                            <FontAwesomeIcon className="pr-2 text-white" icon={faPhone} />
                            <span className="text-white">
                                <span>19001111</span>
                                <p className="pl-2">(1000đ/phút)</p>
                            </span>
                        </div>
                        <div className="pt-1">
                            <FontAwesomeIcon className="pr-2 text-white" icon={faMailBulk} />
                            <span className="text-white">hotro@paypal.vn</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;

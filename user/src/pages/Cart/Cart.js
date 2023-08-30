import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'primereact/checkbox';
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart, listCart, removefromcart } from '~/redux/Actions/cartActions';

import Loading from '~/components/LoadingError/Loading';
import { notification, Select, Space } from 'antd';
import ModalDaiSyUI from '~/components/Modal/ModalDaiSyUI';
import './Cart.css';

function Cart() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    console.log('cart = ', cart);
    console.log('cartItems = ', cartItems);

    const cartDel = useSelector((state) => state.cartDelete);
    const { loading: loa, success: suc, mesage: mes } = cartDel;

    const cartCreate = useSelector((state) => state.cartCreate);
    const { loading: loadingCreate, success: successCreate, error: errorCreate } = cartCreate;

    const total = cartItems
        ? cartItems
              .filter((item) => {
                  const findOption = item?.product?.optionColor?.find((option) => option.color === item.color);
                  if (findOption?.countInStock >= item.qty && item.isBuy === true) {
                      return item;
                  }
              })
              .reduce((a, i) => a + i.qty * i.product?.price, 0)
              .toFixed(0)
        : 0;

    const checkOutHandler = () => {
        navigate('/deliveryaddress');
    };
    useEffect(() => {
        if (errorCreate === 'account lock up') {
            openNotification('top', 'Tài khoản của bạn đã bị khóa', 'error');

            dispatch({ type: CART_CREATE_RESET });
        }
    }, [dispatch, errorCreate]);

    useEffect(() => {
        dispatch(listCart());
        if (successCreate) {
            dispatch({ type: CART_CREATE_RESET });
        }
    }, [suc, successCreate]);

    const removeFromCartHandle = (id) => {
        if (window.confirm('Are you sure!')) {
            dispatch(removefromcart(id));
        }
    };

    function findCartCountInStock(item) {
        const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
        return (
            <>
                {findCart?.countInStock !== 0 ? (
                    findCart?.countInStock >= item?.qty ? (
                        <div className="col-lg-1 flex">
                            <Checkbox
                                className=" m-auto [&_.p-highlight]:!border-[var(--blue-color)] [&_.p-highlight]:!bg-[var(--blue-color)]"
                                checked={item?.isBuy}
                                onChange={() => {
                                    dispatch(
                                        addToCart(
                                            {
                                                productId: item?.product._id,
                                                color: item?.color,
                                                id_product: cartItems.id_product,
                                                qty: true,
                                                _id: userInfo._id,
                                            },
                                            // true,
                                        ),
                                    );
                                }}
                            />
                        </div>
                    ) : (
                        <div className="col-lg-1 flex items-center justify-center">
                            <span className="text-sm font-semibold text-red-600">
                                Số lượng Sản phẩm không đủ đáp ứng
                            </span>
                        </div>
                    )
                ) : (
                    <div className="col-md-1 col-2 flex items-center justify-center">
                        <span className="text-sm font-semibold text-red-600">Hết hàng</span>
                    </div>
                )}
            </>
        );
    }

    const arrQuantity = [];
    const handleConfigQuantity = (cartItems) => {
        let Product_In_Storage = cartItems.product.optionColor.find((option) => option.color === cartItems.color);
        let quantityProduct_In_Storage = Product_In_Storage.countInStock;
        let quantityProduct_In_Cart = cartItems.qty;
        if (quantityProduct_In_Cart > quantityProduct_In_Storage) {
            for (let i = 1; i <= quantityProduct_In_Cart; i++) {
                let item = {
                    value: i,
                    label: i,
                };

                if (i > quantityProduct_In_Storage) {
                    item.disabled = true;
                }
                arrQuantity.push(item);
            }
        } else {
            for (let i = 1; i <= quantityProduct_In_Storage; i++) {
                let item = {
                    value: i,
                    label: i,
                };
                arrQuantity.push(item);
            }
        }
    };
    function findCartColor(item) {
        const optionColor = item?.product?.optionColor;
        const findCart = optionColor?.find((option) => option.color === item.color);
        handleConfigQuantity(item);
        return (
            <>
                <div className="col-lg-3 mt-3 flex flex-col justify-center">
                    <h6 className="mb-2 text-sm font-semibold uppercase text-[#2c2c2c]">Phân loại hàng</h6>
                    <h5>{item?.color}</h5>
                </div>
                <div className="col-lg-2 mt-3 flex flex-col justify-center">
                    <h6 className="mb-2 text-sm font-semibold uppercase text-[#2c2c2c]">Số lượng</h6>
                    <Select
                        defaultValue={item?.qty}
                        disabled={findCart?.countInStock <= 0}
                        style={{
                            width: 80,
                        }}
                        onChange={(value) => {
                            dispatch(
                                addToCart({
                                    productId: item?.product._id,
                                    color: item?.color,
                                    id_product: cartItems.id_product,
                                    qty: value,
                                    _id: userInfo._id,
                                }),
                            );
                        }}
                        options={arrQuantity}
                    />
                </div>
            </>
        );
    }
    return (
        <>
            {loadingCreate && <Loading />}
            {contextHolder}
            <div className="pb-5">
                {cartItems?.length === 0 ? (
                    <div className=" alert alert-info mt-3 flex justify-center text-center">
                        <div>
                            <div className="mb-4">
                                <img
                                    className="m-auto h-[100px] w-[100px]"
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                                    alt="Giỏ hàng trống"
                                />
                                GIỎ HÀNG CỦA BẠN ĐANG TRỐNG
                            </div>
                            <Link
                                className="btn-success btn mx-5 px-5 text-base font-semibold hover:bg-[#157347]"
                                to="/"
                            >
                                BẮT ĐẦU MUA SẮM
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="pt-3">
                            <Link
                                to="/"
                                className="rounded bg-[var(--main-color)] px-3 py-2 font-normal text-white hover:bg-[var(--main-color-hover)]"
                            >
                                <i className="fas fa-undo pr-2"></i>
                                Về trang chủ
                            </Link>
                        </div>
                        <div className=" row col-lg-12 mt-3 rounded bg-[var(--blue-color)] py-3 text-center">
                            <div className="">
                                Tổng sản phẩm trong giỏ{' '}
                                <span className="text-lg font-semibold text-gray-200">({cartItems?.length ?? 0})</span>
                            </div>
                        </div>
                        {/* cartiterm */}
                        {/* cart-scroll */}
                        {cartItems?.map((item) => (
                            <div key={item?._id} className="row col-lg-12 my-4 bg-white">
                                {findCartCountInStock(item)}
                                <div className=" col-lg-1 col-4 mt-0">
                                    <img
                                        className="h-[100px] object-contain"
                                        src={`${item.product?.image[0]?.urlImage}`}
                                        alt={item.product?.name}
                                    />
                                </div>
                                <div className="col-lg-2 flex items-center">
                                    <Link to={`/product/${item.product?._id}`}>
                                        <h4 className="font-bold">{item.product?.name}</h4>
                                    </Link>
                                </div>
                                {findCartColor(item)}
                                <div className="col-lg-2 mb-2 mt-3 flex flex-col items-start justify-center text-sm text-[#2c2c2c]">
                                    <h6 className="h-8 text-center font-bold uppercase leading-8 ">Giá</h6>
                                    <h4>{item.product?.price?.toLocaleString('de-DE')}đ</h4>
                                </div>
                                <div className="col-lg-1 mb-2 flex">
                                    <button
                                        className="m-auto cursor-pointer rounded-xl bg-[var(--main-color)] px-4 py-1 align-middle text-white hover:bg-[var(--main-color-hover)]"
                                        onClick={() => {
                                            removeFromCartHandle(item?._id);
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* End of cart iterms */}
                        <div className="row col-lg-12 mt-3 flex flex-wrap items-center justify-center bg-white py-3">
                            <div className="col-lg-5 flex justify-center">
                                <span className="mr-5 pt-1 text-xl text-[#8c8c8c] ">Tổng tiền:</span>
                                <span className="text-2xl font-bold text-red-500">
                                    {Number(total)?.toLocaleString('de-DE')}đ
                                </span>
                            </div>
                            {total > 0 && (
                                <div className="col-lg-7 flex justify-center">
                                    <button
                                        className=" rounded bg-[var(--main-color)] px-10 py-[10px] text-sm font-semibold uppercase text-white hover:bg-[var(--main-color-hover)]"
                                        onClick={checkOutHandler}
                                    >
                                        Tiến hành thanh toán
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Cart;

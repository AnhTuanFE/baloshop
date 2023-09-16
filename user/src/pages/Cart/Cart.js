import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'primereact/checkbox';
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart, listCart, removefromcart } from '~/redux/Actions/cartActions';

import Loading from '~/components/LoadingError/Loading';
import { notification, Select, Space } from 'antd';
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
                        <div className="flex h-full justify-center align-middle">
                            <Checkbox
                                className="m-auto [&_.p-highlight]:!border-[var(--blue-color)] [&_.p-highlight]:!bg-[var(--blue-color)]"
                                checked={item?.isBuy}
                                onChange={() => {
                                    dispatch(
                                        addToCart(
                                            {
                                                productId: item?.product._id,
                                                color: item?.color,
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
                        <div className="flex h-full justify-center align-middle">
                            <span className="text-sm font-semibold text-red-600">
                                Số lượng Sản phẩm không đủ đáp ứng
                            </span>
                        </div>
                    )
                ) : (
                    <div className="flex h-full justify-center align-middle">
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
                <div className=" mt-3 max-sm:flex sm:flex sm:flex-col sm:justify-center">
                    <h6 className="mb-2 text-sm font-bold uppercase text-[#2c2c2c]">Màu</h6>
                    <h5 className="max-sm:ml-3">{item?.color}</h5>
                </div>
                <div className="mt-3 max-sm:flex max-sm:justify-center sm:flex sm:flex-col sm:justify-center">
                    <h6 className=" mb-2 text-sm font-semibold uppercase text-[#2c2c2c] max-sm:hidden sm:block">
                        Số lượng
                    </h6>
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
                    <div className=" row col-lg-12 mt-3 flex justify-center text-center  max-sm:mx-4">
                        <div className=" col-lg-6 rounded-xl bg-[var(--blue-color)] py-4">
                            <div className="mb-4">
                                <img
                                    className="m-auto h-[100px] w-[100px]"
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                                    alt="Giỏ hàng trống"
                                />
                                <div className="mt-2 font-medium">GIỎ HÀNG CỦA BẠN ĐANG TRỐNG</div>
                            </div>
                            <Link
                                className=" mx-5 rounded-lg bg-[var(--main-color)] px-5 py-2.5 text-base font-semibold text-white hover:bg-[var(--main-color-hover)]"
                                to="/"
                            >
                                <button>BẮT ĐẦU MUA SẮM</button>
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
                        {cartItems?.map((item) => (
                            <div key={item?._id} className="row my-4 bg-white py-1 lg:w-full">
                                <div className="col-lg-12 col-md-12 flex justify-center">
                                    <div className="col-lg-2 col-md-2 flex justify-around">
                                        <div className="">{findCartCountInStock(item)}</div>
                                        <div className=" flex flex-col justify-center">
                                            <img
                                                className=" h-[100px] object-contain"
                                                src={`${item.product?.image[0]}`}
                                                alt={item.product?.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8 max-md:ml-2 max-md:block md:flex md:justify-around">
                                        <div className="flex items-center">
                                            <Link to={`/product/${item.product?._id}`}>
                                                <h4 className="font-bold">{item.product?.name}</h4>
                                            </Link>
                                        </div>
                                        {findCartColor(item)}
                                        <div className="flex flex-col justify-center text-sm text-[#2c2c2c] max-sm:hidden">
                                            <h6 className=" text-center font-bold uppercase ">Giá</h6>
                                            <h4 className="mt-1">{item.product?.price?.toLocaleString('de-DE')}đ</h4>
                                        </div>
                                    </div>
                                    <div className="mx-1 flex-col justify-center max-sm:flex sm:hidden">
                                        <h4 className="mt-1 font-bold">
                                            {item.product?.price?.toLocaleString('de-DE')}đ
                                        </h4>
                                    </div>
                                    <div className="col-lg-1 col-md-2 flex flex-col justify-center max-sm:ml-2">
                                        <button
                                            className=" m-auto w-14 cursor-pointer rounded-xl bg-[var(--main-color)] py-1 text-white hover:bg-[var(--main-color-hover)]"
                                            onClick={() => {
                                                removeFromCartHandle(item?._id);
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </div>
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

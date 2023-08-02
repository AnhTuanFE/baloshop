import { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'primereact/checkbox';
//
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart, listCart, removefromcart } from '~/redux/Actions/cartActions';

import Loading from '~/components/HomeComponent/LoadingError/Loading';
import { notification } from 'antd';

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

    const param = useParams();
    const location = useLocation();

    const productId = param.id;
    const qty = location.search ? Number(location.search.split('?qty=')[1].split('?')[0]) : 1;
    const color = location.search && location.search.split('?color=')[1].split('?')[0];
    // search: '?qty=1?color=xanh%20%C4%91en';

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
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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
                        <div className="col-md-1 col-2 cart-checkbok">
                            <Checkbox
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
                        <div className="col-md-1 col-2 cart-checkbok">
                            <span className="span" style={{ fontSize: '12px', color: 'red' }}>
                                Sản phẩm không đủ đáp ứng bạn cần điều chỉnh lại số lượng
                            </span>
                        </div>
                    )
                ) : (
                    <div className="col-md-1 col-2 cart-checkbok">
                        <span className="span" style={{ fontSize: '12px', color: 'red' }}>
                            Hết hàng
                        </span>
                    </div>
                )}
            </>
        );
    }
    function findCartColor(item) {
        const optionColor = item?.product?.optionColor;
        const findCart = optionColor?.find((option) => option.color === item.color);
        return (
            <>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-0 d-flex flex-column justify-content-center quantity-css mt-3">
                    <h6>Phân loại hàng</h6>
                    <h5>{item?.color}</h5>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-0 d-flex flex-column justify-content-center quantity-css mt-3">
                    <h6>Số lượng</h6>
                    <select
                        disabled={findCart?.countInStock <= 0}
                        value={item?.qty}
                        onChange={(e) => {
                            dispatch(
                                addToCart({
                                    productId: item?.product._id,
                                    color: item?.color,
                                    id_product: cartItems.id_product,
                                    qty: e.target.value,
                                    _id: userInfo._id,
                                }),
                            );
                        }}
                    >
                        {[...Array(findCart?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </>
        );
    }
    return (
        <>
            {loadingCreate && <Loading />}
            {contextHolder}
            <div className="container">
                {cartItems?.length === 0 ? (
                    <div className=" alert alert-info mt-3 text-center">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img
                                style={{ width: '100px', height: '100px', margin: '0 auto' }}
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
                                alt=""
                            />
                            GIỎ HÀNG CỦA BẠN ĐANG TRỐNG
                        </div>
                        <Link
                            className="btn btn-success mx-5 px-5 py-3"
                            to="/"
                            style={{
                                fontSize: '12px',
                            }}
                        >
                            BẮT ĐẦU MUA SẮM
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="backTo" style={{ paddingTop: '10px' }}>
                            <Link to="/" className="col-md-6 ">
                                <i class="fas fa-undo" style={{ paddingRight: '5px' }}></i>
                                Về trang chủ
                            </Link>
                        </div>
                        <div className=" alert alert-info mt-3 text-center">
                            Tổng sản phẩm trong giỏ
                            <Link className="text-success mx-2" to="/cart">
                                ({cartItems?.length ?? 0})
                            </Link>
                        </div>
                        {/* cartiterm */}
                        <div className="cart-scroll">
                            {cartItems?.map((item) => (
                                <div key={item?._id} className="cart-iterm row">
                                    {findCartCountInStock(item)}
                                    <div className="cart-image col-md-1 col-4">
                                        <img src={`${item.product?.image[0]?.urlImage}`} alt={item.product?.name} />
                                    </div>
                                    <div className="cart-text col-md-3 col-6 d-flex align-items-center">
                                        <Link to={`/products/${item.product?._id}`}>
                                            <h4>{item.product?.name}</h4>
                                        </Link>
                                    </div>
                                    {findCartColor(item)}
                                    <div className="cart-price mt-md-0 col-md-2 align-items-sm-end align-items-start d-flex  flex-column justify-content-center col-sm-7 quantity-css mt-3">
                                        <h6>Giá</h6>
                                        <h4>{item.product?.price?.toLocaleString('de-DE')}đ</h4>
                                    </div>
                                    <div
                                        className=" col-md-1 delete-cart"
                                        onClick={() => {
                                            removeFromCartHandle(item?._id);
                                        }}
                                        style={{ display: 'flex', justifyContent: 'right', cursor: 'pointer' }}
                                    >
                                        Xóa
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* End of cart iterms */}
                        <hr />
                        <div className="cart-buttons d-flex align-items-center row">
                            <div className="total col-md-6">
                                <span className="sub">Tổng tiền:</span>
                                <span className="total-price">{Number(total)?.toLocaleString('de-DE')}đ</span>
                            </div>
                            {total > 0 && (
                                <div className="col-md-6 d-flex justify-content-md-end mt-md-0 mt-3">
                                    <button className="round-black-btn" onClick={checkOutHandler}>
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

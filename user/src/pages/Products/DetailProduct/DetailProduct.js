import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import Rating from '~/components/Rating/Rating';

import SliderImageProducts from './DetailProductComponents/SliderImageProducts/SliderImageProducts';
import AskAndAnswer from './DetailProductComponents/AskAndAnswer/AskAndAnswer';
import EvaluateProduct from './DetailProductComponents/EvaluateProduct/EvaluateProduct';

import { productDetailAction } from '~/redux/Actions/ProductActions';
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart, listCart } from '~/redux/Actions/cartActions';

import SimilarProducts from './DetailProductComponents/SimilarProducts/SimilarProducts';
import { Radio, notification, ConfigProvider } from 'antd';
import LoadingLarge from '~/components/LoadingError/LoadingLarge';
import './DetailProduct.css';

function DetailProduct() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const param = useParams();
    const productId = param.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [optionIndex, setOptionIndex] = useState(0);
    const [optionsArrColor, setOptionArrColor] = useState({});
    const [color, setColor] = useState('');

    const productDetail = useSelector((state) => state.productDetails);
    const { loading, error, data } = productDetail;
    const { product } = data;
    // start state component com dùng để re-render khi cần
    const reviews = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
        data: dataCreateReview,
    } = reviews;
    const productCommentCreate = useSelector((state) => state.productCommentCreate); //comment
    const {
        loading: loadingCreateComment,
        error: errorCreateComment,
        success: successCreateComment,
    } = productCommentCreate;

    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate); //comment child
    const {
        loading: loadingCreateCommentChild,
        error: errorCreateCommentChild,
        success: successCreateCommentChild,
    } = productCommentChildCreate;
    // end state component com dùng để re-render khi cần

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cartCreate = useSelector((state) => state.cartCreate);
    const { success: successAddCart, loading: loadingAddCart, error: errorAddCart } = cartCreate;
    // antd
    const [selected, setSelected] = useState('');
    const handleSelectedChange = (e) => {
        setSelected(e.target.value);
    };
    //
    useEffect(() => {
        dispatch(productDetailAction({ id: productId }));
    }, [productId, successCreateReview, successCreateComment, successCreateCommentChild]);

    useEffect(() => {
        if (data.product) {
            setColor(data.product.optionColor[optionIndex]?.color);
            setSelected(data.product.optionColor[optionIndex]?.color);
            setOptionArrColor(data.product.optionColor[optionIndex]);
        }
    }, [data, optionIndex]);

    useEffect(() => {
        if (successAddCart) {
            openNotification('top', 'Thêm sản phẩm vào giỏ hàng Thành công', 'success');
            dispatch({ type: CART_CREATE_RESET });
            // cập nhập số lượng sản phẩm trong giỏ hàng
            dispatch(listCart());
            // navigate(`/cart/${productId}?qty=${qty}?color=${color}`);
        }
        if (errorAddCart) {
            openNotification('top', 'Thêm sản phẩm vào giỏ hàng thất bại', 'error');
            dispatch({ type: CART_CREATE_RESET });
        }
    }, [dispatch, successAddCart, errorAddCart]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        if (userInfo) {
            dispatch(addToCart({ productId, color, qty, _id: userInfo._id }));
        } else navigate('/login');
    };
    const handleRender = () => {
        return (
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className=" max-md:mx-1 md:mx-10">
                    {contextHolder}
                    <div className="row mx-2">
                        <div className="col-md-12 rounded bg-white py-2">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="flex justify-center bg-white max-md:h-[200px] md:h-[400px]">
                                        <SliderImageProducts images={product?.image} />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="">
                                        <div className="w-full text-center">
                                            <div className="mb-2 text-xl font-semibold">{product?.name}</div>
                                        </div>
                                        <div className="product-baner">
                                            <img
                                                className=" w-full max-md:h-[100px] md:h-[200px]"
                                                src="https://res.cloudinary.com/dt0iazjvh/image/upload/v1694970082/banner-balo-balovietnamdotcom-1605_wjennv.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-lg-12 mt-2 rounded ">
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Giá</h6>
                                                <span className="font-semibold text-[#000000]">
                                                    {product?.price?.toLocaleString('de-DE')}đ
                                                </span>
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Trạng thái</h6>
                                                {optionsArrColor?.countInStock > 0 ? (
                                                    <span className="font-semibold text-[#000000]">Còn hàng</span>
                                                ) : (
                                                    <span className="font-semibold text-red-600">Hết hàng</span>
                                                )}
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Đánh giá</h6>
                                                <Rating
                                                    value={product?.rating}
                                                    text={`(${product?.numReviews}) đánh giá`}
                                                />
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Màu sắc</h6>
                                                <div>
                                                    <ConfigProvider
                                                        theme={{
                                                            token: {
                                                                // Seed Token
                                                                colorPrimary: '#e83781',
                                                                borderRadius: 2,
                                                                // Alias Token
                                                                // colorBgContainer: '#f6ffed',
                                                            },
                                                        }}
                                                    >
                                                        <Radio.Group value={selected} onChange={handleSelectedChange}>
                                                            {product?.optionColor?.map((option, index) => (
                                                                // <button
                                                                //     type="button"
                                                                //     key={option._id}
                                                                //     onClick={() => {
                                                                //         setOptionIndex(index);
                                                                //         setColor(option.color);
                                                                //     }}
                                                                //     className="mr-1 mt-2 rounded bg-[var(--blue-color)] px-2 py-1 text-white"
                                                                // >
                                                                //     {option.color}
                                                                // </button>
                                                                <Radio.Button
                                                                    key={option._id}
                                                                    onClick={() => {
                                                                        setOptionIndex(index);
                                                                        setColor(option.color);
                                                                    }}
                                                                    value={option.color}
                                                                    className=""
                                                                >
                                                                    {option.color}
                                                                </Radio.Button>
                                                            ))}
                                                        </Radio.Group>
                                                    </ConfigProvider>
                                                </div>
                                            </div>

                                            {optionsArrColor?.countInStock > 0 ? (
                                                <>
                                                    <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                        <h6 className="text-base font-semibold">Số lượng</h6>
                                                        <select
                                                            className="h-10 w-[100px] cursor-pointer rounded bg-white text-center"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(optionsArrColor.countInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="mx-6">
                                                        <button
                                                            onClick={AddToCartHandle}
                                                            className="w-full rounded bg-[var(--main-color)] py-2 text-base font-bold uppercase text-white hover:opacity-80"
                                                        >
                                                            Thêm vào giỏ
                                                        </button>
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 rounded bg-white pt-5">
                                    <h2
                                        style={{
                                            borderBottom: '2px solid rgba(250, 154, 10, 0.8)',
                                        }}
                                        className="mb-3 mt-2 text-2xl font-semibold uppercase"
                                    >
                                        Chi Tiết Sản Phẩm
                                    </h2>
                                    <div
                                        className="product-description"
                                        dangerouslySetInnerHTML={{ __html: product?.description }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-2">
                        {data?.product && (
                            <>
                                <EvaluateProduct product={data?.product} userInfo={userInfo} />
                                <AskAndAnswer product={data?.product} userInfo={userInfo} />
                                <SimilarProducts category={data?.product?.category} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    let content;
    if (loading) {
        content = (
            <div className="">
                <LoadingLarge content={'Đang load thông tin'} />
            </div>
        );
    } else if (error) {
        content = <Message>{error}</Message>;
    } else {
        content = handleRender();
    }
    return (
        <>
            <div className="mb-12 mt-0">
                {loadingAddCart && <LoadingLarge content={' '} />}
                {/* {loadingAddCart && <Loading />} */}
                {content}
            </div>
        </>
    );
}

export default DetailProduct;

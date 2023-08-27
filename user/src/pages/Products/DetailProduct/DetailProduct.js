import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// component child
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import Rating from '~/components/Rating/Rating';

import SliderImageProducts from './DetailProductComponents/SliderImageProducts/SliderImageProducts';
import AskAndAnswer from './DetailProductComponents/AskAndAnswer/AskAndAnswer';
import EvaluateProduct from './DetailProductComponents/EvaluateProduct/EvaluateProduct';

// redux
import { listProductDetails, listProduct } from '~/redux/Actions/ProductActions';
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart } from '~/redux/Actions/cartActions';

import SimilarProducts from './DetailProductComponents/SimilarProducts/SimilarProducts';
import { notification } from 'antd';
import LoadingLarge from '~/components/LoadingError/LoadingLarge';
import { listCart } from '~/redux/Actions/cartActions';

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

    // state
    const [qty, setQty] = useState(1);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortProducts, setSortProducts] = useState('3');

    const [optionIndex, setOptionIndex] = useState(0);
    const [optionsArrColor, setOptionArrColor] = useState('');
    const [color, setColor] = useState('');
    // const [rating, setRating] = useState(0);

    // Lấy state từ store redux
    const productDetail = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // start chức năng khác
    const productList = useSelector((state) => state.productList);
    const { products, page, pages } = productList;

    // end chức năng khác

    const cartCreate = useSelector((state) => state.cartCreate);
    const { success: successAddCart, loading: loadingAddCart, error: errorAddCart } = cartCreate;

    const optionColor = product?.optionColor?.sort(({ color: b }, { color: a }) => (a > b ? 1 : a < b ? -1 : 0));

    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (optionColor) {
            setColor(optionColor[0]?.color);
        }
    }, [optionColor]);

    useEffect(() => {
        setOptionArrColor(() => {
            if (optionColor !== undefined && optionIndex !== undefined) {
                let x = optionColor[optionIndex];
                return x;
            }
        });
    }, [optionIndex, optionColor]);

    useEffect(() => {
        if (product._id !== undefined) {
            setCategory(product.category);
            setMinPrice(Math.floor(product.price / 2));
            setMaxPrice(Math.round(product.price * 2));
        }
    }, [product._id]);

    useEffect(() => {
        if (product !== undefined && maxPrice) {
            dispatch(listProduct(category, keyword, pageNumber, minPrice, maxPrice, sortProducts)); // rating,
        }
    }, [category, maxPrice]);

    useEffect(() => {
        if (successAddCart) {
            openNotification('top', 'Thêm sản phẩm vào giỏ hàng Thành công', 'success');
            dispatch({ type: CART_CREATE_RESET });
            // navigate(`/cart/${productId}?qty=${qty}?color=${color}`);
        }
        if (errorAddCart) {
            openNotification('top', 'Thêm sản phẩm vào giỏ hàng thất bại', 'error');

            dispatch({ type: CART_CREATE_RESET });
        }
    }, [dispatch, successAddCart, errorAddCart]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        const id_product = product?.id_product || 151138769223;
        if (userInfo) {
            dispatch(addToCart({ productId, color, id_product, qty, _id: userInfo._id }));
        } else navigate('/login');
    };
    useEffect(() => {
        // cập nhập số lượng sản phẩm trong giỏ hàng
        dispatch(listCart());
    }, [successAddCart]);
    const handleRender = () => {
        return (
            <div className="mx-auto my-auto max-w-screen-2xl">
                <div className="mx-[5%]">
                    {contextHolder}
                    <div className="row mx-5">
                        <div className="col-md-12 rounded bg-white py-2">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="flex h-[400px] justify-center bg-white">
                                        <SliderImageProducts images={product.image} />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="">
                                        <div className="w-full">
                                            <div className="mb-2 text-xl font-semibold">{product.name}</div>
                                        </div>
                                        <div className="product-baner">
                                            <img
                                                className="h-[200px] w-full"
                                                src="https://res.cloudinary.com/tlsbaloshop/image/upload/v1685002777/baloshopSlider/ant_index_bottom_banner_big_2_isoowv.jpg"
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
                                                    <span className="font-semibold text-[#000000]">Hết hàng</span>
                                                )}
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Đánh giá</h6>
                                                <Rating
                                                    value={product.rating}
                                                    text={`(${product.numReviews}) đánh giá`}
                                                />
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                <h6 className="text-base font-semibold">Màu sắc</h6>
                                                <div>
                                                    {optionColor?.map((option, index) => (
                                                        <button
                                                            type="button"
                                                            key={option._id}
                                                            onClick={() => {
                                                                setOptionIndex(index);
                                                                setColor(option.color);
                                                            }}
                                                            className={
                                                                optionIndex === index
                                                                    ? 'btn-outline-primary active btn mx-1'
                                                                    : 'btn-outline-primary btn mx-1'
                                                            }
                                                            style={{ marginTop: '8px' }}
                                                        >
                                                            {option.color}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {optionsArrColor?.countInStock > 0 ? (
                                                <>
                                                    <div className=" d-flex justify-content-between align-items-center px-6 py-2">
                                                        <h6 className="text-base font-semibold">Số lượng</h6>
                                                        <select
                                                            className="h-10 w-[100px] cursor-pointer rounded bg-[#f3f3f3] text-center"
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
                                        className="mb-5 mt-2 text-2xl font-semibold uppercase"
                                    >
                                        Chi Tiết Sản Phẩm
                                    </h2>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5">
                        <EvaluateProduct productId={productId} />
                        <AskAndAnswer productId={productId} />
                        <SimilarProducts products={products} />
                    </div>
                </div>
            </div>
        );
    };

    let content;
    if (loading) {
        content = (
            <div className="min-h-[100vh]">
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

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './product.css';
import { toast } from 'react-toastify';

// component child
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import Toast from '~/components/HomeComponent/LoadingError/Toast';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Rating from '~/components/HomeComponent/Rating/Rating';

import SliderImageProducts from './DetailProductComponents/SliderImageProducts/SliderImageProducts';
import AskAndAnswer from './DetailProductComponents/AskAndAnswer/AskAndAnswer';
import EvaluateProduct from './DetailProductComponents/EvaluateProduct/EvaluateProduct';

// redux
import { listProductDetails, listProduct } from '~/redux/Actions/ProductActions';
import { CART_CREATE_RESET } from '~/redux/Constants/CartConstants';
import { addToCart } from '~/redux/Actions/cartActions';

import SimilarProducts from './DetailProductComponents/SimilarProducts/SimilarProducts';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

function DetailProduct() {
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
            dispatch({ type: CART_CREATE_RESET });
            navigate(`/cart/${productId}?qty=${qty}?color=${color}`);
        }
        if (errorAddCart) {
            toast.error(errorAddCart, Toastobjects);
            dispatch({ type: CART_CREATE_RESET });
        }
    }, [dispatch, successAddCart, errorAddCart]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        if (userInfo) {
            dispatch(addToCart(productId, color, qty, userInfo._id));
        } else navigate('/login');
    };

    const handleRender = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-12 product-avatar">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="single-image">
                                    <SliderImageProducts images={product.image} />
                                </div>
                            </div>
                            <div className="col-md-7 product-postion">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                    </div>

                                    <div className="product-baner">
                                        <img
                                            style={{ width: '100%' }}
                                            src="http://balo.giaodienwebmau.com/wp-content/uploads/2021/06/ant_index_bottom_banner_big_2.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="product-count col-lg-12 ">
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Giá</h6>
                                            <span>{product?.price?.toLocaleString('de-DE')}đ</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Trạng thái</h6>
                                            {optionsArrColor?.countInStock > 0 ? (
                                                <span>Còn hàng</span>
                                            ) : (
                                                <span>Hết hàng</span>
                                            )}
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Đánh giá</h6>
                                            <Rating value={product.rating} text={`${product.numReviews} đánh giá`} />
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Màu sắc</h6>
                                            <div>
                                                {optionColor?.map((option, index) => (
                                                    <button
                                                        type="button"
                                                        key={option._id}
                                                        onClick={() => {
                                                            setOptionIndex(index);
                                                            setColor(option.color);
                                                        }}
                                                        class={
                                                            optionIndex === index
                                                                ? 'btn btn-outline-primary mx-1 active'
                                                                : 'btn btn-outline-primary mx-1'
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
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Số lượng</h6>
                                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(optionsArrColor.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button onClick={AddToCartHandle} className="round-black-btn">
                                                    Thêm vào giỏ
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="product-description">
                                <h2 className="product-description__h2">Chi Tiết Sản Phẩm</h2>
                                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <EvaluateProduct productId={productId} />
                <AskAndAnswer productId={productId} />
                <SimilarProducts products={products} />
            </>
        );
    };

    let content;
    if (loading) {
        content = <Loading />;
    } else if (error) {
        content = <Message>{error}</Message>;
    } else {
        content = handleRender();
    }
    return (
        <>
            <div className="container single-product">
                <Toast />
                {loadingAddCart && <Loading />}
                {content}
            </div>
        </>
    );
}

export default DetailProduct;

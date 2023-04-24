import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../Rating/Rating';
import Pagination from '../Pagination/Pagination';
import { listProduct } from '~/redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { listCart } from '~/redux/Actions/cartActions';

import styles from './AllProductsFilter.module.scss';

const AllProducts_Filter = (props) => {
    const { category, keyword, pageNumber, sortProducts, rating } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts));
    }, [dispatch, category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts]);

    const handlerSort = (value) => {
        if (rating === undefined && keyword === undefined && category === undefined) {
            navigate(`/sortProducts/${value}/page/${'1'}`);
        }
        if (rating !== undefined && keyword === undefined && category === undefined) {
            navigate(`/sortProducts/${value}/rating/${rating}/page/${'1'}`);
        }
        if (keyword !== undefined && category === undefined) {
            navigate(`/search/${keyword}/sortProducts/${value}/rating/${rating}/page/${'1'}`);
        }
        if (keyword === undefined && category !== undefined) {
            navigate(`/category/${category}/sortProducts/${value}/rating/${rating}/page/${'1'}`);
        }
    };

    const handlerRating = (value) => {
        if (rating === undefined && keyword === undefined && category === undefined) {
            navigate(`/rating/${value}/page/${'1'}`);
        }
        if (sortProducts !== undefined && keyword === undefined && category === undefined) {
            navigate(`/sortProducts/${sortProducts}/rating/${value}/page/${'1'}`);
        }
        if (keyword !== undefined && category === undefined) {
            navigate(`/search/${keyword}/sortProducts/${sortProducts}/rating/${value}/page/${'1'}`);
        }
        if (keyword === undefined && category !== undefined) {
            navigate(`/category/${category}/sortProducts/${sortProducts}/rating/${value}/page/${'1'}`);
        }
    };
    return (
        <>
            <div className="container mt-2">
                <h2 className="section-title container mt-5">
                    <b></b>
                    <span className="section-title-main">Tất Cả Sản Phẩm</span>
                    <b></b>
                </h2>
                <div className=" pt-0">
                    <div className={clsx(styles.wrapFilter)}>
                        <div className="">
                            <select
                                className="form-select"
                                value={sortProducts === undefined ? '1' : sortProducts}
                                // onChange={(e) => {
                                //     setSortProducts(e.target.value);
                                // }}
                                onChange={(e) => {
                                    handlerSort(e.target.value);
                                }}
                            >
                                <option style={{ fontSize: '13px' }} value="1">
                                    Sản phẩm mới
                                </option>
                                <option style={{ fontSize: '13px' }} value="3">
                                    Giá tăng dần
                                </option>
                                <option style={{ fontSize: '13px' }} value="4">
                                    Giá giảm dần
                                </option>
                            </select>
                        </div>
                        <div className="ms-2">
                            <select
                                className="form-select"
                                value={rating === undefined ? '0' : rating}
                                // onChange={(e) => {
                                //     setRating(e.target.value);
                                // }}
                                onChange={(e) => {
                                    handlerRating(e.target.value);
                                }}
                            >
                                <option style={{ fontSize: '13px' }} value="0">
                                    Đánh giá
                                </option>
                                <option style={{ fontSize: '13px' }} value="5">
                                    5 sao
                                </option>
                                <option style={{ fontSize: '13px' }} value="4">
                                    4 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="3">
                                    3 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="2">
                                    2 sao trở lên
                                </option>
                                <option style={{ fontSize: '13px' }} value="1">
                                    1 sao trở lên
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {/* <FilterSection
                            setRating={setRating}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            rating={rating}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        ></FilterSection> */}

                        <div className="col-lg-12 col-md-12 article">
                            <div className="shopcontainer row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading />
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {' '}
                                        {products?.length !== 0 ? (
                                            products?.map((product) => (
                                                <div className="shop col-lg-3 col-md-4 col-sm-12" key={product?._id}>
                                                    <div className="border-product text-center">
                                                        <Link to={`/products/${product?._id}`}>
                                                            <div className={clsx(styles.shopBack)}>
                                                                <img
                                                                    src={`/productImage/${product?.image[0]?.image}`}
                                                                    alt={product?.name}
                                                                />
                                                            </div>
                                                        </Link>

                                                        <div className={clsx(styles.shoptext)}>
                                                            <p>
                                                                <Link to={`/products/${product?._id}`}>
                                                                    {product?.name}
                                                                </Link>
                                                            </p>

                                                            <h3>{product?.price?.toLocaleString('de-DE')}đ</h3>
                                                            <Rating
                                                                value={product?.rating}
                                                                text={`(${product?.numReviews})`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="alert-warning">Không tìm thấy sản phẩm</div>
                                        )}
                                    </>
                                )}
                                <Pagination
                                    pages={pages}
                                    page={page}
                                    category={category ? category : ''}
                                    keyword={keyword ? keyword : ''}
                                    sortProducts={sortProducts ? sortProducts : ''}
                                    rating={rating ? rating : ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts_Filter;

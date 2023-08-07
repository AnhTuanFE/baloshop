import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '~/components/Rating/Rating';
import Pagination from '../Pagination/Pagination';
import { listProduct } from '~/redux/Actions/ProductActions';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import { listCart } from '~/redux/Actions/cartActions';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import { Divider, Chip } from '@mui/material';
import styles from './AllProductsFilter.module.scss';

const AllProductsFilter = (props) => {
    const { category, keyword, pageNumber, sortProducts, rating } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productList } = useSelector(productsRemainingSelector);
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
            <div className="mx-auto my-auto mb-7 max-w-screen-2xl pt-10">
                <h2 className="pb-10 text-center">
                    <Divider>
                        <Chip
                            className="font-semibold"
                            sx={{
                                fontSize: '24px',
                                bgcolor: '#ffff',
                            }}
                            label="Tất Cả Sản Phẩm"
                        />
                    </Divider>
                </h2>
                <div className=" pt-0">
                    <div className="mb-9 mr-9 flex justify-end">
                        <div className="">
                            <select
                                className="form-select"
                                value={sortProducts === undefined ? '1' : sortProducts}
                                onChange={(e) => {
                                    handlerSort(e.target.value);
                                }}
                            >
                                <option className="text-sm font-medium" value="1">
                                    Sản phẩm mới
                                </option>
                                <option className="text-sm font-medium" value="3">
                                    Giá tăng dần
                                </option>
                                <option className="text-sm font-medium" value="4">
                                    Giá giảm dần
                                </option>
                            </select>
                        </div>
                        <div className="ms-2">
                            <select
                                className="form-select"
                                value={rating === undefined ? '0' : rating}
                                onChange={(e) => {
                                    handlerRating(e.target.value);
                                }}
                            >
                                <option className="text-sm font-medium" value="0">
                                    Đánh giá
                                </option>
                                <option className="text-sm font-medium" value="5">
                                    5 sao
                                </option>
                                <option className="text-sm font-medium" value="4">
                                    4 sao trở lên
                                </option>
                                <option className="text-sm font-medium" value="3">
                                    3 sao trở lên
                                </option>
                                <option className="text-sm font-medium" value="2">
                                    2 sao trở lên
                                </option>
                                <option className="text-sm font-medium" value="1">
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
                            <div className="row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading />
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {products?.length !== 0 ? (
                                            products?.map((product) => (
                                                <div className="shop col-lg-3 col-md-4 col-sm-12" key={product?._id}>
                                                    <div className="border-product text-center">
                                                        <Link to={`/product/${product?._id}`}>
                                                            <div className="hover:-translate-y-4 hover:transform hover:transition hover:duration-200 hover:ease-linear">
                                                                <img
                                                                    src={`${product?.image[0].urlImage}`}
                                                                    alt={product?.name}
                                                                    className="filter-[brightness(1)] m-auto h-[200px]"
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
                                            <div className="mb-48 flex justify-center">
                                                <div className="alert-warning rounded-2xl p-5 font-bold">
                                                    Không tìm thấy sản phẩm
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                    pages={pages}
                    page={page}
                    category={category ? category : ''}
                    keyword={keyword ? keyword : ''}
                    sortProducts={sortProducts ? sortProducts : ''}
                    rating={rating ? rating : ''}
                />
            </div>
        </>
    );
};

export default AllProductsFilter;

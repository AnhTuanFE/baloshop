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

const AllProductsFilter = (props) => {
    const { category, keyword, pageNumber, sortBy, rating } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productList } = useSelector(productsRemainingSelector);
    const { loading, error, products, page, pages } = productList;

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct({ category, keyword, minPrice, maxPrice, pageNumber, rating, sortBy }));
    }, [dispatch, category, keyword, pageNumber, minPrice, maxPrice, rating, sortBy]);

    const handlerSort = (value) => {
        if (rating === '' && keyword === '' && category === '') {
            navigate(`/sortBy/${value}/page/${'1'}`);
        }
        if (rating !== '' && keyword === '' && category === '') {
            navigate(`/sortBy/${value}/rating/${rating}/page/${'1'}`);
        }
        if (keyword !== '' && category === '') {
            navigate(`/search/${keyword}/sortBy/${value}/rating/${rating}/page/${'1'}`);
        }
        if (keyword === '' && category !== '') {
            navigate(`/category/${category}/sortBy/${value}/rating/${rating}/page/${'1'}`);
        }
    };

    const handlerRating = (value) => {
        if (rating === '' && keyword === '' && category === '') {
            navigate(`/rating/${value}/page/${'1'}`);
        }
        if (sortBy !== '' && keyword === '' && category === '') {
            navigate(`/sortBy/${sortBy}/rating/${value}/page/${'1'}`);
        }
        if (keyword !== '' && category === '') {
            navigate(`/search/${keyword}/sortBy/${sortBy}/rating/${value}/page/${'1'}`);
        }
        if (keyword === '' && category !== '') {
            navigate(`/category/${category}/sortBy/${sortBy}/rating/${value}/page/${'1'}`);
        }
    };

    return (
        <>
            <div className="mx-auto my-auto max-w-screen-2xl max-md:mt-1 max-md:pt-5 md:mt-3 md:pt-10">
                <h2 className="text-center">
                    <Divider>
                        <Chip
                            className="bg-white font-semibold "
                            sx={{
                                fontSize: '18px',
                            }}
                            label="Tất Cả Sản Phẩm"
                        />
                    </Divider>
                </h2>
                <div className="pt-2">
                    <div className="mb-4 mr-9 flex justify-end">
                        <div className="">
                            <select
                                className="form-select"
                                value={sortBy === undefined ? 'newest' : sortBy}
                                onChange={(e) => {
                                    handlerSort(e.target.value);
                                }}
                            >
                                <option className="text-sm font-medium" value="newest">
                                    Sản phẩm mới
                                </option>
                                <option className="text-sm font-medium" value="asc">
                                    Giá tăng dần
                                </option>
                                <option className="text-sm font-medium" value="desc">
                                    Giá giảm dần
                                </option>
                                <option className="text-sm font-medium" value="total_sales">
                                    Bán chạy
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
                        <div className="col-lg-12 col-md-12 article">
                            <div className="row">
                                {error && <Message variant="alert-danger">{error}</Message>}
                                {loading ? (
                                    <div className="mb-5 flex min-h-[30vh] items-center justify-center">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap justify-center">
                                        {products?.length !== 0 ? (
                                            <>
                                                {products?.map((product) => (
                                                    <div
                                                        className="col-lg-2 col-md-4 col-sm-6  pb-3"
                                                        key={product?._id}
                                                    >
                                                        <div className="border-product bg-white py-2 text-center max-md:mx-1 md:mx-2">
                                                            <Link to={`/product/${product?._id}`}>
                                                                <div className="hover:-translate-y-4 hover:transform hover:transition hover:duration-200 hover:ease-linear">
                                                                    <img
                                                                        src={`${product?.image}`}
                                                                        alt={product?.name}
                                                                        className="filter-[brightness(1)] m-auto max-md:h-[150px] md:h-[200px]"
                                                                    />
                                                                </div>
                                                                <div className="px-1 py-2">
                                                                    <p className="h-5 overflow-hidden leading-[1.2] text-[#252525]">
                                                                        {/* {product?.name} */}
                                                                        {product.name.length > 16
                                                                            ? `${product.name.substring(0, 16)}...`
                                                                            : `${product.name}`}
                                                                    </p>

                                                                    <h3 className="mt-1 text-base font-bold text-[#252525]">
                                                                        {product?.price?.toLocaleString('de-DE')}đ
                                                                    </h3>
                                                                    <Rating
                                                                        value={product?.rating}
                                                                        text={`(${product?.reviews.length})`}
                                                                    />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div className="mb-4 flex min-h-[30vh] items-center justify-center">
                                                <div className="alert-warning rounded-2xl bg-[var(--blue-color)] p-5 font-bold text-white">
                                                    Không tìm thấy sản phẩm
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {products?.length !== 0 ? (
                            <Pagination
                                pages={pages}
                                page={page}
                                category={category ? category : ''}
                                keyword={keyword ? keyword : ''}
                                sortBy={sortBy ? sortBy : ''}
                                rating={rating ? rating : ''}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProductsFilter;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { listProducts } from '~/Redux/Actions/ProductActions';
import { ListCategory } from '~/Redux/Actions/categoryActions';

import Product from '~/components/products/Product';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import Pagination from '~/components/Home/pagination';

const ProductScreen = () => {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const category = params.category;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = productDelete;
    //category
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const [kewywordSearch, setKewywordSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        if (kewywordSearch !== undefined) {
            if (kewywordSearch.trim() && kewywordSearch) {
                navigate(`/products/search/${kewywordSearch}`);
            } else {
                navigate(`/products`);
            }
        }
    };
    const handleCategory = (e) => {
        e.preventDefault();
        if (e.target.value !== undefined) {
            if (e.target.value.trim() && e.target.value) {
                navigate(`/products/category/${e.target.value}`);
            } else {
                navigate(`/products`);
            }
        }
    };
    useEffect(() => {
        dispatch(listProducts(category, keyword, pageNumber));
        dispatch(ListCategory());
    }, [dispatch, successDelete, category, keyword, pageNumber]);

    return (
        <section className="content-main bg-slate-300">
            <div className="content-header">
                <h2 className="content-title fw-bold">Sản phẩm</h2>

                <Link to="/addproduct">
                    <div className="btn fw-bold bg-blue-700 text-white">Thêm sản phẩm mới</div>
                </Link>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto ">
                            <form onSubmit={(e) => handleSearch(e)}>
                                <div className="input-group" style={{ alignItems: 'center' }}>
                                    <input
                                        type="search"
                                        placeholder="Tìm kiếm..."
                                        className="form-control p-2"
                                        onChange={(e) => {
                                            setKewywordSearch(e.target.value);
                                        }}
                                    />
                                    <button className="btn btn-light bg" type="submit" style={{ height: '42px' }}>
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => {
                                    handleCategory(e);
                                }}
                            >
                                <option value={''}> Danh mục</option>
                                {categories?.map((category) => (
                                    <option value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-12">
                                <table className="slider-data table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%' }}>Stt</th>
                                            <th style={{ width: '25%' }}>ID sản phẩm</th>
                                            <th style={{ width: '10%' }}>Ảnh</th>
                                            <th style={{ width: '30%' }}>Tên</th>
                                            <th style={{ width: '20%' }}>Giá</th>
                                            <th className="text-end" style={{ width: '10%' }}>
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <Product product={product} key={product._id} index={index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <Pagination
                        pages={pages}
                        page={page}
                        category={category ? category : ''}
                        keyword={keyword ? keyword : ''}
                    ></Pagination>
                </div>
            </div>
        </section>
    );
};

export default ProductScreen;

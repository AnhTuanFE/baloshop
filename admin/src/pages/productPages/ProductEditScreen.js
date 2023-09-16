import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import {
    editProduct,
    createOptionColor,
    updateProduct,
    updateOptionProduct,
    deleteOptionProduct,
} from '~/Redux/Actions/ProductActions';
import {
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_OPTION_RESET,
    PRODUCT_OPTIONCOLOR_RESET,
    PRODUCT_DELETE_OPTION_RESET,
    PRODUCT_DELETE_IMAGE_RESET,
} from '~/Redux/Constants/ProductConstants';
import { ListCategory } from '~/Redux/Actions/categoryActions';

import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import Toast from '~/components/LoadingError/Toast';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const ProductEditScreen = () => {
    const params = useParams();
    const productId = params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imageTemp, setImageTemp] = useState();

    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [optionId, setOptionId] = useState('');
    const [AddColor, setAddColor] = useState('');
    const [AddCountInStock, setAddCountInStock] = useState('');
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { loading, error, stateProductEdit } = productEdit;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const productColor = useSelector((state) => state.optionColorCreate);
    const { loading: loadingOption, error: errorOption, success: successOption } = productColor;
    const productOptionUpdate = useSelector((state) => state.productOptionUpdate);
    const { error: errorOptionUpdate, success: successOptionUpdate } = productOptionUpdate;

    const productOptionDelete = useSelector((state) => state.productOptionDelete);
    const { success: successDelete } = productOptionDelete;
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const productDeleteImage = useSelector((state) => state.productDeleteImage);
    const { success: successDeleteImage } = productDeleteImage;

    useEffect(() => {
        if (successOptionUpdate) {
            setCheckEdit(false);
            setCheckAdd(true);
            dispatch({ type: PRODUCT_UPDATE_OPTION_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
            dispatch(editProduct(productId));
        }
        if (successOption) {
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
            dispatch(editProduct(productId));
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_OPTION_RESET });
            toast.success('Đã xóa thành công', ToastObjects);
            dispatch(editProduct(productId));
        }
        if (successDeleteImage) {
            dispatch({ type: PRODUCT_DELETE_IMAGE_RESET });
            toast.success('Đã xóa thành công', ToastObjects);
            dispatch(editProduct(productId));
        }
    }, [successOptionUpdate, successOption, successDelete, successDeleteImage]);

    useEffect(() => {
        if (stateProductEdit.product) {
            const options = stateProductEdit?.product.optionColor?.find((option) => option._id === optionId);
            if (options) {
                setColor(options?.color);
                setCountInStock(options?.countInStock);
            }
        }
    }, [optionId]);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            toast.success('Đã cập nhật thành công', ToastObjects);
            dispatch(editProduct(productId));
        }
    }, [successUpdate]);

    useEffect(() => {
        dispatch(editProduct(productId));
    }, [productId]);

    useEffect(() => {
        if (stateProductEdit.product) {
            const { product } = stateProductEdit;
            if (Object.keys(product).length > 0) {
                setName(product.name);
                setDescription(product.description);
                setCountInStock(product.countInStock);
                setCategory(product.category);
                setImage(product.image);
                setPrice(product.price);
            }
        }
    }, [stateProductEdit]);
    useEffect(() => {
        dispatch(ListCategory());
    }, []);

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        console.log('productId = ', productId);
        console.log('name = ', name);
        console.log('price = ', price);
        console.log('category = ', category);
        console.log('description = ', description);
        console.log('image = ', image);
        let formData = new FormData();
        formData.append('id', productId);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('image', image);
        dispatch(updateProduct({ id: productId, formData: formData }));
    };
    const submitOptionHandler = (e) => {
        e.preventDefault();
        dispatch(updateOptionProduct(productId, { optionId, color, countInStock }));
    };
    const submitOptionSaveHandler = (e) => {
        e.preventDefault();
        dispatch(createOptionColor(productId, { color: AddColor, countInStock: AddCountInStock }));
        setAddColor('');
        setAddCountInStock('');
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'image',
        'link',
        'video',
        'align',
        'color',
        'background',
    ];
    return (
        <>
            <Toast />
            <section className="content-main">
                <form>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Quay lại
                        </Link>
                        <h2 className="content-title">Cập nhật sản phẩm</h2>
                        <div></div>
                    </div>

                    <div className="row mb-0">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-0 overflow-auto " style={{ height: '74vh' }}>
                                <div className="card-body shadow-sm">
                                    <div className="card-body">
                                        {error && <Message variant="alert-danger">{error}</Message>}
                                        {loading && <Loading />}
                                        <from>
                                            <div className="mb-0">
                                                <label htmlFor="product_title" className="form-label">
                                                    Tên sản phẩm
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className={`form-control`}
                                                    id="product_title"
                                                    //required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Giá
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Type here"
                                                    className={`form-control`}
                                                    id="product_price"
                                                    //required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_category" className="form-label">
                                                    Danh mục
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    //className="form-select"
                                                    className={`form-select`}
                                                    aria-label=".form-select-lg example"
                                                    //required
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    title="Please select category"
                                                    placeholder="Please select category"
                                                >
                                                    <option value={-1} selected>
                                                        Chọn
                                                    </option>
                                                    {categories?.map((cate, index) => (
                                                        <option key={index} value={cate._id}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {imageTemp ? (
                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 product_image_arr">
                                                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                        <img
                                                            className="img_css col-10 col-sm-10 col-md-10 col-lg-10"
                                                            src={imageTemp}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 product_image_arr">
                                                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                        <img
                                                            className="img_css col-10 col-sm-10 col-md-10 col-lg-10"
                                                            src={image}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mb-0">
                                                <label className="form-label">Ảnh</label>
                                                <input
                                                    className={`form-control `}
                                                    type="file"
                                                    onChange={(e) => {
                                                        setImageTemp(URL.createObjectURL(e.target.files[0]));
                                                        setImage(e.target.files[0]);
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">Nội dung</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={description}
                                                    onChange={setDescription}
                                                    modules={modules}
                                                    formats={formats}
                                                ></ReactQuill>
                                            </div>
                                            <div
                                                style={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}
                                            >
                                                <button
                                                    onClick={handleUpdateProduct}
                                                    className="btn btn-primary color-orange"
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </from>
                                    </div>
                                    <div
                                        className="card-body shadow-sm"
                                        style={{ marginTop: '10px', border: '1px solid #ccc' }}
                                    >
                                        <div className="row">
                                            {checkEdit && (
                                                <div className="col-md-3 col-lg-3">
                                                    {errorOptionUpdate && (
                                                        <Message variant="alert-danger">{errorOptionUpdate}</Message>
                                                    )}
                                                    {/* {loadingOption && <Loading />} */}
                                                    <form>
                                                        <div className="mb-0">
                                                            <label htmlFor="product_price" className="form-label">
                                                                Màu sắc
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Type here"
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={color}
                                                                onChange={(e) => setColor(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-0">
                                                            <label htmlFor="product_price" className="form-label">
                                                                Số lượng
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="Type here"
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={countInStock}
                                                                onChange={(e) => setCountInStock(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="d-grid" style={{ marginTop: '10px' }}>
                                                            <button
                                                                onClick={submitOptionHandler}
                                                                className="btn btn-primary py-2"
                                                            >
                                                                Cập nhật
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                            <div className="col-md-9 col-lg-9">
                                                <table className="slider-data table">
                                                    <thead>
                                                        <tr>
                                                            <th>Stt</th>
                                                            <th>Màu sắc</th>
                                                            <th>Số lượng</th>
                                                            <th className="text-end">Action</th>
                                                        </tr>
                                                    </thead>
                                                    {/* Table Data */}
                                                    <tbody>
                                                        {stateProductEdit?.product?.optionColor &&
                                                            stateProductEdit?.product?.optionColor?.map(
                                                                (option, index) => (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            <b>{option.color}</b>
                                                                        </td>
                                                                        <td>
                                                                            <span>{option.countInStock}</span>
                                                                        </td>
                                                                        <td className="text-end">
                                                                            <div
                                                                                style={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'right',
                                                                                }}
                                                                            >
                                                                                <button
                                                                                    className="open-option"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        setOptionId(option._id);
                                                                                        setCheckEdit(true);
                                                                                        setCheckAdd(false);
                                                                                    }}
                                                                                >
                                                                                    <i class="icon fas fa-edit"></i>
                                                                                </button>
                                                                                <button
                                                                                    className="open-option"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        if (
                                                                                            window.confirm(
                                                                                                'Are you sure??',
                                                                                            )
                                                                                        ) {
                                                                                            dispatch(
                                                                                                deleteOptionProduct(
                                                                                                    productId,
                                                                                                    option._id,
                                                                                                ),
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        class="icon fas fa-trash-alt"
                                                                                        style={{ color: 'red' }}
                                                                                    ></i>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ),
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-3 col-lg-3">
                                                {checkAdd && (
                                                    <form>
                                                        <div className="mb-0">
                                                            <label htmlFor="product_price" className="form-label">
                                                                Màu sắc
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Type here"
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={AddColor}
                                                                onChange={(e) => setAddColor(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-0">
                                                            <label htmlFor="product_price" className="form-label">
                                                                Số lượng
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="Type here"
                                                                className={`form-control`}
                                                                id="product_price"
                                                                //required
                                                                value={AddCountInStock}
                                                                onChange={(e) => setAddCountInStock(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="d-grid" style={{ marginTop: '10px' }}>
                                                            <button
                                                                onClick={submitOptionSaveHandler}
                                                                className="btn btn-primary py-2"
                                                            >
                                                                Thêm
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};
export default ProductEditScreen;

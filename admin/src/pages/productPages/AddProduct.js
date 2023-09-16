import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

import CustomQuill from '~/useHooks/CustomQuill/CustomQuill';

import { ListCategory } from '~/Redux/Actions/categoryActions';
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_OPTIONCOLOR_RESET,
    PRODUCT_CREATE_IMAGE_RESET,
    PRODUCT_EDIT_RESET,
} from '~/Redux/Constants/ProductConstants';
import { createProduct, createOptionColor, editProduct } from '~/Redux/Actions/ProductActions';

import Toast from '~/components/LoadingError/Toast';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const AddProduct = () => {
    // let uuId = uuidv4();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState();
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        if (image) {
            URL.revokeObjectURL(image);
            let url = URL.createObjectURL(image);
            setImgUrl(url);
        }
    }, [image]);
    // const [arrImage, setArrImage] = useState([]);
    const [countInStock, setCountInStock] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [productId, setProducId] = useState('');
    const [validate, setValidate] = useState({});

    const [disabledOptionColor, setDisabledOptionColor] = useState(false);
    const [disabledProduct, setDisabledProduct] = useState(true);

    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, product } = productCreate;

    const productColor = useSelector((state) => state.optionColorCreate);
    const { loading: loadingOption, error: errorOption, success: successOption } = productColor;

    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const productEdit = useSelector((state) => state.productEdit);
    const { stateProductEdit } = productEdit;

    useEffect(() => {
        if (product) {
            toast.success('Thêm sản phẩm thành công', ToastObjects);
            setProducId(product._id);
            dispatch({ type: PRODUCT_CREATE_RESET });
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            setDisabledProduct(false);
            setDisabledOptionColor(true);
        }
    }, [product]);
    useEffect(() => {
        dispatch({ type: PRODUCT_EDIT_RESET });
        dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
    }, []);

    useEffect(() => {
        if (successOption) {
            toast.success('Thêm màu sắc sản phẩm thành công', ToastObjects);
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            dispatch(editProduct(productId));
        }
    }, [successOption]);
    useEffect(() => {
        dispatch(editProduct(productId));
    }, [productId]);

    useEffect(() => {
        dispatch(ListCategory());
    }, []);

    const isEmptyCheckEdit = () => {
        const msg = {};
        if (isEmpty(category)) {
            msg.category = 'Vui lòng nhập loại sản phẩm';
            msg.borderRed1 = 'border-red';
        }
        if (isEmpty(name)) {
            msg.name = 'Vui lòng nhập tên sản phẩm';
            msg.borderRed2 = 'border-red';
        }
        if (isEmpty(price)) {
            msg.price = 'Vui lòng nhập giá sản phẩm';
            msg.borderRed3 = 'border-red';
        } else {
            if (price < 0) {
                msg.price = 'Vui lòng nhập giá trị dương';
                msg.borderRed3 = 'border-red';
            }
        }
        // if (isEmpty(image)) {
        //     msg.image = 'Vui lòng nhập hình ảnh sản phẩm';
        //     msg.borderRed4 = 'border-red';
        // }
        if (isEmpty(description)) {
            msg.description = 'Vui lòng nhập mô tả sản phẩm';
            msg.borderRed6 = 'border-red';
        }
        setValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isEmptyValidate = isEmptyCheckEdit();
        if (!isEmptyValidate) return;
        if (category !== -1) {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            // formData.append('countInStock', countInStock);
            formData.append('image', image);
            dispatch(createProduct(formData));
            // dispatch(createProduct(name, price, description, category, image, countInStock));
        }
    };
    const submitOptionHandler = (e) => {
        e.preventDefault();
        dispatch(createOptionColor(productId, { color, countInStock }));
        setCountInStock('');
        setColor('');
    };
    const handleResetForAddProductOther = () => {
        dispatch({ type: PRODUCT_EDIT_RESET });
        dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
        dispatch({ type: PRODUCT_CREATE_RESET });
        setName('');
        setPrice('');
        setCategory('');
        setImage();
        setImgUrl('');
        setCountInStock('');
        setColor('');
        setDescription('');
        setProducId('');
        setValidate({});
        setDisabledOptionColor(false);
        setDisabledProduct(true);
    };
    console.log('stateProductEdit = ', stateProductEdit);
    return (
        <>
            <Toast />
            <section className="content-main">
                <form>
                    <div className="d-flex justify-content-between">
                        <div className="content-header">
                            <h2 className="content-title">Thêm sản phẩm</h2>
                        </div>
                        <div>
                            <button
                                onClick={handleResetForAddProductOther}
                                className="btn btn-primary color-orange mr-5 py-2"
                            >
                                Thêm sản phẩm khác
                            </button>
                        </div>
                    </div>

                    <div className="row my-0">
                        <div className=" col-lg-12" style={{ boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.24) inset' }}>
                            <div
                                className="card my-2 overflow-y-auto border-none"
                                style={{
                                    height: '74vh',
                                }}
                            >
                                <div className="card-body p-0">
                                    <div className="card-body -z-10 border">
                                        {error && <Message variant="alert-danger">{error}</Message>}
                                        {loading && <Loading />}
                                        <from>
                                            <div className="mb-0">
                                                <label htmlFor="product_title" className="form-label">
                                                    Tên sản phẩm
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Tên sản phẩm"
                                                    className={`form-control ${validate.borderRed2}`}
                                                    id="product_title"
                                                    //required
                                                    value={name}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed2 = '';
                                                            x.name = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.name}</p>
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Giá
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Giá sản phẩm"
                                                    className={`form-control ${validate.borderRed3}`}
                                                    id="product_price"
                                                    //required
                                                    value={price}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed3 = '';
                                                            x.price = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.price}</p>
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_category" className="form-label">
                                                    Danh mục
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    className={`form-select ${validate.borderRed1}`}
                                                    aria-label=".form-select-lg example"
                                                    value={category}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed1 = '';
                                                            x.category = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    title="Please select category"
                                                    placeholder="Vui lòng chọn thể loại hàng"
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
                                                <p className="product_validate">{validate.category}</p>
                                            </div>
                                            {/* ================== start image ================ */}
                                            <div className="mb-0">
                                                <label className="form-label">Ảnh</label>
                                                <div className="row">
                                                    {image && (
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 product_image_arr">
                                                            <div
                                                                className="row"
                                                                style={{ display: 'flex', flexWrap: 'wrap' }}
                                                            >
                                                                <img
                                                                    className="img_css col-10 col-sm-10 col-md-10 col-lg-10"
                                                                    src={imgUrl}
                                                                    alt="product img"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            setImage(e.target.files[0]);
                                                        }}
                                                        className="form-control"
                                                    ></input>
                                                </div>
                                            </div>
                                            {/* ================== start image ================ */}

                                            <div className="mb-0">
                                                <label className="form-label">Nội dung</label>
                                                <div
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed6 = '';
                                                            x.description = '';
                                                            return x;
                                                        });
                                                    }}
                                                    style={{ width: '100%' }}
                                                >
                                                    <CustomQuill
                                                        theme="snow"
                                                        placeholder="Type here"
                                                        value={description}
                                                        onChange={(e) => setDescription(e)}
                                                    />
                                                </div>
                                                <p className="product_validate">{validate.description}</p>
                                            </div>
                                            <div className="d-flex justify-content-end mt-3">
                                                {disabledProduct && (
                                                    <>
                                                        <button className="btn btn-primary  " onClick={submitHandler}>
                                                            Lưu
                                                        </button>
                                                        <Link to="/products" className="btn btn-danger ml-2 text-white">
                                                            Trở về
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </from>
                                    </div>
                                    <div className="card-body mt-1 border ">
                                        <div className="row">
                                            <div className="col-md-4 col-lg-4">
                                                {errorOption && (
                                                    <Message variant="alert-danger">
                                                        Màu bị trùng hoặc số lượng chưa đúng vui lòng nhập lại
                                                    </Message>
                                                )}
                                                <form>
                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Màu sắc
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={color}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setColor(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            Số lượng
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder=""
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={countInStock}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setCountInStock(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="d-grid" style={{ marginTop: '10px' }}>
                                                        {disabledOptionColor && (
                                                            <button
                                                                onClick={submitOptionHandler}
                                                                className="btn btn-primary color-orange py-2"
                                                            >
                                                                Lưu
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-8 col-lg-8">
                                                <table className="slider-data table">
                                                    <thead>
                                                        <tr>
                                                            <th>Stt</th>
                                                            <th>Màu sắc</th>
                                                            <th>Số lượng</th>
                                                        </tr>
                                                    </thead>
                                                    {/* Table Data */}
                                                    <tbody>
                                                        {stateProductEdit?.product?.optionColor &&
                                                            stateProductEdit?.product?.optionColor?.map(
                                                                (option, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            <b>{option.color}</b>
                                                                        </td>
                                                                        <td>
                                                                            <span>{option.countInStock}</span>
                                                                        </td>
                                                                    </tr>
                                                                ),
                                                            )}
                                                    </tbody>
                                                </table>
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

export default AddProduct;

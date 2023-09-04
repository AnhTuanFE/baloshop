import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '~/Redux/Actions/ProductActions';

const Product = (props) => {
    const { product, index } = props;
    const dispatch = useDispatch();

    const deletehandler = (id) => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            {product && (
                <tr className="text-center">
                    <td style={{ width: '5%' }}>{index + 1}</td>
                    <td style={{ width: '25%' }}>
                        <span> {product._id}</span>
                    </td>
                    <td style={{ width: '10%' }}>
                        <img
                            src={`${product?.image[0].urlImage}`}
                            alt="Product"
                            style={{ height: '40px', width: '40px' }}
                        />
                    </td>
                    <td style={{ width: '30%' }}>
                        <span> {product.name}</span>
                    </td>
                    <td style={{ width: '20%' }}>
                        <span> {product?.price?.toLocaleString('de-DE')}đ</span>
                    </td>
                    {/* <td>
                        <span> {product.countInStock}</span>
                    </td> */}
                    <td className="text-end" style={{ width: '10%' }}>
                        <div className="d-flex">
                            <Link to={`/product/${product._id}/edit`} className="dropdown-item">
                                Sửa
                            </Link>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    deletehandler(product._id);
                                }}
                            >
                                Xóa
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default Product;

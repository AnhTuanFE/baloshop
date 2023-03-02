import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ListProductAll } from '~/redux/Actions/ProductActions';
import clsx from 'clsx';
// import styles from './HomeComponentCSS/Navbar.module.scss';
function ListAllProducts() {
    // const dispatch = useDispatch();
    // const listProducts = useSelector((state) => state.allProduct);
    // const { allProduct } = listProducts;
    // console.log('đây là data thể loại', allProduct);
    // useEffect(() => {
    //     dispatch(listProduct());
    // }, []);
    // ==============
    const allProduct = useSelector((state) => state.productAll);
    const { products, loading } = allProduct;
    console.log('đây là data thể loại', products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);
    //===============
    // const allPro = useSelector((state) => state.productAll);
    // const { product, loading } = allPro;
    // console.log('đây là data thể loại', product);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(ListProductAll());
    // });
    return (
        <div>
            <h1> Chào chị em</h1>
        </div>
    );
}

export default ListAllProducts;

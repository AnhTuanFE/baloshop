import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ListCategory } from '~/redux/Actions/categoryActions';
// import { listProduct } from '~/redux/Actions/ProductActions';
import clsx from 'clsx';
import styles from './HomeComponentCSS/Navbar.module.scss';
export default function NavBar({ onRemove }) {
    const dispatch = useDispatch();
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    console.log('đây là data thể loại', categories);
    useEffect(() => {
        dispatch(ListCategory());
    }, []);
    return (
        <>
            {/* Pc-navbar */}
            <div className={clsx(styles.navbar_menu)}>
                <ul className={clsx(styles.navbar_list)}>
                    {categories.map((category) => (
                        <li className={clsx(styles.navbar_list_li)}>
                            <Link to={`/category/${category._id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* tablet-mobile modal */}
            {/* <div className="navbar-tablet">
                <div className="modal-tablet"></div>
                <div className="modal-nav">
                    <div className="modal-nav__img">
                        <img src="/images/logo2.png" alt=""></img>
                    </div>
                    <ul className="modal-nav__list">
                        {categories.map((category) => (
                            <Link to={`/category/${category._id}`}>
                                <li className="navbar-list__li" onClick={onRemove}>
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className="modal-icon" onClick={onRemove}>
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>
            </div> */}
        </>
    );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListCategory } from '~/redux/Actions/ProductActions';
import { productsRemainingSelector } from '~/redux/Selector/productsSelector';
import { Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';

export default function NavBar() {
    const dispatch = useDispatch();
    const { CategoryList } = useSelector(productsRemainingSelector);
    const { categories } = CategoryList;
    useEffect(() => {
        dispatch(ListCategory());
    }, []);
    return (
        <>
            {/* Pc-navbar */}
            <div className="w-1/2">
                <Menu mode="horizontal" className="bg-[#f4f4f4]">
                    {categories.map((category, index) => (
                        <MenuItem key={index}>
                            <Link className="font-medium uppercase" to={`/category/${category._id}`}>
                                {category.name}
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
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

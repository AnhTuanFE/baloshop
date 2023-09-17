import { Link, NavLink } from 'react-router-dom';
import { logoDefaul } from '~/data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUsers,
    faCartShopping,
    faCartPlus,
    faRectangleList,
    faBagShopping,
    faImages,
} from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

const Sidebar = () => {
    return (
        <aside className="navbar-aside shadow-none">
            <div className="aside-top" style={{ padding: '11px' }}>
                <Link to="/" className="brand-wrap">
                    <img
                        src={logoDefaul}
                        style={{ height: '84' }}
                        className="logo"
                        alt="Ecommerce dashboard template"
                    />
                </Link>
            </div>

            <nav>
                <ul className="menu-aside mt-7 ">
                    <li className="menu-item ">
                        <NavLink activeClassName="active" className="menu-link " to="/" exact={true}>
                            <FontAwesomeIcon className="icon" icon={faHouse} />
                            <span className="text ">Trang chủ</span>
                        </NavLink>
                    </li>
                    <li className="menu-item ">
                        <NavLink activeClassName="active" className="menu-link " to="/products">
                            <FontAwesomeIcon className="icon" icon={faCartShopping} />
                            <span className="text ">Sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/addproduct">
                            <FontAwesomeIcon className="icon" icon={faCartPlus} />
                            <span className="text">Thêm sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/category">
                            <FontAwesomeIcon className="icon" icon={faRectangleList} />
                            <span className="text ">Danh mục sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/orders">
                            <FontAwesomeIcon className="icon" icon={faBagShopping} />
                            <span className="text ">Đơn hàng</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/users">
                            <FontAwesomeIcon className="icon" icon={faUsers} />
                            <span className="text ">Người dùng</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/comment">
                            <i class="icon fas fa-comments"></i>
                            <span className="text ">Bình luận</span>
                        </NavLink>
                    </li>
                    {/* <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link bg-blue-900" to="/news">
                            <i class="icon fas fa-newspaper"></i>
                            <span className="text text-white">Tin tức</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link bg-blue-900" to="/addnews">
                            <i class="icon fas fa-newspaper"></i>
                            <span className="text text-white">Thêm tin tức</span>
                        </NavLink>
                    </li> */}
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/slider">
                            <FontAwesomeIcon className="icon" icon={faImages} />
                            <span className="text ">Ảnh Bìa</span>
                        </NavLink>
                    </li>
                </ul>
                <br />
                <br />
            </nav>
        </aside>
    );
};

export default Sidebar;

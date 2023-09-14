import { Link, NavLink } from 'react-router-dom';
import { logoDefaul } from '~/data/data';
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
                            <i className="icon fas fa-home"></i>
                            <span className="text ">Trang chủ</span>
                        </NavLink>
                    </li>
                    <li className="menu-item ">
                        <NavLink activeClassName="active" className="menu-link " to="/products">
                            <i className="icon fas fa-shopping-bag"></i>
                            <span className="text ">Sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/addproduct">
                            <i className="icon fas fa-cart-plus"></i>
                            <span className="text">Thêm sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/category">
                            <i className="icon fas fa-list"></i>
                            <span className="text ">Danh mục sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/orders">
                            <i className="icon fas fa-bags-shopping"></i>
                            <span className="text ">Đơn hàng</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/users">
                            <i className="icon fas fa-user"></i>
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
                            <i className="icon fas fa-store-alt"></i>
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

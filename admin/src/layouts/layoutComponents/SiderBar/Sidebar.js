import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoDefaul } from '~/data/data';
import { logout } from '~/Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <aside className="navbar-aside border-none bg-blue-700 shadow-none">
            <div className="aside-top  bg-blue-100" style={{ padding: '0.65rem 0.5rem' }}>
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
                <ul className="menu-aside mt-7">
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/" exact={true}>
                            <i className="icon fas fa-home"></i>
                            <span className="text text-white">Trang chủ</span>
                        </NavLink>
                    </li>
                    <li className="menu-item ">
                        <NavLink activeClassName="active" className="menu-link " to="/products">
                            <i className="icon fas fa-shopping-bag"></i>
                            <span className="text text-white">Sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/addproduct">
                            <i className="icon fas fa-cart-plus"></i>
                            <span className="text text-white">Thêm sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/category">
                            <i className="icon fas fa-list"></i>
                            <span className="text text-white">Danh mục sản phẩm</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/orders">
                            <i className="icon fas fa-bags-shopping"></i>
                            <span className="text text-white">Đơn hàng</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/users">
                            <i className="icon fas fa-user"></i>
                            <span className="text text-white">Người dùng</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/comment">
                            <i class="icon fas fa-comments"></i>
                            <span className="text text-white">Bình luận</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink activeClassName="active" className="menu-link " to="/slider">
                            <i className="icon fas fa-store-alt"></i>
                            <span className="text text-white">Ảnh Bìa</span>
                        </NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink onClick={logoutHandler} activeClassName="active" className="menu-link " to="/news">
                            <i class="icon fas fa-newspaper"></i>

                            <span className="text text-white">Đăng xuất</span>
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

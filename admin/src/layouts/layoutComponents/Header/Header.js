import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/Redux/Actions/userActions';
import { imageDefaul } from '~/data/data';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;
    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="main-header navbar header-color">
            <div className="col-search"></div>
            <div className="col-nav">
                <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside">
                    <i className="md-28 fas fa-bars"></i>
                </button>
                <ul className="nav">
                    <li className="dropdown nav-item">
                        <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                            <img
                                className="img-xs"
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                }}
                                src={`${
                                    userInfo?.image === undefined ? imageDefaul : userInfo?.image?.urlImageCloudinary
                                }`}
                                alt="User"
                            />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link onClick={logoutHandler} className="dropdown-item text-danger" to="#">
                                Đăng xuất
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

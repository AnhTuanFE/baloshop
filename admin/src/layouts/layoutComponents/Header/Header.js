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
        <header className="main-header navbar justify-content-end border-none bg-blue-100">
            <div className="col-nav">
                <button className="btn btn-icon btn-mobile me-auto">
                    <i className="md-28 fas fa-bars"></i>
                </button>
                <div class="dropdown">
                    <Link
                        className="dropdown-toggle d-flex align-items-center "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        to="#"
                    >
                        <img
                            className="img-xs"
                            style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                border: '1px solid #ccc',
                            }}
                            src={`${userInfo?.image === undefined ? imageDefaul : userInfo?.image?.urlImageCloudinary}`}
                            alt="User"
                        />
                    </Link>
                    <ul className="dropdown-menu" style={{ left: '-100px' }}>
                        <li>
                            <Link onClick={logoutHandler} className="dropdown-item text-center" to="#">
                                <span>Đăng xuất</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;

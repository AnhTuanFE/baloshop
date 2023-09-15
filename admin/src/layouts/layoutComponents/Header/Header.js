import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/Redux/Actions/userActions';
import { imageDefaul, logoDefaul } from '~/data/data';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <header className="main-header z-2 justify-content-end navbar border-none">
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
                            src={`${userInfo?.image === undefined ? imageDefaul : userInfo?.image}`}
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

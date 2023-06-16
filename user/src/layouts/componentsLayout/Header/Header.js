import { useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import NavBar from '~/components/HomeComponent/NavBar/Navbar';
// import ContactInformation from '../ContactInformation';

import { logout, getUserDetails } from '~/redux/Actions/userActions'; //updateUserProfile,

import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { cartsRemainingSelector } from '~/redux/Selector/cartsSelector';
import { imageDefaul, logoDefaul } from '~/utils/data';
const Header = (props) => {
    const { keysearch } = props;
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const { cart } = useSelector(cartsRemainingSelector);
    const { cartItems } = cart;

    const { userLogin, userDetails } = useSelector(usersRemainingSelector);
    const { userInfo } = userLogin;
    const { user } = userDetails;

    const [checkScroll, setCheckScroll] = useState(false);
    const [key, setKey] = useState([]);

    useEffect(() => {
        const getSearch = JSON.parse(localStorage.getItem('keySearch'));
        if (getSearch !== null) {
            if (getSearch.length > 4) {
                getSearch.shift();
                setKey([...getSearch]);
            } else {
                setKey([...getSearch]);
            }
        }
    }, [keyword]);

    useEffect(() => {
        setKeyword(keysearch);
    }, [keysearch]);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword !== undefined) {
            if (keyword.trim() && keyword) {
                localStorage.setItem('keySearch', JSON.stringify([...key, keyword]));
                navigate(`/search/${keyword}`);
            } else {
                navigate('/');
            }
        }
    };

    useEffect(() => {
        dispatch(getUserDetails());
    }, [userInfo]);

    useEffect(() => {
        if (user?.disabled) {
            alert(
                'Tài khoản đã bị khóa, vui lòng liên hệ sđt 0946402578 hay email balostore.owner@gmail.com để mở khóa.',
            );
            dispatch(logout());
            navigate('/');
        }
    }, [user]);

    function avatarUser() {
        const stringUser = userInfo.name;
        const value = stringUser.slice(0, 1);
        return value;
    }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    function notiUser() {
        let returnUser;
        const valueUser = userInfo.name;
        if (valueUser?.length > 15) {
            const arrayUser = valueUser.split(' ');
            returnUser = arrayUser[0];
        } else {
            returnUser = valueUser;
        }
        return returnUser;
    }

    window.addEventListener('scroll', () => {
        const x = Math.floor(window.pageYOffset);
        if (x > 300) {
            setCheckScroll(true);
        } else {
            setCheckScroll(false);
        }
    });

    const handlerScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div>
                {/* <ContactInformation /> */}
                <div className={clsx(styles.header)}>
                    <div className={clsx(styles.container)}>
                        <div className={clsx(styles.pc_header)}>
                            <div className="row flex-nowrap justify-content-start align-items-center">
                                <div className={clsx(styles.header_logo)}>
                                    <Link className={clsx(styles.navbar_brand)} to="/">
                                        <img alt="logo" src={logoDefaul} />
                                    </Link>
                                </div>

                                <div className="col-md-7 col-4 d-flex justify-content-between align-items-center">
                                    <form onSubmit={submitHandler} className={clsx(styles.input_group)}>
                                        <input
                                            type="search"
                                            placeholder="Tìm kiếm..."
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            className="form-control "
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            // aria-expanded="false"
                                        />
                                        <button type="submit" className={clsx(styles.search_button)}>
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                                className={clsx(styles.submit_search)}
                                            />
                                        </button>
                                    </form>
                                    <NavBar />
                                </div>
                                <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                    {userInfo ? (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle name-button__user"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <img
                                                    src={`${
                                                        userInfo?.image?.urlImageCloudinary === undefined
                                                            ? imageDefaul
                                                            : userInfo?.image?.urlImageCloudinary
                                                    }`}
                                                    alt=""
                                                    style={{
                                                        height: '45px',
                                                        width: '45px',
                                                        borderRadius: '100%',
                                                        objectFit: 'cover',
                                                        flexShrink: '0',
                                                    }}
                                                    className="fix-none"
                                                />
                                                <span className="name-button__p ps-1">{notiUser()}</span>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link
                                                    className="dropdown-item"
                                                    style={{ textTransform: 'capitalize' }}
                                                    to="/profile"
                                                >
                                                    Tài khoản của tôi
                                                </Link>

                                                <Link
                                                    className="dropdown-item"
                                                    to="#"
                                                    style={{ textTransform: 'capitalize' }}
                                                    onClick={logoutHandler}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Link
                                                to="/register"
                                                style={{ textTransform: 'capitalize', fontWeight: '600' }}
                                                className={clsx(styles.user_Button)}
                                            >
                                                Đăng kí
                                            </Link>
                                            <Link
                                                to="/login"
                                                style={{ textTransform: 'capitalize', fontWeight: '600' }}
                                                className={clsx(styles.user_Button)}
                                            >
                                                Đăng nhập
                                            </Link>
                                        </>
                                    )}

                                    <Link to="/cart" className={clsx(styles.user_Button)}>
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className={clsx(styles.badge)}>{cartItems ? cartItems?.length : 0}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back-to-top" onClick={handlerScroll} style={checkScroll ? {} : { display: 'none' }}>
                <i class="fas fa-chevron-double-up"></i>
            </div>
        </>
    );
};

export default memo(Header);

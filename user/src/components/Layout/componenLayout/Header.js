// // import React, { useEffect, useState } from "react";
// // import { Link, useHistory } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./cssComponentLayout/Header.module.scss";

// const Header = (props) => {
//   // clsx cho phép tạo 1 class lúc có lúc ko
//   //  biến true đằng sau cho phép nhận từ props
//   const classes = clsx(styles.header, {
//     [styles.primary]: true,
//   });
//    return (
//     <div className={classes}>
//       <div className={clsx(styles.wrap_header)}>
//         <div className={clsx(styles.header_logo)}>
//           <a href="/"><img src="/images/logo2.png" alt="LOGO"/></a>
//         </div>

//         <div className={clsx(styles.wrap_find)}>
//           <div className={clsx(styles.wrap_find)}>
//             <input
//               placeholder="Tìm kiếm"
//               className={clsx(styles.input_find)}
//             ></input>
//             <button className={clsx(styles.search_button)}>
//               <FontAwesomeIcon icon={faMagnifyingGlass} />
//             </button>
//           </div>
//         </div>

//         <div className={clsx(styles.wrap_button)}>
//           <button className={clsx(styles.button_guess)}>Đăng ký</button>
//           <button className={clsx(styles.button_guess)}>Đăng nhập</button>
//           <button className={clsx(styles.button_guess)}>Giỏ hàng</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

// ===================================
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout,  getUserDetails } from '~/redux/Actions/userActions';//updateUserProfile,
// import { listCart } from '~/redux/Actions/cartActions';
// import { ListAvatar } from '~/redux/Actions/avatarAction';
// import NavBar from '~/components/Layout/componenLayout/navbar.js';
// import NavBar from '~/components/HomeComponent/navbar.js';

// import Suggestions from "~/components/HomeComponent/Suggestions";
// import './suggestions/style.css';

const Header = (props) => {
    // const { keysearch } = props;
    // const [keyword, setKeyword] = useState('');
    // const [navbar, setNavbar] = useState(false);
    // const dispatch = useDispatch();
    // let history = useHistory();
    // const cart = useSelector((state) => state.cart);
    // const { cartItems } = cart;
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    // const { error } = userLogin;
    // const userDetail = useSelector((state) => state.userDetails);
    // const { user } = userDetail;

    // const [checkScroll, setCheckScroll] = useState(false);
    // const [key, setKey] = useState([]);

    // useEffect(() => {
    //     const getSearch = JSON.parse(localStorage.getItem('keySearch'));
    //     if (getSearch !== null) {
    //         if (getSearch.length > 4) {
    //             getSearch.shift();
    //             setKey([...getSearch]);
    //         } else {
    //             setKey([...getSearch]);
    //         }
    //     }
    // }, [keyword]);

    // useEffect(() => {
    //     setKeyword(keysearch);
    // }, [keysearch]);

    // const clickIconNavBar = () => {
    //     setNavbar(true);
    // };
    // const removeNavBar = () => {
    //     setNavbar(false);
    // };
    // const logoutHandler = () => {
    //     dispatch(logout());
    //     history.push('/');
    // };
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     if (keyword !== undefined) {
    //         if (keyword.trim() && keyword) {
    //             localStorage.setItem('keySearch', JSON.stringify([...key, keyword]));
    //             history.push(`/search/${keyword}`);
    //         } else {
    //             history.push('/');
    //         }
    //     }
    // };

    // useEffect(() => {
    //     dispatch(getUserDetails());
    // }, [userInfo]);

    // useEffect(() => {
    //     if (user?.disabled) {
    //         alert('Tài khoản đã bị khóa, vui lòng liên hệ sđt 0946402578 hay email balostore.owner@gmail.com để liên hệ lấy lại.');
    //         dispatch(logout());
    //         history.push('/');
    //     }
    // }, [user]);

    // function avatarUser() {
    //     const stringUser = userInfo.name;
    //     const value = stringUser.slice(0, 1);
    //     return value;
    // }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    // function notiUser() {
    //     let returnUser;
    //     const valueUser = userInfo.name;
    //     if (valueUser?.length > 15) {
    //         const arrayUser = valueUser.split(' ');
    //         returnUser = arrayUser[0];
    //     } else {
    //         returnUser = valueUser;
    //     }
    //     return returnUser;
    // }

    // window.addEventListener('scroll', () => {
    //     const x = Math.floor(window.pageYOffset);
    //     if (x > 300) {
    //         setCheckScroll(true);
    //     } else {
    //         setCheckScroll(false);
    //     }
    // });

    // const handlerScroll = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };
    return (
        <>
            <div>
                <div className={clsx(styles.header)}>
                    <div className={clsx(styles.container)}>
                        <div className={clsx(styles.pc_header)}>
                            <div className="row">
                                <div className="col-md-3 col-4 d-flex align-items-center">
                                    <Link className={clsx(styles.navbar_brand)} to="/">
                                        <img alt="logo" src="/images/logo2.png" />
                                    </Link>
                                </div>
                                <div className="col-md-6 col-8 header-nav__search">
                                    <form /*onSubmit={submitHandler}*/ /* className="input-group__search"*/className={clsx(styles.input_group)}  >
                                        <input
                                            type="search"
                                            placeholder="Tìm kiếm"
                                            // value={keyword}
                                            // onChange={(e) => setKeyword(e.target.value)}
                                            className="form-control rounded search button-search dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            // aria-expanded="false"
                                        />
                                        <button type="submit" className={clsx(styles.search_button)}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className={clsx(styles.submit_search)}/>
                                        </button>
                                        <div className="dropdown-menu input-group__search">
                                            {/* <Suggestions /> */}
                                        </div>
                                    </form>
                                    {/* <NavBar></NavBar> */}
                                </div>
                                <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                    {/* { userInfo ? (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle name-button__user"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <img
                                                    src={ 'images/user.png'
                                                    //   `/${
                                                    //     userInfo?.image === undefined
                                                    //         ? 'images/user.png'
                                                    //         : `userProfile/${userInfo?.image}`
                                                    // }`
                                                  } // upload ảnh
                                                    alt="user"
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
                                                    // onClick={logoutHandler}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </div>
                                        </div>
                                    ) : ( */}
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
                                    {/* )} */}

                                    <Link to="/cart" className={clsx(styles.user_Button)}>
                                        <i className="fas fa-shopping-bag"></i>
                                        {/* <span className="badge">{cartItems ? cartItems?.length : 0}</span> */}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="back-to-top" onClick={handlerScroll} style={checkScroll ? {} : { display: 'none' }}>
                <i class="fas fa-chevron-double-up"></i>
            </div> */}
        </>
    );
};

export default Header;




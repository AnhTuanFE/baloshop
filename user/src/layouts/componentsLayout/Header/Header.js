import { Box, Typography, Avatar, TextField, MenuItem, Autocomplete } from '@mui/material';
import { Search, LocalMall } from '@mui/icons-material';
import { useEffect, useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar/Navbar';
import ContactInformation from '../ContactInformation/ContactInformation';
import { logout, getUserDetails } from '~/redux/Actions/userActions'; //updateUserProfile,
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { cartsRemainingSelector } from '~/redux/Selector/cartsSelector';
import { imageDefaul, logoDefaul } from '~/utils/data';
import { Badge, Space, Divider, Select } from 'antd';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(props) {
    const { keysearch } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [key, setKey] = useState([]);

    const { cart } = useSelector(cartsRemainingSelector);
    const { cartItems } = cart;

    const { userLogin, userDetails } = useSelector(usersRemainingSelector);
    const { userInfo } = userLogin;
    const { user } = userDetails;

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
    const UINotLogin = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    paddingTop: '12px',
                }}
            >
                <Typography
                    align="center"
                    sx={{
                        fontSize: '16px',
                        verticalAlign: 'center',
                        fontWeight: 'bold',
                        margin: 'auto',
                    }}
                    className="hidden py-1 pr-2 md:block"
                >
                    <Link to="/login">Đăng nhập</Link>
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        margin: '0px 8px',
                        fontSize: '16px',
                        verticalAlign: 'center',
                        fontWeight: 'bold',
                        margin: 'auto',
                    }}
                    className="hidden py-1 pl-2 md:block"
                >
                    <Link to="/register">Đăng ký</Link>
                </Typography>
                <div className=" m-auto items-center md:hidden">
                    <Link to="/login">
                        <p className="text-sm font-bold">Đăng nhập</p>
                    </Link>
                </div>
            </Box>
        );
    };
    const handleChangeAntd = (e) => {
        if (e == 'account') {
            navigate('/profile');
        }
        if (e == 'logout') {
            logoutHandler();
            navigate('/');
        }
        console.log('e = ', e);
    };
    const UILogined = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                }}
                className=""
            >
                <Link className="cursor-pointer pl-2" to={'/profile'}>
                    <Avatar
                        id="simple-select"
                        alt="Remy Sharp"
                        src={`${userInfo?.image === undefined ? imageDefaul : userInfo?.image}`}
                        className=" mr-1 h-[48px] w-[48px] md:mt-2"
                    />
                </Link>
                <Box className="z-[2] mt-3">
                    <Select
                        className="hidden w-[120px] sm:block [&_.anticon-down]:pt-2"
                        value={notiUser()}
                        onChange={handleChangeAntd}
                        options={[
                            {
                                value: 'account',
                                label: 'Tài khoản',
                            },
                            {
                                value: 'logout',
                                label: 'Đăng xuất',
                            },
                        ]}
                    />
                </Box>
                <Link to="/cart">
                    <Space size="middle" className="ml-1 max-sm:mt-2 sm:mt-5">
                        <Badge count={cartItems ? cartItems?.length : 0}>
                            <LocalMall
                                fontSize="medium"
                                sx={{
                                    color: 'black',
                                }}
                            />
                        </Badge>
                    </Space>
                </Link>
            </Box>
        );
    };

    // =================
    return (
        <Box
            sx={{
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            }}
            className="fixed left-0 right-0 top-0 z-10 bg-[var(--content-color)]"
        >
            <ContactInformation />
            <div className="flex justify-between pt-2 max-md:px-5 md:px-20 ">
                <div className="">
                    <Link to={'/'}>
                        <img
                            alt="Logo"
                            src={logoDefaul}
                            className="hidden md:block  md:h-[40px] md:w-[70px] lg:h-[60px] lg:w-[160px]"
                        />
                    </Link>
                </div>
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="flex justify-center">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={key}
                                size="small"
                                className="w-[200px]  max-use400:w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px]"
                                onChange={(e) => {
                                    setKeyword(e.target.outerText);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={(e) => {
                                            setKeyword(e.target.value);
                                        }}
                                        className="bg-[var(--white-color)]"
                                        {...params}
                                        label="Tìm kiếm"
                                    />
                                )}
                            />
                            <button
                                type="submit"
                                style={{
                                    borderRadius: '0px 4px 4px 0px',
                                }}
                                className="bg-[var(--main-color)] px-3.5 text-white hover:bg-[var(--main-color-hover)]"
                            >
                                <FontAwesomeIcon className="text-xl" icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <NavBar />
                    </div>
                </div>
                <Box>{userInfo ? <UILogined /> : <UINotLogin />}</Box>
            </div>
        </Box>
    );
}
export default Header;

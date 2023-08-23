import { Box, IconButton, Typography, Avatar, TextField, MenuItem, Select, Autocomplete } from '@mui/material';
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
import { Badge, Space, Divider } from 'antd';
import { shadow } from 'pdfjs-dist';

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
                        fontSize: '18px',
                        verticalAlign: 'center',
                        fontWeight: 'bold',
                        padding: '4px 0px',
                        margin: 'auto',
                    }}
                >
                    <Link to="/login">Đăng nhập</Link>
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        margin: '0px 8px',
                        fontSize: '18px',
                        verticalAlign: 'center',
                        fontWeight: 'bold',
                        padding: '4px 0px',
                        margin: 'auto',
                    }}
                >
                    <Link to="/register">Đăng ký</Link>
                </Typography>
            </Box>
        );
    };
    const UILogined = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                }}
                className="relative"
            >
                <Avatar
                    id="simple-select"
                    alt="Remy Sharp"
                    src={`${
                        userInfo?.image?.urlImageCloudinary === undefined
                            ? imageDefaul
                            : userInfo?.image?.urlImageCloudinary
                    }`}
                    sx={{ width: 48, height: 48 }}
                    className="!absolute z-[1] ml-12 mt-2"
                />
                <Box className="z-[2] mt-3 pl-12">
                    <Select
                        disableUnderline
                        id="simple-select"
                        sx={{
                            width: '200px',
                            padding: '8px 0px',
                            paddingTop: '4px',
                        }}
                        value={10}
                        variant="standard"
                    >
                        <MenuItem
                            value={10}
                            sx={{
                                display: 'none',
                            }}
                        >
                            <span className="ml-[60px]">{notiUser()}</span>
                        </MenuItem>
                        <Link to="/profile">
                            <MenuItem value={20}>Tài khoản của tôi</MenuItem>
                        </Link>
                        <MenuItem value={30} onClick={logoutHandler}>
                            <Link to="#">Đăng xuất</Link>
                        </MenuItem>
                    </Select>
                </Box>

                <Link to="/cart">
                    <Space size="middle" className="ml-1 mt-3">
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                }}
            >
                <Box
                    sx={{
                        flex: '1',
                        marginLeft: '128px',
                    }}
                >
                    <Link to={'/'}>
                        <img alt="Logo" src={logoDefaul} style={{ width: '160px' }} />
                    </Link>
                </Box>
                <Box
                    sx={{
                        flex: '3',
                    }}
                >
                    <form onSubmit={submitHandler}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={key}
                                className="z-30 w-[70%] rounded-md border-none outline-lime-950 focus:border-none"
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
                            <IconButton
                                aria-label="search"
                                size="large"
                                type="submit"
                                sx={{
                                    bgcolor: 'var(--main-color)',
                                    borderRadius: '4px 8px 8px 4px',
                                    padding: '0px 10px',
                                    height: '54px',
                                    '&:hover': {
                                        bgcolor: 'var(--color-button2)',
                                    },
                                }}
                            >
                                <Search
                                    fontSize="large"
                                    sx={{
                                        color: 'var(--white-color)',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </form>
                    <div className="flex justify-center">
                        <NavBar />
                    </div>
                </Box>
                <Box
                    sx={{
                        flex: '1',
                        marginRight: '40px',
                    }}
                >
                    {userInfo ? <UILogined /> : <UINotLogin />}
                </Box>
            </Box>
        </Box>
    );
}
export default Header;

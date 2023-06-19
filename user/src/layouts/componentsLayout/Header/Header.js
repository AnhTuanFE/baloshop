import { Box, IconButton, Typography, Avatar, TextField, MenuItem, Select, Autocomplete } from '@mui/material';
import { Search, LocalMall } from '@mui/icons-material';
import clsx from 'clsx';
import styles from './Header.module.css';
import { useEffect, useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '~/components/HomeComponent/NavBar/Navbar';
import ContactInformation from '../ContactInformation/ContactInformation';

import { logout, getUserDetails } from '~/redux/Actions/userActions'; //updateUserProfile,
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { cartsRemainingSelector } from '~/redux/Selector/cartsSelector';
import { imageDefaul, logoDefaul } from '~/utils/data';

export default function Header2(props) {
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
                    flex: '1',
                    display: 'flex',
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
                    flex: '1',
                    display: 'flex',
                }}
                className={clsx(styles.wrap_info_user)}
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
                    className={clsx(styles.avatar)}
                />
                <Box className={clsx(styles.dropdown_info_user)}>
                    <Select
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
                            <span className={clsx(styles.name_user)}>{notiUser()}</span>
                        </MenuItem>
                        <MenuItem value={20}>
                            <Link to="/profile">Tài khoản của tôi</Link>
                        </MenuItem>
                        <MenuItem value={30} onClick={logoutHandler}>
                            <Link to="#">Đăng xuất</Link>
                        </MenuItem>
                    </Select>
                </Box>
                <Link to="/cart">
                    <IconButton
                        aria-label="delete"
                        size="medium"
                        sx={{
                            marginTop: '12px',
                        }}
                    >
                        <LocalMall
                            fontSize="medium"
                            sx={{
                                color: 'black',
                            }}
                        />
                        <Box
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'red',
                                fontSize: '14px',
                                padding: '0px 4px',
                                color: 'var(--white-color)',
                            }}
                        >
                            {cartItems ? cartItems?.length : 0}
                        </Box>
                    </IconButton>
                </Link>
            </Box>
        );
    };
    return (
        <Box sx={{ width: '100%' }}>
            <ContactInformation />
            <Box
                sx={{
                    '& > :not(style)': {
                        m: 3,
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'var(--content-color)',
                    // marginTop: '20px',
                }}
            >
                <Box
                    sx={{
                        flex: '1',
                        margin: '0px',
                    }}
                >
                    <Link to={'/'}>
                        <img alt="Logo" src={logoDefaul} style={{ width: '124px' }} />
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
                                sx={{ width: '70%', borderRadius: '6px' }}
                                renderInput={(params) => (
                                    <TextField
                                        onChange={(e) => {
                                            setKeyword(e.target.value);
                                        }}
                                        sx={{
                                            backgroundColor: 'white',
                                        }}
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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <NavBar />
                        </Box>
                    </form>
                </Box>

                {userInfo ? <UILogined /> : <UINotLogin />}
            </Box>
        </Box>
    );
}

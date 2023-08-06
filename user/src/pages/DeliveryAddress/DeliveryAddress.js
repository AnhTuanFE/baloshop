import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveShippingAddress } from '~/redux/Actions/cartActions';
import { getUserDetails, updateUserProfile, getListProvincesAction } from '~/redux/Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '~/redux/Constants/UserContants';

import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { notification } from 'antd';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import './DeliveryAddress.css';

function DeliveryAddress() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess, error: updateError, loading: updateLoading } = UpdateProfile;

    const userDetails = useSelector((state) => state.userDetails);

    const listProvince = useSelector((state) => state.provincesVietNam);
    useEffect(() => {
        dispatch(getListProvincesAction());
    }, []);
    const DataProvinces = listProvince.province;

    // user lấy từ store
    const { loading, error, user } = userDetails;

    const [city, setCity] = useState(''); //tp
    const [districtOptions, setDistrictOptions] = useState([]);
    const [ward, setWard] = useState(''); // xá phường
    const [wardOptions, setWardOptions] = useState([]);
    const [address, setAddress] = useState(''); // địa chỉ chi tiết
    const [distric, setDistric] = useState([]);
    // const [distric, setDistric] = useState(''); //quận huyện

    const [retult, setRetult] = useState('');

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            navigate('/payment');
        }
    }, [updatesuccess]);
    useEffect(() => {
        if (updateError === 'account lock up') {
            openNotification('top', 'Tài khoản của bạn đã bị khóa', 'error');

            dispatch({ type: USER_UPDATE_PROFILE_RESET });
        }
    }, [dispatch, updateError]);
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);

    useEffect(() => {
        if (user.address != undefined) {
            setCity(user.city);
            setDistric(user.distric);
            setWard(user.ward);
            setAddress(user.address);
        }
    }, [dispatch, user]);

    const valitor = (values) => {
        const { address, city, country } = values;
        if (address === '' || city === '' || country === '') {
            setRetult('Vui lòng nhập đầy đủ thông tin');
        } else return true;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!valitor({ city, distric, ward, address })) return;
        dispatch(saveShippingAddress({ city, distric, ward, address }));
        dispatch(updateUserProfile({ id: user._id, city, distric, ward, address }));
        setRetult('');
    };

    // ===========================================
    const optionsAntD_city = [];
    const optionsAntD_distric = [];
    const optionsAntD_ward = [];

    const onChange_city = (value) => {
        setCity(value);
        const infoCity = DataProvinces.find((arr) => {
            return arr.name == value.toString();
        });
        setDistric('');
        setWard('');
        setDistrictOptions(infoCity.districts);
    };

    function findInfoCityByName(arr, name) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                return arr[i];
            } else if (arr[i].districts) {
                const found = findInfoCityByName(arr[i].districts, name);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    const onChange_distric = (value) => {
        const infoDistric = findInfoCityByName(DataProvinces, value);
        setWardOptions(infoDistric.wards);
        setDistric(value);
        setWard('');
    };

    const onChange_ward = (value) => {
        setWard(value);
    };

    // lấy dữ liệu từ api và chuyển option cho thành dữ liệu cho MUI nhận được
    if (DataProvinces) {
        for (let i = 0; i < DataProvinces.length; i++) {
            optionsAntD_city.push({
                value: DataProvinces[i].name,
                label: DataProvinces[i].name,
            });
        }
    }

    if (districtOptions.length > 1) {
        for (let i = 0; i < districtOptions?.length; i++) {
            optionsAntD_distric.push({
                value: districtOptions[i]?.name,
                label: districtOptions[i]?.name,
            });
        }
    }

    if (city) {
        const infoDistric = findInfoCityByName(DataProvinces, city);
        const arrDistrictsTemp = infoDistric?.districts;
        for (let i = 0; i < arrDistrictsTemp?.length; i++) {
            optionsAntD_distric.push({
                value: arrDistrictsTemp[i]?.name,
                label: arrDistrictsTemp[i]?.name,
            });
        }
        const infoWards = findInfoCityByName(DataProvinces, distric);
        const arrWardsTemp = infoWards?.wards;
        for (let i = 0; i < arrWardsTemp?.length; i++) {
            optionsAntD_ward.push({
                value: arrWardsTemp[i]?.name,
                label: arrWardsTemp[i]?.name,
            });
        }
    }

    if (wardOptions.length > 1) {
        for (let i = 0; i < wardOptions?.length; i++) {
            optionsAntD_ward.push({
                value: wardOptions[i]?.name,
                label: wardOptions[i]?.name,
            });
        }
    }
    return (
        <>
            {contextHolder}
            {updateLoading && <Loading />}
            <div className="d-flex justify-content-center align-items-center login-center container">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    {retult !== '' && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                    <h4 className="mt-5 p-2 text-center text-xl font-semibold">Địa chỉ giao hàng</h4>
                    <div className="wrapSelect">
                        <Autocomplete
                            className="address_autocomplete"
                            disablePortal
                            id="combo-box-demo"
                            options={optionsAntD_city}
                            value={city}
                            onChange={(e) => {
                                onChange_city(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} label="Tỉnh / Thành phố" />}
                        />
                        <Autocomplete
                            className="address_autocomplete"
                            disablePortal
                            id="combo-box-demo"
                            options={optionsAntD_distric}
                            value={distric}
                            onChange={(e) => {
                                onChange_distric(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
                        />

                        <Autocomplete
                            className="address_autocomplete autoWard"
                            disablePortal
                            id="combo-box-demo"
                            value={ward}
                            options={optionsAntD_ward}
                            onChange={(e) => {
                                onChange_ward(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
                        />
                        <TextField
                            className="address_textfield"
                            value={address}
                            id="outlined-basic"
                            fullWidth
                            label="Đường/Hẻm - Thôn/Phường"
                            variant="outlined"
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <button className="button_continue" type="submit">
                        Tiếp tục
                    </button>
                </form>
            </div>
        </>
    );
}

export default DeliveryAddress;

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
    const [district, setDistrict] = useState([]);
    // const [distric, setDistric] = useState(''); //quận huyện

    const [retult, setRetult] = useState('');

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            navigate('/placeorder');
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
            setDistrict(user.district);
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
        if (!valitor({ city, district, ward, address })) return;
        dispatch(saveShippingAddress({ city, district, ward, address }));
        dispatch(updateUserProfile({ id: user._id, city, district, ward, address }));
        setRetult('');
    };

    // ===========================================
    const optionsAntD_city = [];
    const optionsAntD_district = [];
    const optionsAntD_ward = [];

    const onChange_city = (value) => {
        setCity(value);
        const infoCity = DataProvinces.find((arr) => {
            return arr.name == value.toString();
        });
        setDistrict('');
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

    const onChange_district = (value) => {
        const infoDistric = findInfoCityByName(DataProvinces, value);
        setWardOptions(infoDistric.wards);
        setDistrict(value);
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
            optionsAntD_district.push({
                value: districtOptions[i]?.name,
                label: districtOptions[i]?.name,
            });
        }
    }

    if (city) {
        const infoDistrict = findInfoCityByName(DataProvinces, city);
        const arrDistrictsTemp = infoDistrict?.districts;
        for (let i = 0; i < arrDistrictsTemp?.length; i++) {
            optionsAntD_district.push({
                value: arrDistrictsTemp[i]?.name,
                label: arrDistrictsTemp[i]?.name,
            });
        }
        const infoWards = findInfoCityByName(DataProvinces, district);
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
            <div className="d-flex justify-content-center align-items-center login-center container mt-2 ">
                <form className="col-md-8 col-lg-4 col-11 bg-white px-4 pb-4" onSubmit={submitHandler}>
                    {retult !== '' && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                    <h4 className="py-3 text-center text-xl font-semibold">Địa chỉ giao hàng</h4>
                    <div className="flex flex-col">
                        <Autocomplete
                            className="my-3"
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
                            className="my-3"
                            disablePortal
                            id="combo-box-demo"
                            options={optionsAntD_district}
                            value={district}
                            onChange={(e) => {
                                onChange_district(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
                        />

                        <Autocomplete
                            className="my-3"
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
                            className="mt-3"
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
                    <button
                        className="mt-4 w-full cursor-pointer rounded-md bg-[var(--main-color)] py-2 uppercase text-white hover:opacity-[0.8]"
                        type="submit"
                    >
                        Tiếp tục
                    </button>
                </form>
            </div>
        </>
    );
}

export default DeliveryAddress;

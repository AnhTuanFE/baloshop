import { Box, Typography, TextField, Autocomplete, Button, Stack } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState, memo } from 'react';
import styles from './Detail_infor_account.module.css';
// =========================================
import PropTypes from 'prop-types';
import { getListProvincesAction } from '~/redux/Actions/userActions';
import { updateUserProfile } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function Detail_infor_account({ user }) {
    const dispatch = useDispatch();

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [city, setCity] = useState(''); //tp
    const [distric, setDistric] = useState(''); //quận huyện
    const [districtOptions, setDistrictOptions] = useState([]);

    const [ward, setWard] = useState(''); // xá phường
    const [wardOptions, setWardOptions] = useState([]);

    useEffect(() => {
        if (user) {
            setCity(user.city);
            setDistric(user.distric);
            setWard(user.ward);
        }
    }, [user]);
    const listProvince = useSelector((state) => state.provincesVietNam);

    useEffect(() => {
        dispatch(getListProvincesAction());
    }, []);

    const DataProvinces = listProvince.province;

    const submitUpdateProfile = (data) => {
        const { name, phone, address } = data;

        let userInforNeedUpdate = new FormData();
        userInforNeedUpdate.append('id', user._id);
        userInforNeedUpdate.append('name', name);
        userInforNeedUpdate.append('phone', phone);
        userInforNeedUpdate.append('city', city);
        userInforNeedUpdate.append('distric', distric);
        userInforNeedUpdate.append('ward', ward);
        userInforNeedUpdate.append('address', address);

        dispatch(updateUserProfile(userInforNeedUpdate));
    };
    // =========================================================================

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

    useEffect(() => {
        setValue('name', user.name);
        setValue('phone', user.phone);
        setValue('address', user.address);
    }, [setValue, user]);
    return (
        <>
            <form onSubmit={handleSubmit(submitUpdateProfile)}>
                <Stack>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Họ tên</Typography>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập họ và tên',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Họ tên"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.name && errors.name.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>{errors.name.message}</p>
                        ) : null}
                    </Box>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Email</Typography>
                        <TextField
                            className={clsx(styles.info_item)}
                            hiddenLabel
                            id="outlined-basic"
                            variant="outlined"
                            value={user.email}
                            disabled
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}></Box>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Số điện thoại</Typography>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập số điện thoại',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Số điện thoại"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.phone && errors.phone.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>{errors.phone.message}</p>
                        ) : null}
                    </Box>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Tỉnh/Thành phố</Typography>
                        <Autocomplete
                            className={clsx(styles.info_item)}
                            disablePortal
                            id="combo-box-demo"
                            value={city}
                            onChange={(e) => {
                                onChange_city(e.target.outerText);
                            }}
                            options={optionsAntD_city}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {/* <Controller
                            name="city"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên tỉnh, thành phố',
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    className={clsx(styles.info_item)}
                                    disablePortal
                                    id="combo-box-demo"
                                    {...field}
                                    placeholder="Tỉnh/Thành phố"
                                    onChange={(e) => {
                                        onChange_city(e.target.outerText);
                                    }}
                                    defaultValue={user.city}
                                    options={optionsAntD_city}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        /> */}
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}></Box>

                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Quận/Huyện</Typography>
                        <Autocomplete
                            className={clsx(styles.info_item)}
                            disablePortal
                            id="combo-box-demo"
                            options={optionsAntD_distric}
                            value={distric}
                            onChange={(e) => {
                                onChange_distric(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}></Box>

                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Xã/Phường</Typography>
                        <Autocomplete
                            className={clsx(styles.info_item)}
                            disablePortal
                            id="combo-box-demo"
                            value={ward}
                            options={optionsAntD_ward}
                            onChange={(e) => {
                                onChange_ward(e.target.outerText);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}></Box>

                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Đường Hẻm/Thôn</Typography>
                        <Controller
                            name="address"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên đường/thôn/phường',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Đường/hẻm/thôn"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.address && errors.address.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>{errors.address.message}</p>
                        ) : null}
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '100%',
                            margin: 'auto',
                            padding: '16px 0px',
                            borderRadius: '6px',
                            fontSize: '16px',
                        }}
                    >
                        Cập nhật thông tin
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default Detail_infor_account;

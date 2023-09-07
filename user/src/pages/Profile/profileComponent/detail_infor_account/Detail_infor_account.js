import { Box, Typography, TextField, Autocomplete, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getListProvincesAction } from '~/redux/Actions/userActions';
import { updateUserProfile } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';

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
    } = useForm({ defaultValues: { city: '', district: '', ward: '', dateOfBirth: '' } });

    useEffect(() => {
        setValue('name', user.name);
        setValue('dateOfBirth', moment(user?.dateOfBirth).format('YYYY-MM-DD'));
        setValue('phone', user.phone);
        setValue('city', user.city);
        setValue('district', user.district);
        setValue('ward', user.ward);
        setValue('address', user.address);
    }, [setValue, user]);

    const listProvince = useSelector((state) => state.provincesVietNam);

    useEffect(() => {
        dispatch(getListProvincesAction());
    }, []);

    const DataProvinces = listProvince.province;

    const submitUpdateProfile = (data) => {
        const { name, dateOfBirth, phone, address, city, district, ward } = data;
        const dateOfBirthTemp = moment(dateOfBirth).format('YYYY-MM-DD');
        let userInforNeedUpdate = new FormData();
        userInforNeedUpdate.append('id', user._id);
        userInforNeedUpdate.append('name', name);
        userInforNeedUpdate.append('dateOfBirth', dateOfBirthTemp);
        userInforNeedUpdate.append('phone', phone);
        userInforNeedUpdate.append('city', city);
        userInforNeedUpdate.append('district', district);
        userInforNeedUpdate.append('ward', ward);
        userInforNeedUpdate.append('address', address);

        dispatch(updateUserProfile(userInforNeedUpdate));
    };
    // =========================================================================
    const optionsMUI_city = [];
    const optionsMUI_district = [];
    const optionsMUI_ward = [];

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

    const handleFindInformation = (val, arr, unit) => {
        if (unit) {
            for (let i = 0; i < findInfoCityByName(DataProvinces, val)?.wards?.length; i++) {
                arr.push({
                    value: findInfoCityByName(DataProvinces, val)?.wards[i]?.name,
                    label: findInfoCityByName(DataProvinces, val)?.wards[i]?.name,
                });
            }
        } else {
            for (let i = 0; i < findInfoCityByName(DataProvinces, val)?.districts?.length; i++) {
                arr.push({
                    value: findInfoCityByName(DataProvinces, val)?.districts[i]?.name,
                    label: findInfoCityByName(DataProvinces, val)?.districts[i]?.name,
                });
            }
        }
    };

    const onChange_city = (value) => {
        setValue('city', value);
        setValue('district', '');
        setValue('ward', '');
        handleFindInformation(value, optionsMUI_district);
    };

    const onChange_district = (value) => {
        setValue('district', value);
        setValue('ward', '');
        handleFindInformation(value, optionsMUI_ward, true);
    };

    const onChange_ward = (value) => {
        setValue('ward', value);
    };

    // lấy dữ liệu từ api và chuyển option cho thành dữ liệu cho MUI nhận được
    if (DataProvinces) {
        for (let i = 0; i < DataProvinces.length; i++) {
            optionsMUI_city.push({
                value: DataProvinces[i].name,
                label: DataProvinces[i].name,
            });
        }
        handleFindInformation(watch('city'), optionsMUI_district);
        handleFindInformation(watch('district'), optionsMUI_ward, true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitUpdateProfile)}>
                <Stack>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Họ tên</Typography>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập họ và tên',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    size="small"
                                    className="w-full"
                                    hiddenLabel
                                    {...field}
                                    placeholder="Họ tên"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.name && errors.name.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.name.message}</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Ngày sinh</Typography>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập ngày sinh',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="date"
                                    className="w-full "
                                    size="small"
                                    hiddenLabel
                                    {...field}
                                    placeholder="Ngày sinh"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.name && errors.name.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.name.message}</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Email</Typography>
                        <TextField size="small" className="w-full " hiddenLabel value={user.email} disabled />
                    </Box>
                    <Box className="min-h-[28px]"></Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Số điện thoại</Typography>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập số điện thoại',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    size="small"
                                    className="w-full"
                                    hiddenLabel
                                    {...field}
                                    placeholder="Số điện thoại"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.phone && errors.phone.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.phone.message}</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Tỉnh/Thành phố</Typography>
                        <Controller
                            name="city"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên tỉnh, thành phố',
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    noOptionsText="Không tìm thấy kết quả"
                                    loadingText="Đang tải"
                                    className="w-full "
                                    size="small"
                                    disablePortal
                                    // id="combo-box-demo"
                                    {...field}
                                    placeholder="Tỉnh/Thành phố"
                                    onChange={(e) => {
                                        onChange_city(e.target.outerText);
                                    }}
                                    options={optionsMUI_city}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.name && errors.name.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.name.message}</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Quận/Huyện</Typography>
                        <Controller
                            name="district"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên quận, huyện',
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    noOptionsText="Không tìm thấy kết quả"
                                    loadingText="Đang tải"
                                    className="w-full "
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    {...field}
                                    placeholder="Quận/huyện"
                                    onChange={(e) => {
                                        onChange_district(e.target.outerText);
                                    }}
                                    options={optionsMUI_district}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.name && errors.name.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.name.message}</p>
                        ) : null}
                    </Box>

                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Xã/Phường</Typography>
                        <Controller
                            name="ward"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên xã, phường',
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    noOptionsText="Không tìm thấy kết quả"
                                    loadingText="Đang tải"
                                    className="w-full "
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    placeholder="Quận/huyện"
                                    {...field}
                                    onChange={(e) => {
                                        onChange_ward(e.target.outerText);
                                    }}
                                    options={optionsMUI_ward}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.name && errors.name.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.name.message}</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Đường Hẻm/Thôn</Typography>
                        <Controller
                            name="address"
                            control={control}
                            rules={{
                                required: 'Bạn chưa nhập tên đường/thôn/phường',
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="text"
                                    size="small"
                                    className="w-full py-1 "
                                    hiddenLabel
                                    {...field}
                                    placeholder="Đường/hẻm/thôn"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px]">
                        {errors.address && errors.address.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.address.message}</p>
                        ) : null}
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: '100%',
                            margin: 'auto',
                            padding: '8px 0px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            background: 'var(--main-color)',
                            '&:hover': {
                                background: 'var(--main-color-hover)',
                            },
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

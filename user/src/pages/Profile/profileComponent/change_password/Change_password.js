import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { updateUserPasswordAction } from '~/redux/Actions/userActions';
import { notification } from 'antd';
import { useEffect } from 'react';
import { USER_UPDATE_PASSWORD_RESET } from '~/redux/Constants/UserContants';

function Change_password() {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const userUpdatePassword = useSelector((state) => state.stateUserUpdatePassword);

    const { success, loading, data, error } = userUpdatePassword;

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitUpdatePassword = (data) => {
        const { password, oldPassword } = data;
        dispatch(updateUserPasswordAction({ password, oldPassword }));
    };
    useEffect(() => {
        if (success === true) {
            openNotification('top', 'Mật khẩu cập nhật thành công', 'success');
            dispatch({ type: USER_UPDATE_PASSWORD_RESET });
            reset();
        }
        if (error) {
            openNotification('top', `${error}`, 'error');
            dispatch({ type: USER_UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, success, error]);
    useEffect(() => {
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });
        reset();
    }, []);
    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitUpdatePassword)}>
                <Stack>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Mật khẩu cũ</Typography>
                        <Controller
                            name="oldPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 6,
                                required: 'Bạn chưa nhập mật khẩu cũ',
                            }}
                            render={({ field }) => (
                                <TextField
                                    size="small"
                                    type="password"
                                    className="w-full"
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Mật khẩu cũ"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px] text-center">
                        {errors.oldPassword && errors.oldPassword.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.oldPassword.message}</p>
                        ) : null}

                        {errors.oldPassword && errors.oldPassword.type === 'minLength' ? (
                            <p className="mb-2 text-red-600">Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Mật khẩu mới</Typography>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 6,
                                required: 'Bạn chưa nhập mật khẩu mới',
                            }}
                            render={({ field }) => (
                                <TextField
                                    size="small"
                                    type="password"
                                    className="w-full"
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Mật khẩu mới"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px] text-center">
                        {errors.password && errors.password.type === 'required' ? (
                            <p className="mb-2 text-red-600">{errors.password.message}</p>
                        ) : null}

                        {errors.password && errors.password.type === 'minLength' ? (
                            <p className="mb-2 text-red-600">Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng</p>
                        ) : null}
                    </Box>
                    <Box className="mb-1 flex">
                        <Typography className="w-40 pr-2">Xác nhận mật khẩu</Typography>
                        <Controller
                            name="newConfirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 6,
                                required: 'Bạn chưa xác nhận mật khẩu mới',
                                validate: (value) => value === watch('password'),
                            }}
                            render={({ field }) => (
                                <TextField
                                    size="small"
                                    type="password"
                                    className="w-full"
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Xác nhận mật khẩu mới"
                                />
                            )}
                        />
                    </Box>
                    <Box className="min-h-[28px] text-center">
                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'minLength' ? (
                            <p className="mb-2 text-red-600">Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng</p>
                        ) : null}

                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'validate' ? (
                            <p className="mb-2 text-red-600">Mật khẩu không khớp</p>
                        ) : null}

                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'required' ? (
                            <p className="mb-2 text-red-600">Bạn chưa xác nhận mật khẩu mới</p>
                        ) : null}
                    </Box>
                    <button
                        type="submit"
                        className="m-auto w-full rounded-md bg-[var(--main-color)] px-4 py-2.5 text-base font-semibold uppercase text-white hover:bg-[var(--main-color-hover)]"
                    >
                        Cập nhật mật khẩu
                    </button>
                </Stack>
            </form>
        </>
    );
}

export default Change_password;

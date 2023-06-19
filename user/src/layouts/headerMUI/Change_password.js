import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import clsx from 'clsx';
import styles from './Change_password.module.css';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { updateUserPassword } from '~/redux/Actions/userActions';

function Change_password({ user }) {
    const dispatch = useDispatch();

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitUpdatePassword = (data) => {
        const { password, oldPassword } = data;
        dispatch(updateUserPassword({ id: user._id, password, oldPassword }));
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitUpdatePassword)}>
                <Stack>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Mật khẩu cũ</Typography>
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
                                    type="password"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Mật khẩu cũ"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.oldPassword && errors.oldPassword.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>{errors.oldPassword.message}</p>
                        ) : null}

                        {errors.oldPassword && errors.oldPassword.type === 'minLength' ? (
                            <p className={clsx(styles.info_item_warning)}>
                                Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng
                            </p>
                        ) : null}
                    </Box>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Mật khẩu mới</Typography>
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
                                    type="password"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Mật khẩu mới"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.password && errors.password.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>{errors.password.message}</p>
                        ) : null}

                        {errors.password && errors.password.type === 'minLength' ? (
                            <p className={clsx(styles.info_item_warning)}>
                                Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng
                            </p>
                        ) : null}
                    </Box>
                    <Box className={clsx(styles.wrap_info_item)}>
                        <Typography className={clsx(styles.info_item_label)}>Xác nhận mật khẩu</Typography>
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
                                    type="password"
                                    className={clsx(styles.info_item)}
                                    hiddenLabel
                                    id="outlined-basic"
                                    variant="outlined"
                                    {...field}
                                    placeholder="Xác nhận mật khẩu mới"
                                />
                            )}
                        />
                    </Box>
                    <Box className={clsx(styles.wrap_info_item_warning)}>
                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'minLength' ? (
                            <p className={clsx(styles.info_item_warning)}>
                                Mật khẩu phải từ 6 - 255 ký tự và không có khoảng trắng
                            </p>
                        ) : null}

                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'validate' ? (
                            <p className={clsx(styles.info_item_warning)}>Mật khẩu không khớp</p>
                        ) : null}

                        {errors.newConfirmPassword && errors.newConfirmPassword.type === 'required' ? (
                            <p className={clsx(styles.info_item_warning)}>Bạn chưa xác nhận mật khẩu mới</p>
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
                        Cập nhật mật khẩu
                    </Button>
                </Stack>
            </form>
        </>
    );
}

export default Change_password;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { ResetPassWordAction } from '~/redux/Actions/userActions';
import { useForm, Controller } from 'react-hook-form';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

//
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ResetPassword.module.css';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { verifyState, resetPasswordState } = useSelector(usersRemainingSelector);
    const { email, id, token } = verifyState?.state;

    // const { status } = resetPasswordState?.state;
    // console.log('verifyState page resetpassword = ', verifyState);
    // console.log('resetPasswordState = ', resetPasswordState);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `Thông báo `,
            description: 'Cập nhập mật khẩu thành công !',
            placement,
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };
    if (resetPasswordState?.state?.status === 'Password updated') {
        navigate('/login');
        openNotification('top');
    }

    const handleUpdatePassword = (data) => {
        const { newPassword } = data;
        dispatch(ResetPassWordAction({ newPassword, id, token }));
        // console.log('data = ', data);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            {contextHolder}
            <div className={clsx(styles.wrap_content)}>
                <div className={clsx(styles.wrap_content_child)}>
                    <div className={clsx(styles.content_child)}>
                        <h5>Cập nhập mật khẩu cho email {email}</h5>
                        <hr></hr>
                        <form className={clsx(styles.form)} onSubmit={handleSubmit(handleUpdatePassword)}>
                            <div className={clsx(styles.form_input)}>
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        minLength: 6,
                                        required: 'Bạn chưa nhập mật khẩu mới',
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="password"
                                            className={clsx(styles.input_password)}
                                            {...field}
                                            // onChange={(e) => {
                                            //     field.onChange('tuandepzai');
                                            // }}
                                            placeholder="Mật khẩu mới"
                                        />
                                    )}
                                />
                                {errors.newPassword && errors.newPassword.type === 'required' ? (
                                    <p className="text-danger m-0">{errors.newPassword.message}</p>
                                ) : null}

                                {errors.newPassword && errors.newPassword.type === 'minLength' ? (
                                    <p className="text-danger m-0">
                                        Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng
                                        trắng
                                    </p>
                                ) : null}
                            </div>
                            <div className={clsx(styles.form_input)}>
                                <Controller
                                    name="newConfirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        minLength: 6,
                                        required: 'Bạn chưa xác nhận mật khẩu mới',
                                        validate: (value) => value === watch('newPassword'),
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="password"
                                            className={clsx(styles.input_password)}
                                            {...field}
                                            placeholder="Xác nhận mật khẩu mới"
                                        />
                                    )}
                                />

                                {errors.newConfirmPassword && errors.newConfirmPassword.type === 'minLength' ? (
                                    <p className="text-danger m-0">
                                        Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng
                                        trắng
                                    </p>
                                ) : null}

                                {errors.newConfirmPassword && errors.newConfirmPassword.type === 'validate' ? (
                                    <p className="text-danger m-0">Mật khẩu không khớp</p>
                                ) : null}

                                {errors.newConfirmPassword && errors.newConfirmPassword.type === 'required' ? (
                                    <p className="text-danger m-0">Bạn chưa nhập lại mật khẩu mới</p>
                                ) : null}
                            </div>
                            <button className={clsx(styles.button_submit)} type="submit">
                                Cập nhập mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

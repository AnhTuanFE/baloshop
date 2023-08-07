import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { ResetPassWordAction } from '~/redux/Actions/userActions';
import { useForm, Controller } from 'react-hook-form';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';

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
    const { loading, error, state } = verifyState;
    // const { email, id, token } = verifyState?.state;
    // const { status } = resetPasswordState?.state;
    let email;
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
        console.log('data = ', data);
    };
    return (
        <div className="h-[80vh] bg-[#e9ebee] pt-3">
            {contextHolder}
            <div className="flex justify-center">
                <div className="w-1/4">
                    {loading && <Loading />}
                    {error && <Message variant="alert-info text-lg">{error}</Message>}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mt-2 w-1/4 rounded-2xl bg-white">
                    <div className="m-4">
                        <h5 className="mb-2 mt-3 text-center text-xl font-bold">Cập nhập mật khẩu cho email {email}</h5>
                        <hr></hr>
                        <form className="mt-3 text-center" onSubmit={handleSubmit(handleUpdatePassword)}>
                            <div className="mb-3">
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
                                            className="rounded-md px-3 py-2"
                                            style={{
                                                border: '1.6px solid #e9ebee',
                                            }}
                                            {...field}
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
                            <div className="mb-3">
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
                                            className="rounded-md px-3 py-2"
                                            style={{
                                                border: '1.6px solid #e9ebee',
                                            }}
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
                            <button
                                className="mb-5 rounded-lg bg-[var(--main-color)] px-4 py-1 text-white hover:bg-[var(--color-button2)]"
                                type="submit"
                            >
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

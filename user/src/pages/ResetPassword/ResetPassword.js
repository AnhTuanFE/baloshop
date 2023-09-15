import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { resetPassWordAction } from '~/redux/Actions/userActions';
import { useForm, Controller } from 'react-hook-form';
import { notification } from 'antd';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import { RESET_PASS_WORD_RESET } from '~/redux/Constants/UserContants';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { id, email, token } = params;

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { resetPasswordState } = useSelector(usersRemainingSelector);
    const { data, loading, success, error } = resetPasswordState;

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };

    const handleUpdatePassword = (data) => {
        const { newPassword, newConfirmPassword } = data;
        dispatch({ type: RESET_PASS_WORD_RESET });
        dispatch(
            resetPassWordAction({
                newPassword: newPassword,
                newConfirmPassword: newConfirmPassword,
                id: id,
                token: token,
            }),
        );
    };
    useEffect(() => {
        if (success && data?.status == 'success') {
            openNotification('top', data?.message, 'success');
            reset();
            dispatch({ type: RESET_PASS_WORD_RESET });
            return;
        }
        if (error) {
            openNotification('top', error, 'error');
        }
    }, [success, error]);
    useEffect(() => {
        dispatch({ type: RESET_PASS_WORD_RESET });
    }, []);
    return (
        <div className="row col-lg-12 flex justify-center max-sm:mx-4 ">
            {contextHolder}

            {token && email && id ? (
                <div className=" col-lg-5 col-md-7 mt-10 rounded-2xl bg-white px-4 pb-5 pt-3 shadow-custom-shadow">
                    {loading && <Loading />}
                    {error && <Message variant="alert-info text-lg">{error}</Message>}
                    <div className="mt-2 rounded-2xl bg-white">
                        <div className="m-4">
                            <h5 className="mb-2 mt-3 text-center text-xl font-bold">
                                Cập nhập mật khẩu cho email {email}
                            </h5>
                            <hr></hr>
                            <form className="mt-3 text-center" onSubmit={handleSubmit(handleUpdatePassword)}>
                                <div className="mb-3">
                                    <Controller
                                        name="newPassword"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            minLength: 6,
                                            maxLength: 255,
                                            required: 'Bạn chưa nhập mật khẩu mới',
                                        }}
                                        render={({ field }) => (
                                            <input
                                                type="password"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900"
                                                {...field}
                                                placeholder="Mật khẩu mới"
                                            />
                                        )}
                                    />
                                    {errors.newPassword && errors.newPassword.type === 'required' ? (
                                        <p className="text-danger m-0">{errors.newPassword.message}</p>
                                    ) : null}

                                    {errors.newPassword && errors.newPassword.type === 'minLength' ? (
                                        <p className="text-danger m-0">Mật khẩu phải từ 6 - 255 ký tự</p>
                                    ) : null}
                                    {errors.newPassword && errors.newPassword.type === 'maxLength' ? (
                                        <p className="text-danger m-0">Mật khẩu phải nhỏ 255 ký tự</p>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <Controller
                                        name="newConfirmPassword"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            minLength: 6,
                                            maxLength: 255,
                                            required: 'Bạn chưa xác nhận mật khẩu mới',
                                            validate: (value) => value === watch('newPassword'),
                                        }}
                                        render={({ field }) => (
                                            <input
                                                type="password"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900"
                                                {...field}
                                                placeholder="Xác nhận mật khẩu mới"
                                            />
                                        )}
                                    />

                                    {errors.newConfirmPassword && errors.newConfirmPassword.type === 'minLength' ? (
                                        <p className="text-danger m-0">Mật khẩu phải từ 6 - 255 ký tự</p>
                                    ) : null}

                                    {errors.newConfirmPassword && errors.newConfirmPassword.type === 'maxLength' ? (
                                        <p className="text-danger m-0">Mật khẩu phải nhỏ 255 ký tự</p>
                                    ) : null}

                                    {errors.newConfirmPassword && errors.newConfirmPassword.type === 'validate' ? (
                                        <p className="text-danger m-0">Mật khẩu không khớp</p>
                                    ) : null}

                                    {errors.newConfirmPassword && errors.newConfirmPassword.type === 'required' ? (
                                        <p className="text-danger m-0">Bạn chưa xác nhận mật khẩu mới</p>
                                    ) : null}
                                </div>
                                <button
                                    className="mt-2 w-full rounded-lg bg-[var(--main-color)] px-5 py-2 text-center text-base font-normal uppercase text-white hover:bg-[var(--main-color-hover)] "
                                    type="submit"
                                >
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" col-lg-5 col-md-7 mt-10 rounded-2xl bg-white px-4 pb-5 pt-3 shadow-custom-shadow">
                    <div className="">
                        <div className="mx-4">
                            <div>
                                <h2 className="mb-2 mt-3 text-center text-xl font-bold">
                                    Vui lòng kiểm tra lại link đặt lại mật khẩu của bạn
                                </h2>
                                <hr></hr>
                            </div>
                            <div className="mt-3">
                                <div className="mt-2 flex">
                                    <Link
                                        className="w-full rounded-lg bg-[var(--green-color)] px-5 py-2 text-center text-base font-normal uppercase text-white hover:bg-[var(--green-color-hover)]"
                                        to={'/'}
                                    >
                                        Quay lại
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;

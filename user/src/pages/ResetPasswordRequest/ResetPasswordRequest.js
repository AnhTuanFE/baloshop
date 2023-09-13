import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ForgotPassWordAction } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { Button, notification } from 'antd';
import { FORGOT_PASS_WORD_RESET } from '~/redux/Constants/UserContants';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import { useForm, Controller } from 'react-hook-form';

const renderError = (errors) => {
    const message = errors.find((error) => error?.error)?.message;
    if (message)
        return (
            <div className="min-h-[28px]">
                <span className="mt-1 text-[red]">{message}</span>
            </div>
        );
    return <div className="min-h-[28px]"></div>;
};
export default function ResetPasswordRequest() {
    // const [email, setEmail] = useState('');
    const [linkEmail, setLinkEmail] = useState(false);
    const [disabled, setDisable] = useState(true);
    const dispatch = useDispatch();

    const { forgotPassWordState } = useSelector(usersRemainingSelector);
    const { loading, success, error, data } = forgotPassWordState;

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };
    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitEmail = (data) => {
        const { email } = data;
        dispatch({ type: FORGOT_PASS_WORD_RESET });
        dispatch(ForgotPassWordAction({ email: email }));
    };
    useEffect(() => {
        if (success && data?.status == 'success') {
            openNotification('top', data?.message, 'success');
            reset();
            setLinkEmail(true);
            dispatch({ type: FORGOT_PASS_WORD_RESET });
            return;
        }
        if (error) {
            openNotification('top', error, 'error');
        }
    }, [success, error]);
    useEffect(() => {
        setLinkEmail(false);
        dispatch({ type: FORGOT_PASS_WORD_RESET });
    }, []);
    return (
        <div className="row col-lg-12 col-md-12 flex justify-center max-sm:mx-4 ">
            {contextHolder}
            {loading && <Loading />}
            <div className=" col-lg-5 col-md-7 mt-10 rounded-2xl bg-white px-4 pb-5 pt-3 shadow-custom-shadow">
                <div className="">
                    <div className="mx-4">
                        <div>
                            <h2 className="mb-2 mt-3 text-center text-xl font-bold">Tìm lại mật khẩu của bạn</h2>
                            <hr></hr>
                            <ul className="mt-3 list-none text-left">
                                <li>
                                    <span>1. </span>Nhập địa chỉ email của bạn vào bên dưới.
                                </li>
                                <li>
                                    <span>2. </span>Hệ thống của chúng tôi sẽ gửi cho bạn một liên kết tạm thời qua
                                    email
                                </li>
                                <li>
                                    <span>3. </span>Mở email và sử dụng liên kết để đặt lại mật khẩu của bạn
                                </li>
                            </ul>
                        </div>
                        <form className="mt-2" onSubmit={handleSubmit(submitEmail)}>
                            <div className="text-center">
                                <div className="mb-2">{error && <Message variant="alert-danger">{error}</Message>}</div>

                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Bạn chưa nhập email',
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Fragment>
                                            <input
                                                type="email"
                                                id="email"
                                                className=" block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 "
                                                placeholder="Email"
                                                {...field}
                                            />
                                            {renderError([
                                                {
                                                    error: fieldState?.error?.type === 'required',
                                                    message: 'Bạn chưa nhập email',
                                                },
                                            ])}
                                        </Fragment>
                                    )}
                                />
                                <div className="">
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-[var(--main-color)] px-5 py-2 text-center text-base font-normal uppercase text-white hover:bg-[var(--main-color-hover)] "
                                    >
                                        Gửi
                                    </button>
                                    <div className="mt-2 flex">
                                        <Link
                                            className="w-full rounded-lg bg-[var(--green-color)] px-5 py-2 text-center text-base font-normal uppercase text-white hover:bg-[var(--green-color-hover)]"
                                            to={'/'}
                                        >
                                            Quay lại
                                        </Link>
                                    </div>
                                    {true && (
                                        <a
                                            className="mt-2 block w-full rounded-lg bg-[var(--blue-color)] px-5 py-2 text-center text-base font-normal uppercase text-white hover:bg-[var(--blue-color-hover)]"
                                            href="https://accounts.google.com/"
                                        >
                                            <i className="fa fa-chevron-circle-right pl-3 pr-2" />
                                            Đến email của bạn
                                        </a>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

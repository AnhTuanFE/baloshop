import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import { useForm, Controller } from 'react-hook-form';
import { login } from '~/redux/Actions/userActions';

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

const Login = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (data) => {
        const { email, password } = data;
        dispatch(login(email, password));
    };

    return (
        <>
            <div className="row col-lg-12 col-md-12 col-sm-12 flex justify-center max-sm:mx-4">
                <form
                    className=" col-lg-4 col-md-6 col-sm-6 mt-4 rounded-xl bg-white py-10 shadow-custom-shadow max-sm:px-5 sm:px-10"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    {error && <Message variant="alert-danger">{error}</Message>}
                    {loading && <Loading />}
                    <div className="  ">
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
                                        className=" block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                    </div>
                    <div className="">
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                minLength: 6,
                                maxLength: 255,
                                required: 'Bạn chưa nhập mật khẩu',
                            }}
                            render={({ field, fieldState }) => (
                                <Fragment>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        {...field}
                                    />
                                    {renderError([
                                        {
                                            error: fieldState?.error?.type === 'required',
                                            message: 'Bạn chưa nhập mật khẩu',
                                        },
                                        {
                                            error: fieldState?.error?.type === 'minLength',
                                            message: 'Mật khẩu phải lớn hơn hoặc bằng 6 ký tự',
                                        },
                                        {
                                            error: fieldState?.error?.type === 'maxLength',
                                            message: 'Mật khẩu phải nhỏ hơn hoặc bằng 255 ký tự',
                                        },
                                    ])}
                                </Fragment>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[var(--main-color)] px-5 py-2 text-center text-base font-semibold uppercase text-white hover:bg-[var(--main-color-hover)] focus:outline-none focus:ring-4 focus:ring-blue-300 "
                        >
                            Đăng nhập
                        </button>
                    </div>
                    <div className=" mt-3 text-center">
                        <Link to={'/resetpassword-request'}>
                            <p className="m-1 text-gray-500 hover:text-blue-600">Quên mật khẩu</p>
                        </Link>
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            <p className="m-1 text-gray-500 hover:text-blue-600">Tạo tài khoản mới</p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

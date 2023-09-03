import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Loading from '~/components/LoadingError/Loading';
import Toast from '~/components/LoadingError/Toast';
import { login } from '~/Redux/Actions/userActions';
import Message from '~/components/LoadingError/Error';
import { useForm, Controller } from 'react-hook-form';

import {} from './Login.css';

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

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    });

    const handleLogin = async (data) => {
        const { email, password } = data;
        dispatch(login(email, password));
    };
    return (
        <>
            <Toast />
            <section className="vh-100 ">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100 ">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                class="img-fluid"
                                alt="Sample image"
                            ></img>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1  rounded bg-cyan-100 shadow">
                            <h1 className="card-title text-bold fw-bold mb-4 mt-4 text-center uppercase">
                                Đăng nhập admin
                            </h1>
                            {error && <Message variant="alert-danger">{error}</Message>}
                            {loading && <Loading />}
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-3 mt-2">
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
                                                    className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                                <div className="mb-3">
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
                                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                                                        message: 'Mật khẩu chưa chính xác, nhỏ hơn hoặc bằng 256 ký tự',
                                                    },
                                                ])}
                                            </Fragment>
                                        )}
                                    />
                                </div>
                                <div className="d-flex mb-4 justify-center">
                                    <button type="submit" className="btn fw-bold bg-sky-600 text-white ">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;

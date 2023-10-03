import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '~/components/LoadingError/Loading';
import Toast from '~/components/LoadingError/Toast';
import { login } from '~/Redux/Actions/userActions';
import Message from '~/components/LoadingError/Error';
import { useForm, Controller } from 'react-hook-form';

import './Login.css';

const renderError = (errors) => {
    const message = errors.find((error) => error?.error)?.message;
    if (message)
        return (
            <div className="d-flex justify-content-center min-h-[28px] ">
                <span
                    style={{
                        color: '#ff0000',
                    }}
                    className="mt-1 "
                >
                    {message}
                </span>
            </div>
        );
    return <div className="min-h-[28px]"></div>;
};

const Login = () => {
    const navigate = useNavigate();
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
        if (userInfo?.token) {
            navigate('/');
        }
    }, [userInfo]);

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
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 wrap_form_login bg-cyan-100 shadow">
                            <h1 className="card-title text-bold fw-bold mb-4 mt-4 text-center uppercase">
                                Đăng nhập admin
                            </h1>
                            {error && <Message variant="alert-danger">{error}</Message>}
                            {loading ? (
                                <Loading />
                            ) : (
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
                                                        className=" rounded-4 block w-full border border-gray-300 bg-gray-50 px-3 py-3 text-sm"
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
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-sm"
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
                                                            message:
                                                                'Mật khẩu chưa chính xác, nhỏ hơn hoặc bằng 256 ký tự',
                                                        },
                                                    ])}
                                                </Fragment>
                                            )}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center mb-4">
                                        <button
                                            type="submit"
                                            style={{
                                                backgroundColor: '#37c871',
                                                padding: '8px 0px',
                                                ':hover': {
                                                    backgroundColor: '#3abff8',
                                                },
                                            }}
                                            className="btn fw-bold w-full text-white "
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;

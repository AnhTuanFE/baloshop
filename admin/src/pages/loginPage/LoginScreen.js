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
        console.log('userInfo = ', userInfo);
    }, [userLogin]);

    const handleLogin = async (data) => {
        const { email, password } = data;
        dispatch(login(email, password));
    };
    return (
        <>
            <Toast />
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <image src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.isu.pub%2F190717113451-aead829690340d01433d2c8f9a36253d%2Fjpg%2Fpage_1.jpg&tbnid=7gzovwN0o9WnEM&vet=12ahUKEwjCyNygieWAAxWcklYBHTQoCDIQMygDegQIARBW..i&imgrefurl=https%3A%2F%2Fissuu.com%2Flamhha%2Fdocs%2F__c_th__b_n_chu_n_nh_t_qu____t&docid=XjByUGKRLLFjQM&w=1454&h=1494&q=hack%20n%C3%A3o%20kanji%20pdf&ved=2ahUKEwjCyNygieWAAxWcklYBHTQoCDIQMygDegQIARBW"></image>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 shadow">
                            <h1 className="card-title text-bold fw-bold mb-6 mt-2 text-center uppercase">
                                Đăng nhập admin
                            </h1>
                            {error && <Message variant="alert-danger">{error}</Message>}
                            {loading && <Loading />}
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-3">
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
                                <div className="mb-4">
                                    <button type="submit" className="btn btn-primary w-100">
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

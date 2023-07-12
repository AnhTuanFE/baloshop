import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import { register } from '~/redux/Actions/userActions';
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

function Register() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        watch,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (data) => {
        console.log('data = ', data);
        const { name, email, phone, password } = data;
        dispatch(register(name, email, phone, password));
        reset();
    };
    return (
        <>
            <div>
                <div className="mt-10 flex items-center justify-center">
                    <form className="Login col-md-6 col-lg-4 col-10" onSubmit={handleSubmit(submitHandler)}>
                        {error && <Message variant="alert-danger block">{error}</Message>}
                        {loading && <Loading />}
                        <div className="my-3 text-center text-xl font-semibold"> Đăng ký tài khoản</div>
                        <div className=" ">
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Bạn chưa nhập tên tài khoản',
                                }}
                                render={({ field, fieldState }) => (
                                    <Fragment>
                                        <input
                                            type="text"
                                            id="name"
                                            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            {...field}
                                            placeholder="Tên tài khoản"
                                        />
                                        {renderError([
                                            {
                                                error: fieldState?.error?.type === 'required',
                                                message: 'Bạn chưa nhập tên tài khoản',
                                            },
                                        ])}
                                    </Fragment>
                                )}
                            />
                        </div>

                        <div className=" ">
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
                                            {...field}
                                            placeholder="Email"
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

                        <div className=" ">
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Bạn chưa nhập số điện thoại',
                                }}
                                render={({ field, fieldState }) => (
                                    <Fragment>
                                        <input
                                            type="text"
                                            id="phone"
                                            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            {...field}
                                            placeholder="Số điện thoại"
                                        />
                                        {renderError([
                                            {
                                                error: fieldState?.error?.type === 'required',
                                                message: 'Bạn chưa nhập số điện thoại',
                                            },
                                        ])}
                                    </Fragment>
                                )}
                            />
                        </div>

                        <div className=" ">
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
                                            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            {...field}
                                            placeholder="Mật khẩu"
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

                        <div className=" ">
                            <Controller
                                name="cfpassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    minLength: 6,
                                    maxLength: 255,
                                    required: 'Bạn chưa nhập lại mật khẩu',
                                    validate: (value) => value === watch('password'),
                                }}
                                render={({ field, fieldState }) => (
                                    <Fragment>
                                        <input
                                            type="password"
                                            id="cfpassword"
                                            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            {...field}
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                        {renderError([
                                            {
                                                error: fieldState?.error?.type === 'required',
                                                message: 'Bạn chưa nhập lại mật khẩu',
                                            },
                                            {
                                                error: fieldState?.error?.type === 'minLength',
                                                message: 'Mật khẩu phải lớn hơn hoặc bằng 6 ký tự',
                                            },
                                            {
                                                error: fieldState?.error?.type === 'maxLength',
                                                message: 'Mật khẩu phải nhỏ hơn hoặc bằng 255 ký tự',
                                            },
                                            ,
                                            {
                                                error: fieldState?.error?.type === 'validate',
                                                message: 'Mật khẩu không khớp',
                                            },
                                        ])}
                                    </Fragment>
                                )}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-custom-background-color px-5 py-3 text-center text-sm font-medium uppercase text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                        >
                            Đăng ký
                        </button>
                        <p className=" mt-3 text-center">
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                Tôi đã có tài khoản <strong>Đăng nhập</strong>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;

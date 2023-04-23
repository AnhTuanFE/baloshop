import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from '~/components/LoadingError/Loading';
import Toast from '~/components/LoadingError/Toast';
import { login } from '~/Redux/Actions/userActions';
import Message from '~/components/LoadingError/Error';

const Login = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <>
            <Toast />
            <div className="card shadow mx-auto" style={{ maxWidth: '380px', marginTop: '100px' }}>
                <div className="card-body">
                    {error && <Message variant="alert-danger">{error}</Message>}
                    {loading && <Loading />}
                    <h4 className="card-title mb-4 text-center">Sign in</h4>
                    {/* onSubmit={submitHandler} */}
                    <form>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Email: admin@gmail.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Password: 123456"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            {/* type="submit" */}
                            <button onClick={submitHandler} className="btn btn-primary w-100">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

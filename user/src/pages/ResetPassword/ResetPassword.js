import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { ResetPassWordAction } from '~/redux/Actions/userActions';
//
import { Link } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Message from '~/components/HomeComponent/LoadingError/Error';
import Loading from '~/components/HomeComponent/LoadingError/Loading';
import './ResetPassword.module.css';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');

    const [loginCheck, setLoginCheck] = useState('');

    const { verifyState, resetPasswordState } = useSelector(usersRemainingSelector);
    const { email, id, token } = verifyState?.state;
    // const { status } = resetPasswordState?.state;
    // console.log('verifyState page resetpassword = ', verifyState);
    // console.log('resetPasswordState = ', resetPasswordState);

    if (resetPasswordState.state?.status === 'Password updated') {
        alert('cập nhập mật khẩu thành công !');
    }

    const funtionCheck = () => {
        const msg = {};
        if (isEmpty(newPassword)) {
            msg.newPassword = 'Vui lòng nhập mật khẩu mới';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        } else {
            if (newPassword.length < 6) {
                msg.newPassword = 'Mật khẩu mới phải có it nhất 6 ký tự';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }
        if (isEmpty(newConfirmPassword)) {
            msg.newConfirmPassword = 'Vui lòng xác nhận mật khẩu mới';
            msg.borderRed2 = 'border-red';
            msg.colorRed2 = 'color-red';
        } else {
            if (newConfirmPassword.length < 6) {
                msg.newConfirmPassword = 'Mật khẩu phải có it nhất 6 ký tự';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }
        setLoginCheck(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const handleUpdatePassword = (e) => {
        e.preventDefault();
        const isEmptyLogin = funtionCheck();
        if (isEmptyLogin) {
            dispatch(ResetPassWordAction({ newPassword, id, token }));
            console.log('isEmptyLogin true = ', isEmptyLogin);
        } else {
            console.log('isEmptyLogin false = ', isEmptyLogin);
            return;
        }
    };
    return (
        <>
            {/* <div>
                <h3>Nhập lại mật khẩu cho email {email} </h3>
                    <button onClick={handleUpdatePassword} class="btn btn-success ">
                        Cập nhập mật khẩu mới
                    </button>
            </div> */}

            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                {/* {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />} */}
                <h3>Nhập lại mật khẩu cho email {email} </h3>
                <form className="Login col-md-6 col-lg-4 col-10">
                    <div className="Login-from from-login">
                        <input
                            type="text"
                            className={loginCheck.borderRed1}
                            value={newPassword}
                            onClick={() => {
                                setLoginCheck((object) => {
                                    const x = { ...object };
                                    x.borderRed1 = ' ';
                                    x.colorRed1 = ' ';
                                    x.newPassword = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <p className="from-login__email-pass noti-validate">{loginCheck.newPassword}</p>
                        <p className={`from-login__email-pass-color Login-from__email ${loginCheck.colorRed1}`}>
                            Password
                        </p>
                    </div>
                    <div className="Login-from from-login">
                        <input
                            type="text"
                            className={loginCheck.borderRed2}
                            value={newConfirmPassword}
                            onClick={() => {
                                setLoginCheck((object) => {
                                    const x = { ...object };
                                    x.borderRed2 = ' ';
                                    x.colorRed2 = ' ';
                                    x.newConfirmPassword = ' ';
                                    return x;
                                });
                            }}
                            onChange={(e) => setNewConfirmPassword(e.target.value)}
                        />
                        <p className="from-login__email-pass noti-validate">{loginCheck.newConfirmPassword}</p>
                        <p className={`from-login__email-pass-color1 Login-from__password ${loginCheck.colorRed2}`}>
                            ConfirmPass
                        </p>
                    </div>
                    <button onClick={handleUpdatePassword}>Cập nhập mật khẩu mới</button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;

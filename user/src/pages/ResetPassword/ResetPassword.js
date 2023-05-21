import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { ResetPassWordAction } from '~/redux/Actions/userActions';

import './ResetPassword.css';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const { verifyState, resetPasswordState } = useSelector(usersRemainingSelector);
    const { email, id, token } = verifyState?.state;
    // const { status } = resetPasswordState?.state;
    console.log('verifyState page resetpassword = ', verifyState);
    console.log('resetPasswordState = ', resetPasswordState);

    if (resetPasswordState.state?.status === 'Password updated') {
        alert('cập nhập mật khẩu thành công !');
    }
    const handleUpdatePassword = (e) => {
        e.preventDefault();
        dispatch(ResetPassWordAction({ newPassword, id, token }));
    };
    return (
        <div>
            <h3>Nhập lại mật khẩu cho email {email} </h3>
            <form>
                <div>
                    <input
                        className="input_password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Nhập mật khẩu mới"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="input_password"
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Xác nhân mật khẩu mới"
                    />
                </div>
                <button onClick={handleUpdatePassword} class="btn btn-success ">
                    Cập nhập mật khẩu mới
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;

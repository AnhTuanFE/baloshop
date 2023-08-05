import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '~/redux/Actions/userActions';
import Message from '~/components/LoadingError/Error';
import { notification } from 'antd';

export default function UpdatePassword({ uploadPassword }) {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, notify, type) => {
        api[type]({
            message: `Thông báo `,
            description: `${notify}`,
            placement,
        });
    };

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess, loading: updateLoading, error: errorUpdate } = userUpdateProfile;

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [objFormPass, setObjFromPass] = useState({});

    const dispatch = useDispatch();

    const submitUpdatePassword = (e) => {
        e.preventDefault();
        if (!checkPassword()) {
            return;
        } // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
        // Password match
        if (password !== confirmPassword) {
            openNotification('top', 'Password does not match', 'error');
        } else {
            dispatch(updateUserProfile({ id: user._id, oldPassword, password }));

            if (errorUpdate) {
                openNotification('top', 'Update Password fail', 'success');
            } else {
                openNotification('top', 'Update Password Success', 'success');
            }
        }

        dispatch(updateUserProfile({ id: user._id, oldPassword, password }));
        if (updatesuccess && uploadPassword && !errorUpdate) {
            openNotification('top', 'Update Password Success', 'success');
        }
        setPassword('');
        setConfirmPassword('');
        setOldPassword('');
    };

    function checkPassword() {
        const passObj = {};
        if (isEmpty(oldPassword)) {
            passObj.oldPassword = 'Please input your Password';
        }
        if (isEmpty(password)) {
            passObj.password = 'Please input your Password';
        } else {
            if (password.length < 6) {
                passObj.password = 'Password must be at least 6 characters';
            }
        }
        if (isEmpty(confirmPassword)) {
            passObj.confirmPassword = 'Please input your ConfirmPassword';
        } else {
            if (confirmPassword.length < 6) {
                passObj.confirmPassword = 'Password must be at least 6 characters';
            } else {
                if (password !== confirmPassword) {
                    passObj.confirmPassword = 'The password entered is incorrect';
                }
            }
        }
        setObjFromPass(passObj);
        if (Object.keys(passObj).length > 0) return false;
        return true;
    }
    return (
        <>
            {contextHolder}
            {updatesuccess && <Message variant="alert-success">Update success</Message>}
            {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
            <form className="row  form-container" onSubmit={submitUpdatePassword}>
                <div className="col-md-12">
                    <div className="form">
                        <label for="account-pass">Old Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => {
                                objFormPass.oldPassword = ' ';
                                setOldPassword(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{objFormPass.oldPassword}</p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label for="account-pass">New Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                objFormPass.password = ' ';
                                setPassword(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{objFormPass.password}</p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label for="account-confirm-pass">Confirm Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                objFormPass.confirmPassword = ' ';
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        <p className="noti-validate">{objFormPass.confirmPassword}</p>
                    </div>
                </div>

                <div className="button-submit">
                    <button type="submit">Update Password</button>
                </div>
            </form>
        </>
    );
}

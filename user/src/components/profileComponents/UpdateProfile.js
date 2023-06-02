import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';

import { updateUserProfile } from '~/redux/Actions/userActions';

import Loading from '../HomeComponent/LoadingError/Loading';
import Message from '../HomeComponent/LoadingError/Error';
// type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function UpdateProfile({ uploadProfile, setSucessft }) {
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

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const submitUpdateProfile = (e) => {
        e.preventDefault();

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
        dispatch(updateUserProfile({ id: user._id, name, email, phone }));
    };
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [dispatch, user, updatesuccess]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
        if (updatesuccess && uploadProfile && !error) {
            openNotification('top', 'Update Profile Success', 'success');
        }
    }, [updatesuccess]);

    return (
        <>
            {contextHolder}
            {loading && <Loading />}
            {updateLoading && <Loading />}
            {updatesuccess && <Message variant="alert-success">Update success</Message>}
            <form className="row  form-container" onSubmit={submitUpdateProfile}>
                <div className="col-md-12">
                    <div className="form">
                        <label for="account-fn">UserName</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label for="account-email">E-mail Address</label>
                        <input
                            className="form-control"
                            type="email"
                            disabled
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="text"
                            value={phone}
                            required
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className="button-submit">
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </>
    );
}

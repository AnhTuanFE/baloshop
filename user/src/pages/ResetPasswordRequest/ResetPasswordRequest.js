import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './ResetPasswordRequest.module.css';
import { ForgotPassWord } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState('');
    const [linkEmail, setLinkEmail] = useState(false);
    const [disabled, setDisable] = useState(true);
    const dispatch = useDispatch();

    const { forgotPassWordState } = useSelector(usersRemainingSelector);
    const { loading, state } = forgotPassWordState;
    // console.log('state = ', state);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.info({
            message: `Thông báo `,
            description: 'Link đặt lại mật khẩu đã được gửi qua email, vui lòng kiểm tra hòm thư của bạn',
            placement,
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ForgotPassWord({ email }));
        openNotification('top');
        setEmail('');
        setLinkEmail(!linkEmail);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            {contextHolder}
            <div className={clsx(styles.wrap_global)}>
                <div className={clsx(styles.wrap_child)}>
                    <div className={clsx(styles.insert_space)}>
                        <div className={clsx(styles.wrap_instruct)}>
                            <h2 className={clsx(styles.title)}>Tìm lại mật khẩu của bạn</h2>
                            <hr></hr>
                            <ul className={clsx(styles.wrap_content)}>
                                <li className={clsx(styles.content)}>
                                    <span>1. </span>Nhập địa chỉ email của bạn vào bên dưới.
                                </li>
                                <li className={clsx(styles.content)}>
                                    <span>2. </span>Hệ thống của chúng tôi sẽ gửi cho bạn một liên kết tạm thời qua
                                    email
                                </li>
                                <li className={clsx(styles.content)}>
                                    <span>3. </span>Mở email và sử dụng liên kết để đặt lại mật khẩu của bạn
                                </li>
                            </ul>
                        </div>
                        <form>
                            <div>
                                <div>
                                    <h2>Nhập địa chỉ email của bạn</h2>
                                    <input
                                        className={clsx(styles.input_email)}
                                        id="email-for-pass"
                                        type="email"
                                        placeholder="Email@gmail.com"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setDisable(false);
                                        }}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className={clsx(styles.wrap_button)}>
                                <Button
                                    className={clsx(styles.buton)}
                                    type="primary"
                                    icon={<SmileOutlined />}
                                    onClick={handleSubmit}
                                    disabled={disabled}
                                >
                                    Gửi
                                </Button>
                                <Button className={clsx(styles.buton)} type="primary">
                                    <Link to={'/'}>Trở lại trang chủ</Link>
                                </Button>
                                {linkEmail && (
                                    <Button className={clsx(styles.buton)} type="primary">
                                        <a href="https://accounts.google.com/">
                                            <i
                                                class="fa fa-chevron-circle-right"
                                                aria-hidden="true"
                                                style={{
                                                    paddingRight: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            ></i>
                                            Đi đến email của bạn
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

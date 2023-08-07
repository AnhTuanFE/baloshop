import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="flex h-[80vh] justify-center ">
            {contextHolder}
            <div className=" mt-10 h-[50vh] rounded-2xl px-4 py-4 shadow-custom-shadow">
                <div className="rounded-xl bg-[var(--white-color)]">
                    <div className="mx-4">
                        <div>
                            <h2 className="mb-2 mt-3 text-center text-xl font-bold">Tìm lại mật khẩu của bạn</h2>
                            <hr></hr>
                            <ul className="mt-3 list-none text-left">
                                <li>
                                    <span>1. </span>Nhập địa chỉ email của bạn vào bên dưới.
                                </li>
                                <li>
                                    <span>2. </span>Hệ thống của chúng tôi sẽ gửi cho bạn một liên kết tạm thời qua
                                    email
                                </li>
                                <li>
                                    <span>3. </span>Mở email và sử dụng liên kết để đặt lại mật khẩu của bạn
                                </li>
                            </ul>
                        </div>
                        <form>
                            <div className="flex justify-center">
                                <input
                                    className="my-4 w-4/5 rounded-md border border-solid border-[#ddd] p-3 text-center leading-[100%]"
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
                            <div className="float-right">
                                <Button
                                    className="mr-4 bg-[var(--main-color)] px-8 text-sm font-bold text-white hover:bg-[var(--color-button2)]"
                                    onClick={handleSubmit}
                                    disabled={disabled}
                                >
                                    Gửi
                                </Button>
                                <Button className=" bg-[var(--main-color)] text-sm font-bold hover:bg-[var(--color-button2)]">
                                    <Link className="text-white" to={'/'}>
                                        Trở lại trang chủ
                                    </Link>
                                </Button>
                                {linkEmail && (
                                    <Button type="primary" className="mr-4 bg-[var(--main-color)]">
                                        <a href="https://accounts.google.com/">
                                            <i className="fa fa-chevron-circle-right pl-3 pr-5" aria-hidden="true"></i>
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

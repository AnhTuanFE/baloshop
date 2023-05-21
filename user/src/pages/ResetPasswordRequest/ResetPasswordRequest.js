import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Reset.module.scss';
import { ForgotPassWord } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState('');
    const [linkEmail, setLinkEmail] = useState(false);
    const dispatch = useDispatch();
    const { forgotPassWordState } = useSelector(usersRemainingSelector);
    const { loading, state } = forgotPassWordState;
    console.log('state = ', state);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ForgotPassWord({ email }));
        // fetch('http://localhost:9001/api/forgotPass/forgotPassword', {
        //     method: 'POST',
        //     crossDomain: true,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     body: JSON.stringify({
        //         email,
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         alert(data.status);
        //     });
        setEmail('');
        setLinkEmail(!linkEmail);
    };
    return (
        <>
            <div className={clsx(styles.container, 'mb-2 mt-5')}>
                <div className={clsx(styles.row, 'justify-content-center')}>
                    <div className={clsx('col-lg-8', 'col-md-10')}>
                        <div className={clsx(styles.forgot)}>
                            <img className={clsx(styles.logoShop)} alt="hình ảnh" src="/images/logo2.png" />
                            <h2 className={clsx(styles.headContent)}>Quên mật khẩu?</h2>
                            <p className={clsx(styles.textContent)}>
                                Thay đổi mật khẩu của bạn trong ba bước đơn giản !
                            </p>
                            <ol className={clsx(styles.list, ' unstyled')}>
                                <li>
                                    <span className={clsx('text-primary text-medium')}>1. </span>Nhập địa chỉ email của
                                    bạn vào bên dưới.
                                </li>
                                <li>
                                    <span className={clsx('text-primary', 'text-medium')}>2. </span>Hệ thống của chúng
                                    tôi sẽ gửi cho bạn một liên kết tạm thời qua email
                                </li>
                                <li>
                                    <span className={clsx('text-primary', 'text-medium')}>3. </span>Mở email và sử dụng
                                    liên kết để đặt lại mật khẩu của bạn
                                </li>
                            </ol>
                        </div>
                        <form className={clsx(styles.card, 'mt-4')}>
                            <div className={clsx('card-body')}>
                                <div className={clsx('form-group')}>
                                    <h2 for="email-for-pass" className={clsx(styles.labelEmail)}>
                                        Nhập địa chỉ email của bạn
                                    </h2>
                                    <input
                                        id="email-for-pass"
                                        className="form-control"
                                        type="email"
                                        placeholder="YourEmail@gmail.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className={clsx('card-footer')}>
                                <button className={clsx('btn-success')} type="submit" onClick={handleSubmit}>
                                    Gửi
                                </button>
                                <Link to={'/'} className={clsx('btn-danger')}>
                                    Trở lại trang chủ
                                </Link>
                                {linkEmail && (
                                    <a className={clsx('btn-danger')} href="https://accounts.google.com/">
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
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

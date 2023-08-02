import { useEffect } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { VerifyResetPassWordAction } from '~/redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { usersRemainingSelector } from '~/redux/Selector/usersSelector';
import { SmileOutlined } from '@ant-design/icons';
import styles from './VerifyResetPassWord.module.css';

function VerifyResetPassWord() {
    const params = useParams();
    const dataNeedVerify = params;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { verifyState } = useSelector(usersRemainingSelector);
    // console.log('verifyState = ', verifyState);
    useEffect(() => {
        if (verifyState?.state?.status === 'Verified Account') {
            navigate('/resetpassword');
        }
    });
    const handleVerify = () => {
        dispatch(VerifyResetPassWordAction(dataNeedVerify));
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.wrap_main)}>
                <div className={clsx(styles.wrap_content)}>
                    <div className={clsx(styles.content)}>
                        <h2>Đây là trang xác thực việc đặt lại mật khẩu của bạn</h2>
                        <hr></hr>
                        <p>Hãy bấm vào nút xác thực bên dưới để xác nhận việc đặt lại mật khẩu</p>
                        <Button
                            className={clsx(styles.button_verify)}
                            icon={<SmileOutlined className={clsx(styles.icon_smile)} />}
                            type="primary"
                            onClick={handleVerify}
                        >
                            Xác thực
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyResetPassWord;

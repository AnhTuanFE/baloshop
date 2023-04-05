import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './cssComponentLayout/Footer.module.scss';
function Footer() {
    return (
        <div className={clsx(styles.wrap_footer)}>
            <div className={clsx(styles.footer_info)}>
                <h3 className={clsx(styles.tittle_content)}>Người phát triển</h3>
                <p className={clsx(styles.content)}>Nguyễn Anh tuấn</p>
            </div>
            <div className={clsx(styles.footer_info)}>
                <h3 className={clsx(styles.tittle_content)}>Theo dõi chúng tôi</h3>
                <div className={clsx(styles.wrapContent)}>
                    <FontAwesomeIcon icon={faFacebook} />
                    <p className={clsx(styles.content)}>Facebook</p>
                </div>
                <div className={clsx(styles.wrapContent)}>
                    <FontAwesomeIcon icon={faInstagramSquare} />
                    <p className={clsx(styles.content)}>Instagram</p>
                </div>
            </div>
            <div className={clsx(styles.footer_info)}>
                <h3 className={clsx(styles.tittle_content)}>Liên hệ</h3>
                <div className={clsx(styles.wrapContent)}>
                    <FontAwesomeIcon icon={faPhone} />
                    <p className={clsx(styles.content)}>Điện thoại: 0123456789</p>
                </div>
                <div className={clsx(styles.wrapContent)}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p className={clsx(styles.content)}>Email: balostore.owner@gmail.com </p>
                </div>
                <div className={clsx(styles.wrapContent)}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p className={clsx(styles.content)}>
                        Địa chỉ: 566/191 - Nguyễn Thái Sơn - Phường 5 - Gò Vấp - TP.HCM
                    </p>
                </div>
            </div>
            <div className={clsx(styles.footer_info)}>
                <h3 className={clsx(styles.tittle_content)}>Chăm sóc khách hàng</h3>
                <p className={clsx(styles.content)}>Trung tâm trợ giúp</p>
                <p className={clsx(styles.content)}>Hướng dẫn khách hàng</p>
            </div>
        </div>
    );
}

export default Footer;

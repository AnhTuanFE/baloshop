import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./cssComponentLayout/Footer.module.scss";
function Footer() {
  return (
    <div className={clsx(styles.wrap_footer)}>
      <div className={clsx(styles.people_develope)}>
        <h3>Người phát triển</h3>
        <p>Nguyễn Anh tuấn</p>
      </div>
      <div className={clsx(styles.follow)}>
        <h3>Theo dõi chúng tôi</h3>
        <p>Facebook</p>
        <p>Instagran</p>
      </div>
      <div className={clsx(styles.contact)}>
        <h3>Địa chỉ</h3>
        <p>Quận Gò Vấp</p>
      </div>
      <div className={clsx(styles.take_care_of)}>
        <h3>Chăm sóc khách hàng</h3>
        <p>Điều khoản</p>
        <p>Trung tâm trợ giúp</p>
        <p>Hướng dẫn khách hàng</p>
      </div>
    </div>
  );
}

export default Footer;

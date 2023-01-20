import Header from "../Layout/componenLayout/Header";
import ContactInformation from "../Layout/componenLayout/ContactInformation";
import clsx from "clsx";
import styles from "./LoginCSS/Login.module.scss";
function Login() {
  return (
    <div>
      <ContactInformation />
      <Header />
      <div className={clsx(styles.wrap_info_account)}>
        <div className={clsx(styles.wrap_form_account)}>
          <div className={clsx(styles.info_account)}>
            <label className={clsx(styles.info_account_label)}>Email</label>
            <input
              placeholder="Email"
              type="text"
              className={clsx(styles.info_account_input)}
            />
          </div>
          <div className={clsx(styles.info_account)}>
            <label className={clsx(styles.info_account_label)}>Mật khẩu</label>
            <input
              placeholder="Mật khẩu"
              type="text"
              className={clsx(styles.info_account_input)}
            />
          </div>
          <div className={clsx(styles.wrap_button)}>
            <button className={clsx(styles.button_login)}>Đăng nhập</button>
            <p className={clsx(styles.button_other)}>Quên mật khẩu</p>
            <p className={clsx(styles.button_other)}>Tạo tài khoản mới</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

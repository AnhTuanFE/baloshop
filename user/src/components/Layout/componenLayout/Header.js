// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./cssComponentLayout/Header.module.scss";

const Header = (props) => {
  // clsx cho phép tạo 1 class lúc có lúc ko
  //  biến true đằng sau cho phép nhận từ props
  const classes = clsx(styles.header, {
    [styles.primary]: true,
  });
  return (
    <div className={classes}>
      <div className={clsx(styles.wrap_header)}>
        <div className={clsx(styles.header_logo)}>
          <img src="/images/logo2.png" alt="LOGO" />
        </div>

        <div className={clsx(styles.wrap_find)}>
          <div className={clsx(styles.wrap_find)}>
            <input
              placeholder="Tìm kiếm"
              className={clsx(styles.input_find)}
            ></input>
            <button className={clsx(styles.search_button)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        <div className={clsx(styles.wrap_button)}>
          <button className={clsx(styles.button_guess)}>Đăng ký</button>
          <button className={clsx(styles.button_guess)}>Đăng nhập</button>
          <button className={clsx(styles.button_guess)}>Giỏ hàng</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

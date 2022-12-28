import {
  faStar,
  faStarHalfAlt,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./HomeComponentCSS/ListNewProducts.module.scss";

function ListNewProducts() {
  return (
    <div>
      <h2 className={clsx(styles.tittle)}>SẢN PHẨM MỚI</h2>
      <div className={clsx(styles.wrap_products)}>
        <div className={clsx(styles.icon_left)}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.wrap_product)}>
          <div className={clsx(styles.wrap_image)}>
            <img
              src="/images/vali1.jpg"
              alt=""
              className={clsx(styles.image_product)}
            />
          </div>
          <div className={clsx(styles.info_product)}>
            <b>Balo nữ</b>
            <p>390.000</p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>
        <div className={clsx(styles.icon_right)}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default ListNewProducts;

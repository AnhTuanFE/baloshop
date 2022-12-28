import clsx from "clsx";
import styles from "./HomeComponentCSS/NumberPages.module.scss";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function NumberPages() {
  return (
    <div className={clsx(styles.wrap_number_pages)}>
      <div className={clsx(styles.wrap_number_page)}>
        <ul className={clsx(styles.list_number_pages)}>
          <li className={clsx(styles.page_item_left)}>
            <FontAwesomeIcon
              icon={faAnglesLeft}
              className={clsx(styles.icon_left)}
            />
          </li>
          <li className={clsx(styles.page_item)}>
            <a href="/" className={clsx(styles.item)}>
              1
            </a>
          </li>
          <li className={clsx(styles.page_item)}>
            <a href="/" className={clsx(styles.item)}>
              2
            </a>
          </li>
          <li className={clsx(styles.page_item)}>
            <a href="/" className={clsx(styles.item)}>
              3
            </a>
          </li>
          <li className={clsx(styles.page_item)}>
            <a href="/" className={clsx(styles.item)}>
              4
            </a>
          </li>
          <li className={clsx(styles.page_item)}>
            <a href="/" className={clsx(styles.item)}>
              5
            </a>
          </li>
          <li className={clsx(styles.page_item_right)}>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={clsx(styles.icon_right)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NumberPages;

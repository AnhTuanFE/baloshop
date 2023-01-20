import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faPinterestP,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./cssComponentLayout/ContactInformation.module.scss";
function ContactInformation() {
  return (
    <div className={clsx(styles.wrap_comtact_infomation)}>
      <div className={clsx(styles.phoneNumber)}>
        <p>Đường dây nóng: 123456789</p>
      </div>
      <div className={clsx(styles.wrap_social_network)}>
        <FontAwesomeIcon
          icon={faEnvelope}
          className={clsx(styles.wrap_social_network_icon)}
        />
        <FontAwesomeIcon
          icon={faFacebook}
          className={clsx(styles.wrap_social_network_icon)}
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className={clsx(styles.wrap_social_network_icon)}
        />
        <FontAwesomeIcon
          icon={faYoutube}
          className={clsx(styles.wrap_social_network_icon)}
        />
        <FontAwesomeIcon
          icon={faPinterestP}
          className={clsx(styles.wrap_social_network_icon)}
        />
        <FontAwesomeIcon
          icon={faLinkedin}
          className={clsx(styles.wrap_social_network_icon)}
        />
      </div>
    </div>
  );
}

export default ContactInformation;

// import clsx from "clsx";
import Header from "./componenLayout/Header";
import Footer from "./componenLayout/Footer";
import ContactInformation from "./componenLayout/ContactInformation";
// import styles from "./defaulLayout.module.scss";
function DefaulLayout({ children }) {
  return (
    <div className="Wrapper">
      <ContactInformation />
      <Header />
      <div className="chilren">{children}</div>
      <Footer />
    </div>
  );
}
export default DefaulLayout;

import clsx from "clsx";
import styles from "./Home.module.scss";
import Sliders from "~/components/HomeComponent/Sliders";
import ListNewProducts from "~/components/HomeComponent/ListNewProducts";
import NumberPages from "~/components/HomeComponent/NumberPages";
function Home() {
  return (
    <div className={clsx(styles.wrap_home_page)}>
      <Sliders />
      <ListNewProducts />
      <NumberPages />
      <div>
        <h2>Home page</h2>
      </div>
    </div>
  );
}

export default Home;

import clsx from 'clsx';
import styles from './Home.module.scss';
// =========
// import Header from './../components/Header';
// import Footer from './../components/Footer';
// import NewsMain from '../components/news/NewsMain';// tin tức sự kiện
// =======bên trên chưa dùng tới
import AllProductsFilter from '~/components/HomeComponent/AllProductsFilter'; // ShopSection
import Sliders from '~/components/HomeComponent/Sliders';
import LatestProduct from '~/components/HomeComponent/SliderProducts/LatestProduct'; //  Corousel
import BestSellingProduct from '~/components/HomeComponent/SliderProducts/BestSellingProduct'; // CorouselOder
// { match, location }
function Home() {
    // const keyword = match.params.keyword;
    // const pageNumber = match.params.pageNumber;
    // const category = match.params.category;
    // const rating = match.params.rating;
    // const sortProducts = match.params.sortProducts;
    return (
        <div className={clsx(styles.wrap_home_page)}>
            <Sliders />
            <LatestProduct />
            <BestSellingProduct />
            <AllProductsFilter />
        </div>
    );
}

export default Home;

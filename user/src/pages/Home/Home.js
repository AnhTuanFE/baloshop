// import { useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Home.module.scss';
// import NewsMain from '../components/news/NewsMain';// tin tức sự kiện
// =======bên trên chưa dùng tới
import Header from '~/components/Layout/componenLayout/Header';
import AllProductsFilter from '~/components/HomeComponent/AllProductsFilter'; // ShopSection
import Sliders from '~/components/HomeComponent/Sliders';
import LatestProduct from '~/components/HomeComponent/SliderProducts/LatestProduct'; //  Corousel
import BestSellingProduct from '~/components/HomeComponent/SliderProducts/BestSellingProduct'; // CorouselOder

//{ match, location }
function Home() {
    // let location = useLocation();
    // let params = useParams();
    // const keyword = params.keyword;
    // const pageNumber = params.pageNumber;
    // const category = params.category;
    // const rating = params.rating;
    // const sortProducts = params.sortProducts;
    // console.log('keyword', keyword);
    // console.log('pageNumber', pageNumber);
    // console.log('category', category);
    // console.log('rating', rating);
    // console.log('sortProducts', sortProducts);

    return (
        <div className={clsx(styles.wrap_home_page)}>
            <Header />
            <Sliders />
            <LatestProduct />
            <BestSellingProduct />
            <AllProductsFilter />

            {/* <Header keysearch={keyword} />
            {!keyword && !category ? <Sliders /> : ''}
            {!keyword && !category ? <LatestProduct /> : ''}
            {!keyword && !category ? <BestSellingProduct /> : ''}
            <AllProductsFilter
                category={category}
                keyword={keyword}
                pageNumber={pageNumber}
                sortProducts={sortProducts}
                rating={rating}
            /> */}
        </div>
    );
}

export default Home;

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
// import NewsMain from '~/components/news/NewsMain';// tin tức sự kiện
import AllProductsFilter from '~/components/HomeComponent/AllProductsFilter/AllProductsFilter'; // ShopSection
import Sliders from '~/components/HomeComponent/Sliders/Sliders';
import LatestProduct from '~/components/HomeComponent/SliderProducts/LatestProduct/LatestProduct'; //  Corousel
import BestSellingProduct from '~/components/HomeComponent/SliderProducts/BestSellingProduct/BestSellingProduct'; // CorouselOder

import styles from './Home.module.scss';

function Home() {
    const userRegister = useSelector((state) => state.userRegister);

    const location = useLocation();
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const category = params.category;
    const rating = params.rating;
    const sortProducts = params.sortProducts;

    return (
        <div className={clsx(styles.wrap_home_page)}>
            {!keyword && !category ? <Sliders /> : ''}
            {!keyword && !category ? <LatestProduct /> : ''}
            {!keyword && !category ? <BestSellingProduct /> : ''}
            <AllProductsFilter
                category={category}
                keyword={keyword}
                pageNumber={pageNumber}
                sortProducts={sortProducts}
                rating={rating}
            />
        </div>
    );
}

export default Home;

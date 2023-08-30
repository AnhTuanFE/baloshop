import { useLocation, useParams } from 'react-router-dom';

import AllProductsFilter from './HomeComponent/AllProductsFilter/AllProductsFilter';
import Sliders from './HomeComponent/Sliders/Sliders';
import LatestProduct from './HomeComponent/SliderProducts/LatestProduct/LatestProduct';
import BestSellingProduct from './HomeComponent/SliderProducts/BestSellingProduct/BestSellingProduct';

// import NewsMain from '~/components/news/NewsMain';
function Home() {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const category = params.category;
    const rating = params.rating;
    const sortProducts = params.sortProducts;

    return (
        <div className=" max-md:px-2 md:px-20">
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
            {/* <NewsMain /> */}
        </div>
    );
}

export default Home;

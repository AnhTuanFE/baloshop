import { useLocation, useParams } from 'react-router-dom';

import AllProductsFilter from './HomeComponent/AllProductsFilter/AllProductsFilter';
import Sliders from './HomeComponent/Sliders/Sliders';
import LatestProduct from './HomeComponent/SliderProducts/LatestProduct/LatestProduct';
import BestSellingProduct from './HomeComponent/SliderProducts/BestSellingProduct/BestSellingProduct';

// import NewsMain from '~/components/news/NewsMain';
function Home() {
    const params = useParams();

    const keyword = params.keyword || '';
    const pageNumber = params.pageNumber || 1;
    const category = params.category || '';
    const rating = params.rating || '';
    const sortBy = params.sortBy || 1;

    return (
        <div className=" max-md:px-2 md:px-20">
            {!keyword && !category ? <Sliders /> : ''}
            {!keyword && !category ? <LatestProduct /> : ''}
            {!keyword && !category ? <BestSellingProduct /> : ''}
            <AllProductsFilter
                category={category}
                keyword={keyword}
                pageNumber={pageNumber}
                sortBy={sortBy}
                rating={rating}
            />
            {/* <NewsMain /> */}
        </div>
    );
}

export default Home;

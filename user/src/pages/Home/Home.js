import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import AllProductsFilter from '~/components/HomeComponent/AllProductsFilter/AllProductsFilter'; // ShopSection
import Sliders from '~/components/HomeComponent/Sliders/Sliders';
import LatestProduct from '~/components/HomeComponent/SliderProducts/LatestProduct/LatestProduct'; //  Corousel
import BestSellingProduct from '~/components/HomeComponent/SliderProducts/BestSellingProduct/BestSellingProduct'; // CorouselOder
// import NewsMain from '~/components/news/NewsMain';
function Home() {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const category = params.category;
    const rating = params.rating;
    const sortProducts = params.sortProducts;

    return (
        <div>
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

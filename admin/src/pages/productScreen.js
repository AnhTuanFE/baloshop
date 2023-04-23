import { useParams } from 'react-router-dom';

import MainProducts from '~/components/products/MainProducts';

const ProductScreen = () => {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const category = params.category;
    console.log('keyword = ', keyword);
    console.log('pageNumber = ', pageNumber);
    console.log('category = ', category);

    return (
        <>
            <MainProducts keyword={keyword} category={category} pageNumber={pageNumber} />
        </>
    );
};

export default ProductScreen;

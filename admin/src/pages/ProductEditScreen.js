import { useParams } from 'react-router-dom';

import EditProductMain from '~/components/products/EditproductMain';

const ProductEditScreen = () => {
    const params = useParams();

    const productId = params.id;
    return (
        <>
            <EditProductMain productId={productId} />
        </>
    );
};
export default ProductEditScreen;

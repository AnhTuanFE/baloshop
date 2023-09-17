import { useParams } from 'react-router-dom';
import Orders from '~/components/orders/Orders';

const OrderScreen = () => {
    const params = useParams();

    const keyword = params.keyword || '';
    const pageNumber = params.pageNumber || 1;
    const status = params.status || '';
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Đơn hàng</h2>
            </div>

            <div className="card mb-2 shadow-sm">
                <div className="card-body px-2 py-0">
                    <div className="table-responsive">
                        <Orders keyword={keyword} status={status} pageNumber={pageNumber} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderScreen;

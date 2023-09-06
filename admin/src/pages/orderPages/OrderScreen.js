import { useParams } from 'react-router-dom';
import Orders from '~/components/orders/Orders';

const OrderScreen = () => {
    const params = useParams();

    const keyword = params.keyword;
    const pageNumber = params.pageNumber;
    const status = params.status;

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Đơn hàng</h2>
            </div>

            <div className="card mb-0 shadow-sm">
                <div className="card-body overflow-auto" style={{ height: '74vh' }}>
                    <div className="table-responsive">
                        <Orders keyword={keyword} status={status} pageNumber={pageNumber} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderScreen;

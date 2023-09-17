import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMoneyCheckDollar, faChartLine } from '@fortawesome/free-solid-svg-icons';

const TopTotal = (props) => {
    const { dataOrders, countProducts, countUsers } = props;

    return (
        <div className="row col-lg-12">
            <div className="col-lg-3">
                <div
                    style={{
                        backgroundColor: '#bae6ff',
                    }}
                    className="card card-body boder-dabost mb-4 shadow-sm "
                >
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span
                                style={{
                                    backgroundColor: '#ffff',
                                }}
                                className="icon icon-sm rounded-circle "
                            >
                                <FontAwesomeIcon
                                    style={{
                                        color: '#2196f3',
                                    }}
                                    className=""
                                    icon={faChartLine}
                                />
                            </span>
                            <div>
                                <h6 className="fs-5 mb-1">Doanh số</h6>
                            </div>
                        </div>
                    </article>
                    <div className="text ps-3 ">
                        <div className="fs-5" style={{ fontWeight: '600' }}>
                            {dataOrders?.totalSale ? (
                                <>{Number(dataOrders?.totalSale?.toFixed(0))?.toLocaleString('de-DE')}đ</>
                            ) : (
                                '0đ'
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div
                    style={{
                        backgroundColor: '#a0f3d0',
                    }}
                    className="card card-body boder-dabost mb-4 shadow-sm"
                >
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle bg-white">
                                <FontAwesomeIcon className="text-success" icon={faMoneyCheckDollar} />
                            </span>
                            <h6 className="fs-5 mb-1">Đơn đã thanh toán</h6>
                        </div>
                    </article>
                    <div className="text fs-5 fw-semibold ps-3">
                        {dataOrders?.quantity ? <span>{dataOrders?.quantity}</span> : <span>0</span>} /{' '}
                        {dataOrders?.total ? <span>{dataOrders?.total}</span> : <span> 0 </span>}
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div
                    style={{
                        backgroundColor: '#ffe8c7',
                    }}
                    className="card card-body boder-dabost mb-4 shadow-sm"
                >
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle bg-white ">
                                <i className="text-warning fad fa-shopping-cart"></i>
                            </span>
                            <h6 className="fs-5 mb-1">Sản phẩm</h6>
                        </div>
                    </article>
                    <div className="text fs-5 fw-semibold ps-3">
                        {countProducts ? <span>{countProducts}</span> : <span>0</span>}
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div
                    style={{
                        backgroundColor: '#ffd5d6',
                    }}
                    className="card card-body boder-dabost mb-4  shadow-sm"
                >
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle bg-white">
                                <FontAwesomeIcon className="text-danger" icon={faUsers} />
                            </span>
                            <h6 className="fs-5 mb-1">Tài khoản</h6>
                        </div>
                    </article>
                    <div className="text fs-5 fw-semibold ps-3">
                        {countUsers ? <span>{countUsers}</span> : <span>0</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopTotal;

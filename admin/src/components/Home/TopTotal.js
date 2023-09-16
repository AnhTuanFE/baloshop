const TopTotal = (props) => {
    const { dataOrders, countProducts, countUsers } = props;

    return (
        <div className="row col-lg-12">
            <div className="col-lg-3">
                <div className="card card-body boder-dabost mb-4 bg-blue-50 shadow-sm ">
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle alert-primary">
                                <i className="text-primary fas fa-usd-circle"></i>
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
                <div className="card card-body boder-dabost mb-4 bg-green-50 shadow-sm">
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle alert-success">
                                <i className="text-success fas fa-bags-shopping"></i>
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
                <div className="card card-body boder-dabost mb-4 bg-yellow-50 shadow-sm">
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle alert-warning">
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
                <div className="card card-body boder-dabost mb-4 bg-red-50 shadow-sm">
                    <article className="icontext">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="icon icon-sm rounded-circle alert-danger">
                                <i className="text-danger fas fa-user-alt"></i>
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

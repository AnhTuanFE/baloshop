const OrderDetailInfo = (props) => {
    const { order } = props;
    return (
        <div className="row order-info-wrap mb-5">
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-user"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            Họ tên: {order?.order.name} <br />
                            <p>Số điện thoại: {order?.order.phone}</p>
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-map-marker-alt"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            Địa chỉ: {order?.order.shippingAddress?.city}, {order?.order.shippingAddress?.district},{' '}
                            {order?.order.shippingAddress?.ward}
                            <br />
                            {order?.order.shippingAddress?.address}
                            <br />
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext " style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fab fa-paypal"></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">Phương thức thanh toán: {order?.order.paymentMethod}</p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default OrderDetailInfo;

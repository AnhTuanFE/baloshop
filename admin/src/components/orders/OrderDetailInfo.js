import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMoneyCheckDollar, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { handleChangePayMethod } from '~/useHooks/HandleChangeMethod';
const OrderDetailInfo = (props) => {
    const { order } = props;
    return (
        <div className="row order-info-wrap mb-5">
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span
                        style={{
                            backgroundColor: '#fcd6e6',
                        }}
                        className="icon icon-sm rounded-circle"
                    >
                        <i
                            style={{
                                color: '#e85d97',
                            }}
                            className="fas fa-user"
                        ></i>
                    </span>
                    <div className="text">
                        <div className="mb-1">
                            <div>
                                <b>id: </b>
                                {order?.order.user}
                            </div>
                            <div>
                                <b>Họ tên: </b> {order?.order.name}
                            </div>
                            <div>
                                <b>Số điện thoại: </b> {order?.order.phone}
                            </div>
                            <div>
                                <b>Email: </b> {order?.order.email}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span
                        style={{
                            backgroundColor: '#fcd6e6',
                        }}
                        className="icon icon-sm rounded-circle"
                    >
                        <i
                            style={{
                                color: '#e85d97',
                            }}
                            className="fas fa-map-marker-alt"
                        ></i>
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            <b>Địa chỉ: </b> {order?.order.shippingAddress?.city},{' '}
                            {order?.order.shippingAddress?.district}, {order?.order.shippingAddress?.ward}
                            <br />
                            {order?.order.shippingAddress?.address}
                            <br />
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="icontext " style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                        style={{
                            backgroundColor: '#fcd6e6',
                        }}
                        className="icon icon-sm rounded-circle"
                    >
                        <FontAwesomeIcon
                            style={{
                                color: '#e85d97',
                            }}
                            className=""
                            icon={faDollarSign}
                        />
                    </span>
                    <div className="text">
                        <p className="mb-1">
                            <b>Phương thức thanh toán: </b>
                            {handleChangePayMethod(order?.order.paymentMethod)}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default OrderDetailInfo;

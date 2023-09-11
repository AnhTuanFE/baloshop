const HandleChangeButtonSetStatusOrder = (order, handleSetStatusAndShowModal) => {
    const { status } = order;

    if (order.paymentMethod == 'pay-with-cash') {
        if (status == 'placed') {
            return (
                <button
                    value={'confirm'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    className="btn btn-success w-full"
                >
                    Xác nhận đơn hàng
                </button>
            );
        }
        if (status == 'confirm') {
            return (
                <button
                    value={'delivery'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    className="btn btn-success w-full"
                >
                    Xác nhận giao hàng
                </button>
            );
        }
        if (status == 'delivered') {
            return (
                <button
                    value={'delivered'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    style={{
                        color: '#ffff',
                    }}
                    className="btn btn-warning w-full"
                >
                    Xác nhận đã giao và thanh toán
                </button>
            );
        }
        if (status == 'cancelled') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-dark w-full"
                >
                    Đơn này đã bị hủy
                </span>
            );
        }

        if (status == 'paid') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-success w-full"
                >
                    Đã thanh toán và giao hàng thành công
                </span>
            );
        }
        if (status == 'completed') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-success w-full"
                >
                    Hoàn tất
                </span>
            );
        } else {
            return <span className="btn btn-warning w-full">{status}</span>;
        }
    } else {
        if (status == 'placed') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-danger w-full"
                >
                    Đơn hàng chưa thanh toán
                </span>
            );
        }
        if (status == 'paid') {
            return (
                <button
                    value={'confirm'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    className="btn btn-success w-full"
                >
                    Xác nhận đơn hàng
                </button>
            );
        }
        if (status == 'confirm') {
            return (
                <button
                    value={'delivery'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    className="btn btn-success w-full"
                >
                    Xác nhận giao hàng
                </button>
            );
        }
        if (status == 'delivering') {
            return (
                <button
                    value={'delivered'}
                    onClick={(e) => {
                        handleSetStatusAndShowModal(e.target.value);
                    }}
                    className="btn btn-success w-full"
                >
                    Xác nhận đã giao hàng
                </button>
            );
        }
        if (status == 'cancelled') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-dark w-full"
                >
                    Đơn này đã bị hủy
                </span>
            );
        }
        if (status == 'delivered') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-success w-full"
                >
                    Đã giao hàng thành công
                </span>
            );
        }
        if (status == 'completed') {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-success w-full"
                >
                    Đơn hàng đã hoàn tất
                </span>
            );
        } else {
            return (
                <span
                    style={{
                        cursor: 'default',
                    }}
                    className="btn btn-warning w-full"
                >
                    {status}
                </span>
            );
        }
    }
};

const HandleChangeButtonCancelOrder = (order, handleSetStatusAndShowModal) => {
    const { status } = order;
    if (order.paymentMethod == 'pay-with-cash') {
        if (status == 'placed' || status == 'confirm' || status == 'delivered') {
            return (
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        value={'cancel'}
                        onClick={(e) => {
                            handleSetStatusAndShowModal(e.target.value);
                        }}
                        className="btn btn-dark mt-2  w-full p-2 "
                        style={{ marginBottom: '15px' }}
                    >
                        Hủy đơn hàng này
                    </button>
                </div>
            );
        }
    } else {
        if (status == 'placed' || status == 'paid' || status == 'confirm' || status == 'delivering')
            return (
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        value={'cancel'}
                        onClick={(e) => {
                            handleSetStatusAndShowModal(e.target.value);
                        }}
                        className="btn btn-dark mt-2  w-full p-2 "
                        style={{ marginBottom: '15px' }}
                    >
                        Hủy đơn hàng này
                    </button>
                </div>
            );
    }
};
export { HandleChangeButtonSetStatusOrder, HandleChangeButtonCancelOrder };

const handleChangePayMethod = (method) => {
    if (method == 'pay-with-cash') {
        return 'Thanh toán bằng tiền mặt';
    }
    if (method == 'pay-with-momo') {
        return 'Thanh toán bằng momo';
    }
    if (method == 'pay-with-atm') {
        return 'Thanh toán bằng ATM';
    }
    if (method == 'pay-with-credit-card') {
        return 'Thanh toán bằng thẻ Visa';
    }
    if (method == 'pay-with-paypal') {
        return 'Thanh toán bằng paypal';
    } else {
        return method;
    }
};
const handleChangeStateOrder = (status) => {
    if (status == 'placed') {
        return <span className="badge alert-danger">Chờ xác nhận</span>;
    }
    if (status == 'cancelled') {
        return <span className="badge bg-dark">Đơn này đã bị hủy</span>;
    }
    if (status == 'confirm') {
        return <span className="badge alert-warning">Đã xác nhận</span>;
    }
    if (status == 'delivering') {
        return <span className="badge alert-warning">Đang giao</span>;
    }
    if (status == 'paid') {
        return <span className="badge alert-success">Đã thanh toán</span>;
    }
    if (status == 'delivered') {
        return <span className="badge alert-success">Đã giao</span>;
    }
    if (status == 'completed') {
        return <span className="badge alert-success">Hoàn tất</span>;
    } else {
        return <span className="badge alert-warning">{status}</span>;
    }
};
export { handleChangePayMethod, handleChangeStateOrder };

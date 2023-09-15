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
const handleChangeStateOrder = (order) => {
    const { status, paymentMethod } = order;
    if (paymentMethod == 'pay-with-cash') {
        if (status == 'placed') {
            return <span className="font-semibold text-warning">Chờ xác nhận</span>;
        }
        if (status == 'cancelled') {
            return <span className="font-semibold text-red-500">Đơn này đã bị hủy</span>;
        }
        if (status == 'confirm') {
            return <span className="font-semibold text-warning">Đã xác nhận</span>;
        }
        if (status == 'delivering') {
            return <span className="font-semibold text-warning">Đang giao</span>;
        }
        if (status == 'delivered') {
            return <span className="font-semibold text-success">Đã giao</span>;
        }
        if (status == 'completed') {
            return <span className="font-semibold text-success">Hoàn tất</span>;
        } else {
            return <span className="font-semibold text-warning">{status}</span>;
        }
    } else {
        if (status == 'placed') {
            return <span className="font-semibold text-warning">Chờ thanh toán</span>;
        }
        if (status == 'cancelled') {
            return <span className="font-semibold text-red-500">Đơn này đã bị hủy</span>;
        }
        if (status == 'confirm') {
            return <span className="font-semibold text-warning">Đã xác nhận</span>;
        }
        if (status == 'delivering') {
            return <span className="font-semibold text-warning">Đang giao</span>;
        }
        if (status == 'paid') {
            return <span className="font-semibold text-success">Chờ xác nhận</span>;
        }
        if (status == 'delivered') {
            return <span className="font-semibold text-success">Đã giao và thanh toán</span>;
        }
        if (status == 'completed') {
            return <span className="font-semibold text-success">Hoàn tất</span>;
        } else {
            return <span className="font-semibold text-warning">{status}</span>;
        }
    }
};
export { handleChangePayMethod, handleChangeStateOrder };

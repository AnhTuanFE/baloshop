import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '~/redux/Actions/cartActions';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
        navigate('/deliveryaddress');
    }

    const [paymentMethod, setPaymentMethod] = useState('Thanh toán bằng tiền mặt');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login2 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <h4>Phương thức thanh toán</h4>
                    <div className="payment-container">
                        <div className="radio-container">
                            <input
                                className="form-check-input"
                                type="radio"
                                checked
                                value={paymentMethod}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                            />
                            <label className="form-check-label">Thanh toán bằng tiền mặt</label>
                        </div>
                    </div>

                    <button type="submit">Tiếp tục</button>
                </form>
            </div>
        </>
    );
}

export default Payment;

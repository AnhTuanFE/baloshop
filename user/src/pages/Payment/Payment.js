import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '~/redux/Actions/cartActions';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Payment.module.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
            <div className={clsx(styles.wrapper)}>
                <form className={clsx(styles.form)} onSubmit={submitHandler}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" className={clsx(styles.title)}>
                            Phương thức thanh toán
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Thanh toán bằng tiền mặt"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="Thanh toán bằng tiền mặt"
                                control={<Radio />}
                                label="Thanh toán bằng tiền mặt"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                    console.log('e.target.value = ', e.target.value);
                                }}
                            />
                            <FormControlLabel
                                value="Thanh toán qua paypal"
                                control={<Radio />}
                                label="Thanh toán qua paypal"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                    console.log('e.target.value = ', e.target.value);
                                }}
                            />
                            <FormControlLabel
                                value="Thanh toán qua momo"
                                control={<Radio />}
                                label="Thanh toán qua momo"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                    console.log('e.target.value = ', e.target.value);
                                }}
                            />
                        </RadioGroup>
                        <button type="submit" className={clsx(styles.btn_continue)}>
                            Tiếp tục
                        </button>
                    </FormControl>
                </form>
            </div>
        </>
    );
}

export default Payment;

import CustomizedSteppersMoney from './StateOrderMoney/CustomizedSteppersMoney';
import CustomizedSteppersPaypal from './StateOrderPaypal/CustomizedSteppersPaypal';
import CustomizedSteppersMomo from './StateOrderMomo/CustomizedSteppersMomo';
export default function Steppers({ order }) {
    if (order?.paymentMethod == '"Thanh toán qua momo"') {
        return <CustomizedSteppersMomo order={order} />;
    } else if (order?.paymentMethod == '"Thanh toán qua paypal"') {
        return <CustomizedSteppersPaypal order={order} />;
    } else {
        return (
            <>
                <CustomizedSteppersMoney order={order} />
            </>
        );
    }
}

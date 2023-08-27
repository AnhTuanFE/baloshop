import CustomizedSteppersMoney from './StateOrderMoney/CustomizedSteppersMoney';
import CustomizedSteppersPaypal from './StateOrderPaypal/CustomizedSteppersPaypal';
import CustomizedSteppersMomo from './StateOrderMomo/CustomizedSteppersMomo';
export default function Steppers({ order }) {
    console.log('order = ', order);
    if (order?.paymentMethod == '"payment-with-momo"') {
        return <CustomizedSteppersMomo order={order} />;
    } else if (order?.paymentMethod == '"payment-with-paypal"') {
        return <CustomizedSteppersPaypal order={order} />;
    } else {
        return (
            <>
                <CustomizedSteppersMoney order={order} />
            </>
        );
    }
}

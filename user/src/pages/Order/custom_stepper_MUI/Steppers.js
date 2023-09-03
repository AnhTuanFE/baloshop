import CustomizedSteppersMoney from './StateOrderMoney/CustomizedSteppersMoney';
import CustomizedSteppersPaypal from './StateOrderPaypal/CustomizedSteppersPaypal';
import CustomizedSteppersMomo from './StateOrderMomo/CustomizedSteppersMomo';
export default function Steppers({ order }) {
    console.log('order = ', order);
    if (order?.paymentMethod == 'pay-with-cash') {
        return <CustomizedSteppersMoney order={order} />;
    } else {
        return (
            <>
                <CustomizedSteppersMomo order={order} />
            </>
        );
    }
}

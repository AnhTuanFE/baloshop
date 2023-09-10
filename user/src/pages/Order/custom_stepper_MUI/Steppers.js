import CustomizedSteppersMoney from './StateOrderMoney/CustomizedSteppersMoney';
import CustomizedSteppersPayOnline from './StateOrderMomo/CustomizedSteppersPayOnline';
export default function Steppers({ order }) {
    if (order?.paymentMethod == 'pay-with-cash') {
        return <CustomizedSteppersMoney order={order} />;
    } else {
        return (
            <>
                <CustomizedSteppersPayOnline order={order} />
            </>
        );
    }
}

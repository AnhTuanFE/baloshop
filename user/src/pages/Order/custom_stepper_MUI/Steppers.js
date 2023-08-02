import CustomizedSteppersMoney from './StateOrderMoney/CustomizedSteppersMoney';
import CustomizedSteppersPaypal from './StateOrderPaypal/CustomizedSteppersPaypal';
export default function Steppers({ order }) {
    return (
        <>
            {order?.paypalOrder ? (
                <CustomizedSteppersPaypal order={order} />
            ) : (
                <CustomizedSteppersMoney order={order} />
            )}
        </>
    );
}

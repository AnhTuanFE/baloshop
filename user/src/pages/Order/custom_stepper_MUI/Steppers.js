import CustomizedSteppersMoney from './StateOrderPaypal/CustomizedSteppersMoney';
import CustomizedSteppersPaypal from './StateOrderMoney/CustomizedSteppersPaypal';
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

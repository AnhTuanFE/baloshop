import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AddLocationSharpIcon from '@mui/icons-material/AddLocationSharp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { handleChangePayMethod } from '~/hooks/HandleChangeMethod';

function InfoPayer({ order }) {
    return (
        <div className="mb-4 rounded bg-white py-1 shadow-custom-shadow max-sm:px-2 sm:px-5">
            <div className="row col-lg-12 rounded-md pt-3 max-sm:my-1 sm:my-3">
                <div className="col-lg-3 flex px-2">
                    <div className="mr-2 px-2">
                        <AccountCircleSharpIcon className="text-[var(--main-color)]" fontSize="large" />
                    </div>
                    <div className="">
                        <p>
                            <span className="font-semibold">Họ tên:</span> {order.name}
                        </p>
                        <p>
                            <span className="font-semibold">Số điện thoại:</span> {order.phone}
                        </p>
                    </div>
                </div>
                <div className="col-lg-5 flex px-2">
                    <div className="mr-2 px-2">
                        <AddLocationSharpIcon className="text-[var(--main-color)]" fontSize="large" />
                    </div>
                    <div className="">
                        <p>
                            <span className="font-semibold">Địa chỉ:</span>{' '}
                            {`${order?.shippingAddress?.city}, ${order?.shippingAddress?.district}, ${order?.shippingAddress?.ward}, ${order?.shippingAddress?.address}`}
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 flex px-2">
                    <div className="mr-2 px-2">
                        <MonetizationOnIcon className="text-[var(--main-color)]" fontSize="large" />
                    </div>
                    <div className="">
                        <p>
                            <span className="font-semibold">Phương thức thanh toán:</span>
                            <div>{handleChangePayMethod(order?.paymentMethod)}</div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPayer;

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AddLocationSharpIcon from '@mui/icons-material/AddLocationSharp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function InfoPayer({ order }) {
    return (
        <div className="mb-4 rounded bg-white px-2 py-1 shadow-custom-shadow">
            <div className="my-3 flex items-center justify-around rounded-md pt-3">
                <div className="flex">
                    <div className="mr-2 mt-2 px-2">
                        <AccountCircleSharpIcon className="" fontSize="large" color="primary" />
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
                <div className="flex">
                    <div className="mr-2 px-2">
                        <AddLocationSharpIcon className="" fontSize="large" color="primary" />
                    </div>
                    <div className="">
                        <p>
                            <span className="font-semibold">Địa chỉ:</span>{' '}
                            {`${order.shippingAddress.city}, ${order.shippingAddress.distric}, ${order.shippingAddress.ward}, ${order.shippingAddress.address}`}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="mr-2 px-2">
                        <MonetizationOnIcon className="" fontSize="large" color="primary" />
                    </div>
                    <div className="">
                        <p>
                            <span className="font-semibold">Phương thức:</span> {order.paymentMethod.replace(/"/g, '')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPayer;

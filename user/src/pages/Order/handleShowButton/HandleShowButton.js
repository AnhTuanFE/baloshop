const HandleShowButton = (order) => {
    const { status, paymentMethod } = order;
    if (paymentMethod == 'pay-with-cash') {
        if (status == 'delivered') {
            return (
                <div className="">
                    <div className="">
                        <button
                            value={'received'}
                            className=" btn mb-2 w-full cursor-pointer rounded-lg bg-success px-1 py-2 text-base font-semibold uppercase text-white hover:opacity-[0.9]"
                            onClick={() => window.my_modal_3.showModal()}
                        >
                            Hoàn tất đơn hàng
                        </button>
                        <a
                            className="mt-3 cursor-pointer rounded-lg bg-red-600 py-2 text-center text-white hover:opacity-[0.9]"
                            onClick={() => window.my_modal_4.showModal()}
                        >
                            <button className="w-full text-lg font-semibold uppercase">Trả hàng</button>
                        </a>
                    </div>
                </div>
            );
        }
        if (status == 'placed') {
            return (
                <div className="mx-2 pt-2">
                    <button
                        onClick={() => window.my_modal_1.showModal()}
                        className=" w-full cursor-pointer rounded-lg bg-[var(--red-color)] py-1 text-sm font-semibold uppercase text-white hover:bg-[var(--red-color-hover)]"
                    >
                        HỦY ĐƠN HÀNG
                    </button>
                </div>
            );
        }
    } else {
        if (status == 'delivered') {
            return (
                <div className="">
                    <div className="">
                        <button
                            value={'received'}
                            className=" btn mb-2 w-full cursor-pointer rounded-lg bg-success px-1 py-2 text-base font-semibold uppercase text-white hover:opacity-[0.9]"
                            onClick={() => window.my_modal_3.showModal()}
                        >
                            Hoàn tất đơn hàng
                        </button>
                        <a
                            className="mt-3 cursor-pointer rounded-lg bg-red-600 py-2 text-center text-white hover:opacity-[0.9]"
                            onClick={() => window.my_modal_4.showModal()}
                        >
                            <button className="w-full text-lg font-semibold uppercase">Trả hàng</button>
                        </a>
                    </div>
                </div>
            );
        }
        if (status == 'placed') {
            return (
                <div className="mx-2 pt-2">
                    <button
                        onClick={() => window.my_modal_1.showModal()}
                        className=" w-full cursor-pointer rounded-lg bg-red-600 py-1 text-sm font-semibold uppercase text-white"
                    >
                        HỦY ĐƠN HÀNG
                    </button>
                </div>
            );
        }
    }
};

export { HandleShowButton };

import { Fragment } from 'react';
function ModalDaiSyUI({ Title, Body, HandleSubmit }) {
    return (
        <Fragment>
            <dialog
                id="my_modal_1"
                className="col-lg-5 modal modal-top m-auto mt-5 rounded-lg max-sm:w-[300px] sm:w-[400px]"
            >
                <form method="dialog" className="modal-box">
                    <div className="rounded-md text-center">
                        <h3 className="text-lg font-bold">{Title}!</h3>
                    </div>
                    <p className=" max-sm:py-3 sm:py-4">{Body}</p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="rounded-lg bg-[#f2f2f2] px-3 py-2">Hủy</button>
                        <button
                            className="rounded-lg bg-[var(--main-color)] px-3 py-2 text-white"
                            onClick={HandleSubmit}
                        >
                            Đồng ý
                        </button>
                    </div>
                </form>
            </dialog>
        </Fragment>
    );
}

export default ModalDaiSyUI;

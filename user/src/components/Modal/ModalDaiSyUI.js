import { Fragment } from 'react';
function ModalDaiSyUI({ Title, Body, HandleSubmit }) {
    return (
        <Fragment>
            <dialog id="my_modal_1" className="col-lg-5 modal modal-top m-auto mt-5 w-[400px] rounded-lg">
                <form method="dialog" className="modal-box">
                    <div className="rounded-md text-center">
                        <h3 className="text-lg font-bold">{Title}!</h3>
                    </div>
                    <p className="py-4">{Body}</p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Hủy</button>
                        <button className="btn bg-[var(--main-color2)] text-white" onClick={HandleSubmit}>
                            Đồng ý
                        </button>
                    </div>
                </form>
            </dialog>
        </Fragment>
    );
}

export default ModalDaiSyUI;

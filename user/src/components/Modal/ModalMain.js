import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
function ModalMain(prop, ref) {
    // modal
    const modalRef = useRef(null);

    const handleOpenModal = () => {
        modalRef.current.showModal();
    };

    const handleCloseModal = () => {
        modalRef.current.close();
    };

    const handleOverlayClick = (event) => {
        if (event.target === modalRef.current) {
            handleCloseModal();
        }
    };
    useImperativeHandle(ref, () => ({
        openModal() {
            handleOpenModal();
        },
        closeModal() {
            handleCloseModal();
        },
        overLayCloseModal() {
            handleOverlayClick();
        },
    }));
    const { content } = prop;
    return (
        <dialog ref={modalRef} className="w-1/3 rounded-lg" onClick={handleOverlayClick}>
            <button
                onClick={handleCloseModal}
                className="btn-sm btn-circle btn absolute right-2 top-2 bg-[var(--main-color2)] font-extrabold text-white"
            >
                ✕
            </button>
            <h3 className="text-center text-lg font-bold">{content?.title}</h3>
            <form method="dialog" className="modal-box w-full">
                {content?.child}
            </form>
        </dialog>
    );
}

export default forwardRef(ModalMain);

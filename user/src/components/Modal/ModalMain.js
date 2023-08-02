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
    useEffect(() => {
        console.log('content = ', content);
    });
    return (
        <dialog ref={modalRef} onClose={handleCloseModal} onClick={handleOverlayClick}>
            <form method="dialog" className="modal-box">
                <button
                    onClick={handleCloseModal}
                    className="btn-sm btn-circle btn absolute right-2 top-2 bg-[var(--main-color2)] font-extrabold text-white"
                >
                    ✕
                </button>
                <div>
                    <h3 className="text-center text-lg font-bold">{content?.title}</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    {content?.child}
                </div>
            </form>
        </dialog>
    );
}

export default forwardRef(ModalMain);

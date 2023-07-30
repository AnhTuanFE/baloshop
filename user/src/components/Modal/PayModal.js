import React from 'react';

export default function PayModal({ Title, Body, HandleSubmit }) {
    return (
        <>
            <button
                style={{ display: 'none' }}
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Launch static backdrop modal
            </button>

            <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog text-center">
                    <div class="modal-content">
                        <div class="modal-header bg-[var(--main-color)] text-lg font-semibold">
                            <h5 class="modal-title ml-5 text-white" id="staticBackdropLabel">
                                {Title}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">{Body}</div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                className="rounded-lg bg-[var(--color-layout)] px-2 py-2 text-white hover:bg-[var(--main-color2)]"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[var(--main-color)] px-2 py-2 text-white hover:bg-[var(--main-color2)]"
                                onClick={HandleSubmit}
                                data-bs-dismiss="modal"
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

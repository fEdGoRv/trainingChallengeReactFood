import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import Cart from "./Cart";
import FormModal from "./FormModal";

const CartModal = forwardRef(function modal(props, ref) {

    const dialog = useRef();
    const formDialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            }
        }
    });

    function handleCloseDialog() {
        dialog.current.close();
    }

    function handleCheckOut() {
        handleCloseDialog();
        console.log('ref sending the request to open formModal')
        formDialog.current.open();
    }

    return createPortal(
        <>
            <dialog ref={dialog} className="modal">
                < h3 > Your Cart</h3 >
                <Cart />
                <div className="modal-actions">
                    <button onClick={handleCloseDialog}>Close</button>
                    <button
                        type="button"
                        onClick={handleCheckOut}
                        className="button"
                    >
                        Go to CheckOut
                    </button>
                </div>
            </dialog >

            <FormModal ref={formDialog} />
        </>,
        document.getElementById('modal')
    );
});

export default CartModal;
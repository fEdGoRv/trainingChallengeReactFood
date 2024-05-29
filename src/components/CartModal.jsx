import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';
import Cart from "./Cart";

const CartModal = forwardRef(function modal(props,ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog}>
            <h3>Your Cart</h3>
            <Cart />
        </dialog>,
        document.getElementById('modal')
    )
});

export default CartModal;
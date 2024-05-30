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
        <dialog ref={dialog} className="modal">
            <h3>Your Cart</h3>
            <Cart />
            <div className="modal-actions">
                <button onClick={()=>dialog.current.close()}>Close</button>
                <button className="button">Go to CheckOut</button>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
});

export default CartModal;
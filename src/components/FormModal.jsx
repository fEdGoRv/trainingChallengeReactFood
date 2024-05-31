import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/CartProvider";


const FormModal = forwardRef(function form(props, ref) {
    const formDailog = useRef();

    const {formattedTotalPrice} = useContext(CartContext);

    useImperativeHandle(ref, () => {
        return {
            open:() => {
                console.log('open method is called')
                formDailog.current.showModal();
            }
        }  
    })


    return createPortal(
        <dialog ref={formDailog} className="modal">
            <p>Total Amount ${`${formattedTotalPrice}`}</p>
            <div className="control">
                <label id="name">Full Name</label>
                <input id="name" required/>
            </div>
            <div className="control">
                <label id="email">Email Adress</label>
                <input id="email" required />
            </div>
            <div className="control">
                <label id="street">Street</label>
                <input id="street" required />
            </div>
            <div>
                <div className="control">
                    <label id="postal-code">Postal Code</label>
                    <input id="postal-code" required />
                </div>
                <div className="control">
                    <label id="city">City</label>
                    <input id="city" required />
                </div>

            </div>
            <div className="modal-actions">
                <button onClick={() => formDailog.current.close()}>Close</button>
                <button className="button" >Submit Order</button>
            </div>
        </dialog>
        , document.getElementById('modal'));
});

export default FormModal;
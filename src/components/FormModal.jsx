import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/CartProvider";


const FormModal = forwardRef(function form(props, ref) {
    const { formattedTotalPrice, items, clearCart } = useContext(CartContext);

    const formDailog = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const [posttingData, setPosttingData] = useState({})



    useImperativeHandle(ref, () => {
        return {
            open: () => {
                formDailog.current.showModal();
            }
        }
    })

    function handleCloseDialog() {
        formDailog.current.close();
    }
    function resetForm(){
        nameRef.current.value="";
        emailRef.current.value="";
        streetRef.current.value="";
        postalCodeRef.current.value="";
        cityRef.current.value="";
        clearCart();
    }

    function handleSubmitOrder(event) {
        event.preventDefault();
        setPosttingData({
            name: nameRef.current.value,
            email: emailRef.current.value,
            streetref: streetRef.current.value,
            postalCode: postalCodeRef.current.value,
            city: cityRef.current.value,
            items: items
        });
        handleCloseDialog();
        resetForm();
        console.log('processing order');
        console.log(posttingData);
    }


    return createPortal(
        <dialog ref={formDailog} className="modal">
            <form onSubmit={handleSubmitOrder}>
                <h2>Check Out</h2>
                <p>Total Amount {`${formattedTotalPrice}`}</p>
                <div className="control">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        ref={nameRef}
                        required
                    />
                </div>
                <div className="control">
                    <label htmlFor="email">Email Adress</label>
                    <input
                        id="email"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className="control">
                    <label htmlFor="street">Street</label>
                    <input
                        id="street"
                        ref={streetRef}
                        required
                    />
                </div>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input
                            id="postal-code"
                            ref={postalCodeRef}
                            required
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            ref={cityRef}
                            required
                        />
                    </div>

                </div>
                <div className="modal-actions">
                    <button type="button" onClick={handleCloseDialog}>Close</button>
                    <button>Submit Order</button>
                </div>
            </form>
        </dialog>
        , document.getElementById('modal'));
});

export default FormModal;
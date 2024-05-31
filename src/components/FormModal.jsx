import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/CartProvider";


const FormModal = forwardRef(function form(props, ref) {
    const {items} = useContext(CartContext);
    const formDailog = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();
    const [posttingData, setPosttingData] = useState({})

    const {formattedTotalPrice} = useContext(CartContext);

    useImperativeHandle(ref, () => {
        return {
            open:() => {
                formDailog.current.showModal();
            }
        }  
    })

    function handleSubmitOrder(event, items){
        event.preventDefualt();
        setPosttingData({
            name: nameRef.current.value,
            email: emailRef.current.value,
            streetref: streetRef.current.value,
            postalCode: postalCodeRef.current.value,
            city: cityRef.current.value,
            items: items 
        });
        console.log('processing order');
       console.log(posttingData);
    }


    return createPortal(
        <dialog ref={formDailog} className="modal">
        <form onSubmit={()=>handleSubmitOrder(items)}>
            <h2>Check Out</h2>
            <p>Total Amount {`${formattedTotalPrice}`}</p>
            <div className="control">
                <label id="name">Full Name</label>
                <input 
                id="name" 
                ref={nameRef}
                required
                />
            </div>
            <div className="control">
                <label id="email">Email Adress</label>
                <input 
                id="email" 
                ref={emailRef} 
                required  
                />
            </div>
            <div className="control">
                <label id="street">Street</label>
                <input 
                id="street" 
                ref={streetRef} 
                required
                />
            </div>
            <div className="control-row">
                <div className="control">
                    <label id="postal-code">Postal Code</label>
                    <input 
                    id="postal-code" 
                    ref={postalCodeRef} 
                    required 
                    />
                </div>
                <div className="control">
                    <label id="city">City</label>
                    <input 
                    id="city" 
                    ref={cityRef} 
                    required 
                    />
                </div>

            </div>
            <div className="modal-actions">
                <button onClick={() => formDailog.current.close()}>Close</button>
                <button className="button" >Submit Order</button>
            </div>
            </form>
        </dialog>
        , document.getElementById('modal'));
});

export default FormModal;
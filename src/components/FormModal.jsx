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

    const [error, setError] = useState({});
    const [loading, setLoading] = useState();

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

    async function handleSubmitOrder(event) {
        event.preventDefault();
        setLoading(true);
       const data = {
        customer:{
            name: nameRef.current.value,
            email: emailRef.current.value,
            street: streetRef.current.value,
            "postal-code": postalCodeRef.current.value,
            city: cityRef.current.value
       },
       items: items
        };
        console.log(data);
        try{
            const response = await fetch('http://localhost:3000/orders',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({order:data}),
            });
            if(!response.ok){
                throw new Error('Failed to submit your order, please try agian later.')
            }
            handleCloseDialog();
            resetForm();
            console.log('Order submitted successfully!')
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false);
        }     
    }
    
    return createPortal(
        <>
        {loading && <p>Your order is beening processed</p>}
        {error && <p style={{color: 'red'}}>{error.message}</p>}
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
        </>
        , document.getElementById('modal'));
});

export default FormModal;
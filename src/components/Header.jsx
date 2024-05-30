import { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartProvider';
import CartModal from './CartModal';

export default function () {
    const { totalQuantity } = useContext(CartContext);
    const [cartItemsQuant, setCartItemQuantity] = useState(0);
    
    const modal = useRef();

    function HandleOpenModal(){
        modal.current.open();
    }

    useEffect(()=>{
        if(totalQuantity>0)
            setCartItemQuantity(totalQuantity);
        else
            setCartItemQuantity(0)
    },[totalQuantity])

    return <>
        <CartModal ref={modal} />
        <section id='main-header'>
            <div id='title'>
                <h1>reactfood</h1>
                <img src={logo} alt='logo-app' />
            </div>
            <button onClick={HandleOpenModal} className='button'>
            cart {cartItemsQuant>0 && `(${cartItemsQuant})`}
            </button>
        </section>
    </>
}
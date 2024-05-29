import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartProvider';
import CartModal from './CartModal';

export default function () {
    const { items } = useContext(CartContext);
    let cartItemsQuant = items.length;

    const modal = useRef();

    function HandleOpenModal(){
        modal.current.open();
    }

    return <>
        <CartModal ref={modal} />
        <section id='main-header'>
            <div id='title'>
                <h1>reactfood</h1>
                <img src={logo} alt='logo-app' />
            </div>
            <button onClick={HandleOpenModal} className='button'>cart ({`${cartItemsQuant}`})</button>
        </section>
    </>
}
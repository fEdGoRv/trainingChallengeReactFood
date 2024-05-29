import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartProvider';

export default function () {
    const { items } = useContext(CartContext);
    let cartItemsQuant = items.length;
    console.log(cartItemsQuant)

    return <section id='main-header'>
        <div id='title'>
            <h1>reactfood</h1>
            <img src={logo} alt='logo-app' />
        </div>
        <button className='button'>cart ({`${cartItemsQuant}`})</button>
    </section>
}
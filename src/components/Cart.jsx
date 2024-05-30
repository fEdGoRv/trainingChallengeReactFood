import { useContext } from "react"
import { CartContext } from "../store/CartProvider"

export default function () {

    const { items, addItem, formattedTotalPrice:totalPrice, decrementItem } = useContext(CartContext);
    if (!items) {
        return <p>Loading please wait...</p>
    }

    return (
        <div className="cart">
            {items.map((item) =>
                    <div key={item.id} className="cart-item">
                        <p>{item.name} - {item.quantity} x {item.price}</p>
                        <div className="cart-item-actions">
                            <button onClick={()=>decrementItem(item.id)}>-</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => addItem(item.id)}>+</button>
                        </div>
                    </div>
            )}
            <div className="cart-total">
                {totalPrice}
            </div>
        </div>
    )
} 
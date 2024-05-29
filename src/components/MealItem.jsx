import { useContext } from "react";
import { CartContext } from "../store/CartProvider";

export default function MealItem({ id, name, price, description, image }) {
    const {addItem} = useContext(CartContext)
    return (
        <div className="meal-item">
            <img src={`../../backend/public/${image}`} alt="ImageReactFood" />
            <h3>{name}</h3>
            <p className="meal-item-price">{price}</p>
            <p className="meal-item-description">{description}</p>
            <button onClick={()=>addItem(id)}>Add to Cart</button>
        </div>
    );
}
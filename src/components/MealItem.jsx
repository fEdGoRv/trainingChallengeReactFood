export default function MealItem({ name, price, description, image }) {
    return (
        <div className="meal-item">
            <img src={`../../backend/public/${image}`} alt="ImageReactFood" />
            <h3>{name}</h3>
            <p className="meal-item-price">{price}</p>
            <p className="meal-item-description">{description}</p>
            <button>Add to Cart</button>
        </div>
    );
}
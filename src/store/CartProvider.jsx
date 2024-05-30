import { createContext, useState, useEffect } from "react";


export const CartContext = createContext({
  items: [],
  addItem: () => { },
  onFetch: () => { },
})

export function CartProvider({ children }) {

  const [shoppingCart, setShoppingCart] = useState({
    items: []
  });

  async function onFetch() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if (!response.ok) {
      throw new Error('An error happens fetching the meals.');
    }
    return resData;
  }


  async function addItem(id) {
    const meals = await onFetch();
    setShoppingCart((prevCartState) => {
      const exitingItems = [...prevCartState.items];
      const exitingItemIndex = exitingItems.findIndex((item) =>
        item.id === id
      );

      const existingCartItem = exitingItems[exitingItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        }
        exitingItems[exitingItemIndex] = updatedItem;
      } else {
        const product = meals.find((item) => item.id === id);
        exitingItems.push({
          id: id,
          name: product.name,
          price: product.price,
          img: product.image,
          quantity: 1
        })
      }
      return { ...prevCartState, items: exitingItems };
    });
  }

  useEffect(() => {
    onFetch();
  }, []);

  const totalPrice = shoppingCart.items.reduce((acc, item) =>
    acc + (item.price * item.quantity),
    0);

  const totalQuantity = shoppingCart.items.reduce((acc, item) =>
    acc + item.quantity,
    0);

  const ctxValue = {
    items: shoppingCart.items,
    addItem,
    onFetch,
    totalPrice,
    totalQuantity
  }

  return (
    <CartContext.Provider value={ctxValue}>
      {children}
    </CartContext.Provider>
  );
}
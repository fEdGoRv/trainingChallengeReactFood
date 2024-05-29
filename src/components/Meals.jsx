import { useState, useEffect, useContext } from "react";
import MealItem from "./MealItem";
import Error from "./Error";
import { CartContext } from "../store/CartProvider";


export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const { onFetch } = useContext(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      setError(null);

      try {
        const meals = await onFetch();
        console.log(meals)


        if (Array.isArray(meals)) {
          console.log(meals)
          setAvailableMeals(meals);
        } else {
          throw new Error('Fetched data is not an array');
        }

      } catch (error) {
        setError({
          message: error.message || 'Could not fetch meals please try again later.'
        })
      }

      setIsFetching(false);
    }
    fetchMeals();
  }, [onFetch]);

  if (error) {
    return <Error
      title='An error ocurred!'
      message={error.message}

    />
  }

  return (
    <div id="meals">
      {isFetching && 'Meals are fetching. Please wait.'}
      {!isFetching && availableMeals.map((meal) =>
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
          image={meal.image}
        />
      )}
    </div>
  )
}
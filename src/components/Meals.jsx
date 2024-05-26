import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import Error from "./Error";


export default function Meals() {
  const [availableMeals, setAvailablesMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  async function fetchAvailableMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();
    
    if (!response.ok) {
      throw new Error('An error happens fetching the meals.');
    }
    console.log(resData)
    return resData;
  }
  
  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try{
        const meals = await fetchAvailableMeals();
        console.log(meals)
        setAvailablesMeals(meals);
        setIsFetching(false);
      }catch(error){
        setError({
          message: error.message || 'Could not fetch meals please try again later.'
        })
      }
    }
    fetchMeals();
  }, []);

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
          name={meal.name}
          price={meal.price}
          description={meal.description}
          image={meal.image}
        />
      )}
    </div>
  )
}
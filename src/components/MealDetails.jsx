import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
let vId = '';
const Numbers = Array.from({ length: 20 }, (_, i) => i + 1);
function MealDetails() {
  const { MealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const MealData = async () => {
      try {
        setDetailsLoading(true);
        const mealDataById = await loadMealById(MealId);
        setMealDetails(mealDataById);
      } catch (err) {
        setError('Failed to load...');
      } finally {
        setDetailsLoading(false);
      }
    };

    MealData();
  }, [MealId]);
  if (mealDetails) {
    const url = mealDetails.strYoutube;
    const str = url.split('=');
    vId = str[str.length - 1];
  }

  if (detailsLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {mealDetails && (
        <div>
          <h2>{mealDetails.strMeal}</h2>
          <img src={mealDetails.strMealThumb} />
          <h5>Category:{mealDetails.strCategory}</h5>
          <h5>Cusine:{mealDetails.strArea}</h5>
          <h5>Ingredients</h5>
          {Numbers.map((number) => {
            const ingredient = mealDetails[`strIngredient${number}`];
            const measure = mealDetails[`strMeasure${number}`];
            return (
              ingredient && (
                <ul>
                  <li key={number}>
                    {ingredient}:{measure}
                  </li>
                </ul>
              )
            );
          })}
          <h5>Instructions:</h5>
          <p>{mealDetails.strInstructions}</p>
          <iframe src={`https://www.youtube.com/embed/${vId}`}></iframe>
        </div>
      )}
    </>
  );
}

export default MealDetails;

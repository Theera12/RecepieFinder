import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MealDetails.module.css';
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
        <div className={styles.outerContainer}>
          <div className={styles.imageContainer}>
            <h1>{mealDetails.strMeal.toUpperCase()}</h1>
            <iframe src={`https://www.youtube.com/embed/${vId}`}></iframe>
          </div>
          <div className={styles.innerContainer}>
            <div>
              <h2>Ingredients</h2>
              <ul>
                {Numbers.map((number) => {
                  const ingredient = mealDetails[`strIngredient${number}`];
                  const measure = mealDetails[`strMeasure${number}`];
                  return (
                    ingredient && (
                      <li key={number}>
                        {ingredient}--{measure}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
            <div>
              <div className={styles.instructionContainer}>
                <h2>Category</h2>
                <h3>{mealDetails.strCategory}</h3>
                <h2>Cusine</h2>
                <h3>{mealDetails.strArea}</h3>
              </div>
              <h2>Instructions:</h2>
              <p>{mealDetails.strInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MealDetails;

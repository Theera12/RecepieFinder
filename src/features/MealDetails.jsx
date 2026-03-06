import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MealDetails.module.css';

let vId = '';
const Numbers = Array.from({ length: 20 }, (_, i) => i + 1);
const Stars = Array.from({ length: 5 }, (_, i) => i + 1);
function MealDetails() {
  const { MealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState('');

  //loads a single selected meal my id
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

  //  Initialize state from localStorage or 0
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(`meal-rating-${MealId}`);
    return savedRating ? JSON.parse(savedRating) : 0;
  });

  //  Persist to localStorage when rating changes
  useEffect(() => {
    localStorage.setItem(`meal-rating-${MealId}`, JSON.stringify(rating));
  }, [rating, MealId]);

  //To embed video id to youtube
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
              {Stars.map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: 'pointer',
                    color: star <= rating ? '#ffc107' : '#e4e5e9',
                    fontSize: '2rem',
                    background: 'none',
                    border: 'none',
                  }}
                >
                  ★
                </button>
              ))}
              <p>Your rating: {rating} / 5</p>
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

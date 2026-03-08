import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from './MealDetails.module.css';
import { IoBagAddOutline } from 'react-icons/io5';

const Numbers = Array.from({ length: 20 }, (_, i) => i + 1);
const Stars = Array.from({ length: 5 }, (_, i) => i + 1);
function MealDetails() {
  const { MealId } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState('');
  let nav = useNavigate();

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

  //  Initialize rating state from localStorage or 0
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(`meal-rating-${MealId}`);
    return savedRating ? JSON.parse(savedRating) : 0;
  });

  //  Persist to localStorage  rating changes
  useEffect(() => {
    localStorage.setItem(`meal-rating-${MealId}`, JSON.stringify(rating));
  }, [rating, MealId]);

  //  Initialize state from localStorage or empty array for shopping list
  const [shoppingList, setShoppingList] = useState(() => {
    const savedList = localStorage.getItem('list');
    return savedList ? JSON.parse(savedList) : [];
  });

  //  Persist to localStorage  when added to shopping list
  useEffect(() => {
    localStorage.setItem(`list`, JSON.stringify(shoppingList));
  }, [shoppingList]);

  const handleMyShopingNavigation = () => {
    nav(`/myshopping`);
  };

  //To embed video id to youtube
  const vId = mealDetails?.strYoutube?.split('=')[1] || '';

  if (detailsLoading) return <p className={styles.errorText}>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {mealDetails && (
        <div className={styles.outerContainer}>
          <div className={styles.imageContainer}>
            <h1>{mealDetails.strMeal.toUpperCase()}</h1>
            <iframe
              title="recipe-video"
              src={`https://www.youtube.com/embed/${vId}`}
            ></iframe>
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
                        {/*Adds the ingredients to shopping list */}
                        <button
                          className={styles.plusButton}
                          onClick={() =>
                            setShoppingList((prev) => [
                              ...prev,

                              { ingredient, measure, id: Date.now() },
                            ])
                          }
                        >
                          <IoBagAddOutline />
                        </button>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
            <div>
              {/*Adds Star Rating */}
              {Stars.map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`${styles.starButton} ${
                    star <= rating ? styles.activeStar : ''
                  }`}
                >
                  ★
                </button>
              ))}
              <p>Your rating: {rating} / 5</p>
            </div>
            <button
              className={styles.shoppingButton}
              onClick={handleMyShopingNavigation}
            >
              My Shopping{' '}
            </button>
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

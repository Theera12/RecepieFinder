import { IoMdHeart } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { useRecipeContext } from '../contexts/RecipeContext';
import styles from './RecipeCardList.module.css';

function RecipeCardList({ recipe }) {
  const { addToFavourites, removeFavourites, isFavourite } = useRecipeContext();
  const favourite = isFavourite(recipe.idMeal);
  let navigate = useNavigate();

  //Adding Favourite recipe
  const onFavouriteButtonClick = useCallback(
    (e) => {
      e.preventDefault();

      if (favourite) removeFavourites(recipe.idMeal);
      else addToFavourites(recipe);
    },
    [favourite, recipe, addToFavourites, removeFavourites]
  );

  //Function to navigate to meal details page
  const handleDirectionMealData = useCallback(() => {
    navigate(`/${recipe.idMeal}`);
  }, [navigate, recipe.idMeal]);

  return (
    <>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy"></img>
      <h4>
        {recipe.strMeal.length > 10
          ? recipe.strMeal.substring(0, 10) + '...'
          : recipe.strMeal}
      </h4>

      <button
        className={styles.favouriteButton}
        onClick={onFavouriteButtonClick}
      >
        <IoMdHeart
          className={`${styles.icon} ${
            favourite ? styles.iconActive : styles.iconInactive
          }`}
        />
      </button>
      <button
        className={styles.directionButton}
        onClick={handleDirectionMealData}
      >
        Recipe
      </button>
    </>
  );
}
export default RecipeCardList;

import { useRecipeContext } from '../contexts/RecipeContext';
import RecipeCard from '../features/RecipeCard';

import styles from './Favourite.module.css';

function Favourites() {
  const { favourites } = useRecipeContext();

  return (
    <>
      {favourites.length > 0 ? (
        <div>
          <h1>MY FAVOURITES</h1>
          <div className={styles.favouriteContainer}>
            {favourites.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.idMeal} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className={styles.empty}>
          No Favourites Yet.. Start adding favourites..
        </h2>
      )}
    </>
  );
}

export default Favourites;

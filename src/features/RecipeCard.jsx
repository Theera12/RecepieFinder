import styles from './RecipeCard.module.css';
import RecipeCardList from './RecipeCardList';

function RecipeCard({ recipe }) {
  return (
    <div className={styles.recipeCard}>
      <RecipeCardList recipe={recipe} />
    </div>
  );
}
export default RecipeCard;

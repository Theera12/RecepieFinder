import { IoMdHeart } from 'react-icons/io';
import { useState } from 'react';
import styles from './RecepieCardList.module.css';
function RecepieCardList({ recepie }) {
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const onFavouriteButtonClick = () => {
    setIsFavouriteClicked((prev) => !prev);
  };
  return (
    <>
      <img src={recepie.strMealThumb} alt={recepie}></img>
      <h4>{recepie.strMeal}</h4>

      <button
        className={styles.favouriteButton}
        onClick={onFavouriteButtonClick}
      >
        <IoMdHeart
          className={styles.icon}
          style={isFavouriteClicked ? { color: 'red' } : { color: 'grey' }}
        />
      </button>
      <button className={styles.directionButton}>Directions</button>
    </>
  );
}
export default RecepieCardList;

import { IoMdHeart } from 'react-icons/io';
import { useState, useEffect } from 'react';
import styles from './RecepieCardList.module.css';
import { loadMealById } from '../services/api';
function RecepieCardList({ recepie }) {
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const [favouriteId, setFavouriteId] = useState('');
  const [mealDirectionData, setMealDirectionData] = useState([]);
  const [directionId, setDirectionId] = useState('');
  const onFavouriteButtonClick = () => {
    setIsFavouriteClicked((prev) => !prev);
    setFavouriteId(recepie.idMeal); //id of the favourite meal
  };
  const handledirectionMealData = () => {
    setDirectionId(recepie.idMeal);
  };

  return (
    <>
      <img src={recepie.strMealThumb} alt={recepie}></img>
      <h4>
        {recepie.strMeal.length > 10
          ? recepie.strMeal.substring(0, 10) + '...'
          : recepie.strMeal}
      </h4>

      <button
        className={styles.favouriteButton}
        onClick={onFavouriteButtonClick}
      >
        <IoMdHeart
          className={styles.icon}
          style={isFavouriteClicked ? { color: 'red' } : { color: 'grey' }}
        />
      </button>
      <button
        className={styles.directionButton}
        onClick={handledirectionMealData}
      >
        Directions
      </button>
    </>
  );
}
export default RecepieCardList;

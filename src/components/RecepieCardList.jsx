import { IoMdHeart } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './RecepieCardList.module.css';

function RecepieCardList({ recepie }) {
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const onFavouriteButtonClick = () => {
    setIsFavouriteClicked((prev) => !prev);
  };
  let navigate = useNavigate();
  const handledirectionMealData = () => {
    navigate(`/${recepie.idMeal}`);
  };

  return (
    <>
      <img src={recepie.strMealThumb} alt={recepie.strMeal}></img>
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

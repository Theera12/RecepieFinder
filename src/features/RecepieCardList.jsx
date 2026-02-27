import { IoMdHeart } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecepieContext } from '../contexts/RecepieContext';
import styles from './RecepieCardList.module.css';

function RecepieCardList({ recepie }) {
  const { addToFavourites, removeFavourites, isFavourite } =
    useRecepieContext();
  const favourite = isFavourite(recepie.idMeal);

  // const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);

  const onFavouriteButtonClick = (e) => {
    //  setIsFavouriteClicked((prev) => !prev);
    e.preventDefault();
    e.stopPropagation();
    if (favourite) removeFavourites(recepie.idMeal);
    else addToFavourites(recepie);
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
          style={favourite ? { color: 'red' } : { color: 'grey' }}
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

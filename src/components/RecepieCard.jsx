import styles from './RecepieCard.module.css';
import { IoMdHeart } from 'react-icons/io';
import { useState } from 'react';
function Recepiecard({ recepie }) {
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const onFavouriteButtonClick = () => {
    setIsFavouriteClicked((prev) => !prev);
  };
  return (
    <div className={styles.recepieCard}>
      <img src={recepie.url} alt={recepie.title}></img>
      <h4>{recepie.title}</h4>

      <button
        className={styles.favouriteButton}
        onClick={onFavouriteButtonClick}
      >
        <IoMdHeart
          style={isFavouriteClicked ? { color: 'red' } : { color: 'grey' }}
        />
      </button>
      <button className={styles.directionButton}>Directions</button>
    </div>
  );
}
export default Recepiecard;

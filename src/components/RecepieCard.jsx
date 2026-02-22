import styles from './RecepieCard.module.css';
import { IoMdHeart } from 'react-icons/io';

function Recepiecard({ recepie }) {
  const onFavouriteButtonClick = () => {
    alert('I am clicked');
  };
  return (
    <div className={styles.recepieCard}>
      <img src={recepie.url} alt={recepie.title}></img>
      <h4>{recepie.title}</h4>

      <button
        className={styles.favouriteButton}
        onClick={onFavouriteButtonClick}
      >
        <IoMdHeart />
      </button>
    </div>
  );
}
export default Recepiecard;

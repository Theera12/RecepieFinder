import styles from './RecepieCard.module.css';
import RecepieCardList from './RecepieCardList';

function RecepieCard({ recepie }) {
  return (
    <div className={styles.recepieCard}>
      <RecepieCardList recepie={recepie} />
    </div>
  );
}
export default RecepieCard;

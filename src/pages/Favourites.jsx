import { useRecepieContext } from '../contexts/RecepieContext';
import RecepieCard from '../features/RecepieCard';

import styles from '../pages/Home.module.css';

function Favourites() {
  const { favourites } = useRecepieContext();

  return (
    <>
      {favourites.length > 0 ? (
        <div>
          <h1>MY FAVOURITES</h1>
          <div className={styles.homeContainer}>
            {favourites.map((recepie) => (
              <RecepieCard recepie={recepie} key={recepie.idMeal} />
            ))}
          </div>
        </div>
      ) : (
        <p>No Favourites Yet.. Start adding favourites..</p>
      )}
    </>
  );
}

export default Favourites;

import RecepieCard from '../components/RecepieCard';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import { searchRecepiesByCategory } from '../services/api';

function Home() {
  const [inputValue, setInputValue] = useState('Seafood');
  const [searchQuery, setSearchQuery] = useState('Seafood');
  const [recepies, setRecepies] = useState([]);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecepieByCategory = async () => {
      try {
        setLoading(true);
        const recepieByCategory = await searchRecepiesByCategory(searchQuery);
        setRecepies(recepieByCategory);
      } catch (err) {
        setErrorMessage('Failed to load...');
      } finally {
        setLoading(false);
      }
    };

    loadRecepieByCategory();
  }, [searchQuery]);

  const onSearchSubmitForm = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const onFormChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={onSearchSubmitForm}>
          <input
            type="text"
            placeholder="search your recepies..."
            onChange={onFormChange}
            value={inputValue}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.homeContainer}>
          {recepies.map((recepie) => (
            <RecepieCard recepie={recepie} key={recepie.idMeal} />
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;

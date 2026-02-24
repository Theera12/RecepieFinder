import RecepieCard from '../components/RecepieCard';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import { searchRecepiesByCategory, loadCategories } from '../services/api';

function Home() {
  const [inputValue, setInputValue] = useState('Seafood');
  const [searchQuery, setSearchQuery] = useState('Seafood');
  const [recepies, setRecepies] = useState([]);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // load the category suggestion
  useEffect(() => {
    const loadCategoryList = async () => {
      try {
        setLoading(true);

        const categoriesData = await loadCategories();
        setCategories(categoriesData);
      } catch (err) {
        setErrorMessage('Failed to load...');
      } finally {
        setLoading(false);
      }
    };

    loadCategoryList();
  }, []);

  //filter based on search query
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
  //function to handle form submit
  const onSearchSubmitForm = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };
  //function to handle input value
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
      ) : !recepies ? (
        <h1>
          'No Recepies Found...! <br />
          Please search New Recepie..'
        </h1>
      ) : (
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={(e) => {
                setSearchQuery(e.target.innerText);
              }}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : !recepies ? (
        <h1>
          'No Recepies Found...! <br />
          Please search New Recepie..'
        </h1>
      ) : (
        <div className={styles.homeContainer}>
          {recepies.map((recepie) => (
            <RecepieCard recepie={recepie} key={recepie.idMeal} />
          ))}
        </div>
      )}
      {error && (
        <div>
          <p>{error}:Failed To Fetch Recepies..</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default Home;

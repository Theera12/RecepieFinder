import RecepieCard from '../components/RecepieCard';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import {
  searchRecepiesByCategory,
  loadCategories,
  loadMealById,
} from '../services/api';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('Cake');
  const [recepies, setRecepies] = useState([]);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // load the category suggestion
  useEffect(() => {
    const loadCategoryList = async () => {
      try {
        setCategoryLoading(true);

        const categoriesData = await loadCategories();
        setCategories(categoriesData);
      } catch (err) {
        setErrorMessage('Failed to load...');
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategoryList();
  }, []);

  //filter based on search query
  useEffect(() => {
    const loadRecepieByCategory = async () => {
      try {
        setLoading(true);
        const recepieByCategory = await searchRecepiesByCategory(
          searchQuery,
          categories
        );
        setRecepies(recepieByCategory);
      } catch (err) {
        setErrorMessage('Failed to load...');
      } finally {
        setLoading(false);
      }
    };

    loadRecepieByCategory();
  }, [searchQuery, categories]);
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
            placeholder="Search For recepie..."
            onChange={onFormChange}
            value={inputValue}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {categoryLoading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <h6>Failed to Load Suggestions..</h6>
      ) : (
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={(e) => {
                setSearchQuery(category.strCategory);
              }}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : recepies.length === 0 ? (
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

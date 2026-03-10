import RecipeCard from '../features/RecipeCard';
import styles from './Home.module.css';
import { useState, useEffect, useRef } from 'react';
import { searchRecipesByCategory, loadCategories } from '../services/api';
import burgerLoader from '../assets/burger.gif';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('Cake');
  const [recipes, setRecipes] = useState([]);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;
  const inputRef = useRef(null);

  // Pagination Calcultion
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

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
    const loadRecipeByCategory = async () => {
      try {
        setLoading(true);
        const recipeByCategory = await searchRecipesByCategory(
          searchQuery,
          categories
        );
        setRecipes(recipeByCategory);
      } catch (err) {
        setErrorMessage('Failed to load...');
      } finally {
        setLoading(false);
      }
    };

    loadRecipeByCategory();
  }, [searchQuery]);

  //function to handle form submit
  const onSearchSubmitForm = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(1);
  };

  //function to handle input value
  const onFormChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    inputRef.current.focus();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={onSearchSubmitForm}>
          <input
            type="text"
            placeholder="Please search a new recipe.."
            onChange={onFormChange}
            value={inputValue}
            ref={inputRef}
          />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      {categoryLoading ? (
        <img
          src={burgerLoader}
          className={styles.errorText}
          alt="Animated description"
        />
      ) : categories.length === 0 ? (
        <h6 className={styles.errorText}>Failed to Load Suggestions..</h6>
      ) : (
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={(e) => {
                setSearchQuery(category.strCategory);
                setInputValue(category.strCategory);
                setCurrentPage(1);
              }}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}
      {loading ? (
        <img
          src={burgerLoader}
          className={styles.errorText}
          alt="Animated description"
        />
      ) : recipes.length === 0 ? (
        <h2 className={styles.errorText}>
          'No Recipes Found...! <br />
          Please search New Recipie..'
        </h2>
      ) : (
        <div className={styles.homeContainer}>
          {currentRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.idMeal} />
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {recipes.length > 0 && (
        <nav>
          <ul className={styles.pagination}>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={currentPage === number ? styles.active : ''}
              >
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {/*Error Handling */}
      {error && (
        <div className={styles.errorText}>
          <p>{error}</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default Home;

import RecipeCard from '../features/RecipeCard';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import { searchRecipesByCategory, loadCategories } from '../services/api';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('Cake');
  const [recipes, setRecipes] = useState([]);
  const [error, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8);

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
                setCurrentPage(1);
              }}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <h2>
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
      <nav>
        <ul className={styles.pagination}>
          {pageNumbers.map((number) => (
            <li key={number} className={currentPage === number ? 'active' : ''}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>
      </nav>
      {/*Error Handling */}
      {error && (
        <div>
          <p>{error}:Failed To Fetch Recipes..</p>
          <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default Home;

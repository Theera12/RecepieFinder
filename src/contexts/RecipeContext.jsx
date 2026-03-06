import { createContext, useContext, useEffect, useState } from 'react';

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  //fetches favourites from local storage or creates null
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem('favourites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });

  //update local storage with favourite recipe
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  //function add to favourites
  const addToFavourites = (recipe) => {
    setFavourites((prev) => [...prev, recipe]);
  };

  //function to remove from favourites
  const removeFavourites = (recipeId) => {
    setFavourites((prev) =>
      prev.filter((recipe) => recipe.idMeal !== recipeId)
    );
  };

  //function to check if favourite or not
  const isFavourite = (recipeId) => {
    return favourites.some((recipe) => recipe.idMeal === recipeId);
  };

  const value = { favourites, addToFavourites, removeFavourites, isFavourite };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from 'react';

const RecepieContext = createContext();

export const useRecepieContext = () => useContext(RecepieContext);

export const RecepieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favourites');
    if (storedFavs) setFavourites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (recepie) => {
    setFavourites((prev) => [...prev, recepie]);
  };

  const removeFavourites = (recepieId) => {
    setFavourites((prev) => prev.filter((recepie) => recepie.id !== recepieId));
  };
  const isFavourite = (recepieId) => {
    return favourites.some((recepie) => recepie.id === recepieId);
  };

  const value = { favourites, addToFavourites, removeFavourites, isFavourite };

  return (
    <RecepieContext.Provider value={value}>{children}</RecepieContext.Provider>
  );
};

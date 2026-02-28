import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

const RecepieContext = createContext();

export const useRecepieContext = () => useContext(RecepieContext);

export const RecepieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('favourites');
      if (storedFavs) setFavourites(JSON.parse(storedFavs));
    } catch (err) {
      console.error('Failed to load favourites from localStorage', err);
    }
  }, []);

  // Save to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add favourite
  const addToFavourites = useCallback((recepie) => {
    setFavourites((prev) => {
      if (prev.some((r) => r.idMeal === recepie.idMeal)) return prev;
      return [...prev, recepie];
    });
  }, []);

  // Remove favourite
  const removeFavourites = useCallback((recepieId) => {
    setFavourites((prev) => prev.filter((r) => r.idMeal !== recepieId));
  }, []);

  // Check if favourite
  const isFavourite = useCallback(
    (recepieId) => favourites.some((r) => r.idMeal === recepieId),
    [favourites]
  );

  return (
    <RecepieContext.Provider
      value={{ favourites, addToFavourites, removeFavourites, isFavourite }}
    >
      {children}
    </RecepieContext.Provider>
  );
};

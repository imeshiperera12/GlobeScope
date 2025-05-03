import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (country) => {
    const exists = favorites.find((item) => item.cca3 === country.cca3);
    if (exists) {
      setFavorites(favorites.filter((item) => item.cca3 !== country.cca3));
    } else {
      setFavorites([...favorites, country]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);

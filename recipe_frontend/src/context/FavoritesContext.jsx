/* eslint-disable react/prop-types */
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const FavoritesContext = createContext(null);

// PUBLIC_INTERFACE
export function FavoritesProvider({ children }) {
  /** Provides favorites state and actions to the component tree. */
  const [favorites, setFavorites] = useState(() => loadFromStorage("favorites", []));

  useEffect(() => {
    saveToStorage("favorites", favorites);
  }, [favorites]);

  const ids = useMemo(() => new Set(favorites.map((r) => r.id)), [favorites]);

  // PUBLIC_INTERFACE
  const addFavorite = (recipe) => {
    /** Add a recipe to favorites if not already present. */
    setFavorites((prev) => (ids.has(recipe.id) ? prev : [...prev, recipe]));
  };

  // PUBLIC_INTERFACE
  const removeFavorite = (id) => {
    /** Remove a recipe from favorites by id. */
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds: ids,
      addFavorite,
      removeFavorite
    }),
    [favorites, ids]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useFavorites() {
  /** Hook to access favorites context. */
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

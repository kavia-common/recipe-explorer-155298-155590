import React from "react";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onOpen }) {
  /** Displays a recipe in a grid card with quick actions. */
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();
  const isFav = favoriteIds.has(recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFav) removeFavorite(recipe.id);
    else addFavorite(recipe);
  };

  return (
    <div className="recipe-card" onClick={() => onOpen(recipe)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(recipe)}
      aria-label={`Open details for ${recipe.title}`}>
      <div className="recipe-thumb">
        <img src={recipe.image} alt={recipe.title} />
        <button
          className={`fav-toggle ${isFav ? "active" : ""}`}
          aria-pressed={isFav}
          onClick={toggleFavorite}
          title={isFav ? "Remove from favorites" : "Save to favorites"}
        >
          ⭐
        </button>
      </div>
      <div className="recipe-body">
        <h4 className="recipe-title">{recipe.title}</h4>
        <p className="recipe-desc">{recipe.description}</p>
        <div className="meta">
          <span className="badge">{recipe.cuisine}</span>
          <span className="badge secondary">{recipe.difficulty}</span>
          <span className="badge accent">⏱ {recipe.time}m</span>
        </div>
      </div>
    </div>
  );
}

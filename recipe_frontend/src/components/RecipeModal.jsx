import React, { useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function RecipeModal({ recipe, onClose }) {
  /** Modal showing detailed ingredients and instructions for a recipe. */
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();
  const isFav = recipe && favoriteIds.has(recipe.id);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!recipe) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${recipe.title} details`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{recipe.title}</h3>
          <div className="modal-actions">
            <button
              className={`btn ${isFav ? "btn-primary" : "btn-outline"}`}
              onClick={() => (isFav ? removeFavorite(recipe.id) : addFavorite(recipe))}
            >
              {isFav ? "⭐ Favorited" : "☆ Add Favorite"}
            </button>
            <button className="icon-btn" onClick={onClose} aria-label="Close details">✖</button>
          </div>
        </div>
        <div className="modal-body">
          <img className="modal-image" src={recipe.image} alt={recipe.title} />
          <p className="lead">{recipe.description}</p>
          <div className="modal-meta">
            <span className="badge">{recipe.cuisine}</span>
            <span className="badge secondary">{recipe.difficulty}</span>
            <span className="badge accent">⏱ {recipe.time} min</span>
            <span className="badge">🍽 {recipe.servings} servings</span>
          </div>

          <div className="modal-columns">
            <div className="modal-section">
              <h4>Ingredients</h4>
              <ul className="list">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="modal-section">
              <h4>Instructions</h4>
              <ol className="list ordered">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

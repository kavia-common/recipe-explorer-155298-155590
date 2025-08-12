import React from "react";
import { useFavorites } from "../context/FavoritesContext";

// PUBLIC_INTERFACE
export default function Navbar({ query, onQueryChange, showFavoritesOnly, onToggleFavorites }) {
  /** Top navigation bar with brand, search input, and favorites toggle. */
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <div className="nav-brand">🍳 Recipe Explorer</div>
      <div className="nav-search">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search recipes, ingredients, tags..."
          aria-label="Search recipes"
        />
      </div>
      <div className="nav-actions">
        <button
          className={`btn ${showFavoritesOnly ? "btn-primary" : "btn-outline"}`}
          onClick={onToggleFavorites}
          aria-pressed={showFavoritesOnly}
        >
          ⭐ Favorites ({favorites.length})
        </button>
      </div>
    </nav>
  );
}

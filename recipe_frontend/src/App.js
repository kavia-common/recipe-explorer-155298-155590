import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import SidebarFilters from "./components/SidebarFilters";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import { getRecipes } from "./services/api";

// PUBLIC_INTERFACE
export default function App() {
  /** Root application: fetches recipes, manages search/filters, and renders layout. */
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ cuisine: "", difficulty: "", maxTime: 60 });
  const [selected, setSelected] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch recipes
  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const data = await getRecipes();
      if (active) {
        setRecipes(data);
        // determine maxTime default based on data
        const max = data.length ? Math.max(...data.map((r) => r.time || 0)) : 60;
        setFilters((f) => ({ ...f, maxTime: max || 60 }));
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Filter and search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byText = (r) => {
      if (!q) return true;
      const hay = [
        r.title,
        r.description,
        ...(r.tags || []),
        ...(r.ingredients || [])
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    };

    return recipes
      .filter(byText)
      .filter((r) => (filters.cuisine ? r.cuisine === filters.cuisine : true))
      .filter((r) => (filters.difficulty ? r.difficulty === filters.difficulty : true))
      .filter((r) => (filters.maxTime ? (r.time || 0) <= filters.maxTime : true));
  }, [recipes, query, filters]);

  // PUBLIC_INTERFACE
  const handleOpen = (recipe) => {
    /** Open modal with recipe details. */
    setSelected(recipe);
  };

  // PUBLIC_INTERFACE
  const handleClose = () => {
    /** Close recipe details modal. */
    setSelected(null);
  };

  return (
    <FavoritesProvider>
      <div className="layout">
        <Navbar
          query={query}
          onQueryChange={setQuery}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly((v) => !v)}
        />
        <div className="content">
          <SidebarFilters recipes={recipes} filters={filters} onChange={setFilters} />
          <main className="main">
            {loading ? (
              <div className="loader">Loading recipes…</div>
            ) : (
              <RecipeContent
                recipes={filtered}
                onOpen={handleOpen}
                showFavoritesOnly={showFavoritesOnly}
              />
            )}
          </main>
        </div>
        <RecipeModal recipe={selected} onClose={handleClose} />
        <footer className="footer">
          <span>Made with ❤️ using React</span>
        </footer>
      </div>
    </FavoritesProvider>
  );
}



// PUBLIC_INTERFACE
function RecipeContent({ recipes, onOpen, showFavoritesOnly }) {
  /** Wrapper switching between all recipes and user's favorites. */
  const { favorites } = useFavorites();
  const list = showFavoritesOnly ? favorites : recipes;
  return (
    <>
      {showFavoritesOnly ? (
        <div className="section-header">
          <h2>⭐ My Favorites</h2>
          <p className="muted">Your saved recipes appear here.</p>
        </div>
      ) : (
        <div className="section-header">
          <h2>🥗 Browse Recipes</h2>
          <p className="muted">Discover new dishes and save your favorites.</p>
        </div>
      )}
      <RecipeList recipes={list} onOpen={onOpen} />
    </>
  );
}

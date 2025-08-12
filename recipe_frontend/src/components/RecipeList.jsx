import React from "react";
import RecipeCard from "./RecipeCard";

// PUBLIC_INTERFACE
export default function RecipeList({ recipes, onOpen }) {
  /** Grid layout listing of recipe cards. */
  if (!recipes.length) {
    return <div className="empty">No recipes match your search or filters.</div>;
    }
  return (
    <div className="recipe-grid">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={onOpen} />
      ))}
    </div>
  );
}

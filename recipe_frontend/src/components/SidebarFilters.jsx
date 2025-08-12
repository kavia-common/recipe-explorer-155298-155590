import React, { useMemo } from "react";

// PUBLIC_INTERFACE
export default function SidebarFilters({ recipes, filters, onChange }) {
  /** Sidebar for selecting filters: cuisine, difficulty, and max time. */
  const cuisines = useMemo(
    () => Array.from(new Set(recipes.map((r) => r.cuisine))).sort(),
    [recipes]
  );
  const difficulties = useMemo(
    () => Array.from(new Set(recipes.map((r) => r.difficulty))).sort(),
    [recipes]
  );
  const maxTimeAvailable = useMemo(
    () => (recipes.length ? Math.max(...recipes.map((r) => r.time || 0)) : 60),
    [recipes]
  );

  const handleSelect = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleRange = (e) => {
    onChange({ ...filters, maxTime: Number(e.target.value) });
  };

  const handleReset = () => {
    onChange({ cuisine: "", difficulty: "", maxTime: maxTimeAvailable });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Filters</h3>
        <button className="btn btn-outline btn-sm" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="cuisine">Cuisine</label>
        <select id="cuisine" name="cuisine" value={filters.cuisine} onChange={handleSelect}>
          <option value="">All</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={filters.difficulty}
          onChange={handleSelect}
        >
          <option value="">All</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="maxTime">
          Max Time: <strong>{filters.maxTime} min</strong>
        </label>
        <input
          id="maxTime"
          type="range"
          min="5"
          max={maxTimeAvailable}
          step="5"
          value={filters.maxTime}
          onChange={handleRange}
        />
        <div className="range-scale">
          <span>5</span>
          <span>{maxTimeAvailable} min</span>
        </div>
      </div>
    </aside>
  );
}

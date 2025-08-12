const NAMESPACE = "recipe_explorer";

/**
 * Safely parse JSON from localStorage.
 * @param {string} key
 * @param {any} fallback
 * @returns {any}
 */
export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(`${NAMESPACE}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Save JSON to localStorage.
 * @param {string} key
 * @param {any} value
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
  } catch {
    // ignore
  }
}

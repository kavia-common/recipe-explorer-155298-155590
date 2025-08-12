const API_BASE = process.env.REACT_APP_API_BASE || "";

/**
 * Fetch JSON with timeout and error handling.
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<any>}
 */
async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// PUBLIC_INTERFACE
export async function getRecipes() {
  /** Retrieve recipes from backend API if available, otherwise fall back to local sample data. */
  if (API_BASE) {
    try {
      const data = await fetchJson(`${API_BASE.replace(/\/$/, "")}/recipes`);
      if (Array.isArray(data)) {
        return data;
      }
    } catch {
      // fall through to local
    }
  }
  const { sampleRecipes } = await import("../data/sampleRecipes");
  return sampleRecipes;
}

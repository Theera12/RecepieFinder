const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const loadCategories = async () => {
  let url;
  url = `${BASE_URL}/list.php?c=list`;
  const resp = await fetch(url);
  const data = await resp.json();

  return data.meals;
};
export const loadMealById = async (id) => {
  let url;
  url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const resp = await fetch(url);
  const data = await resp.json();

  return data.meals;
};
export const searchRecepiesByCategory = async (query, categorylist) => {
  let url;

  const formattedQuery =
    query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();

  if (categorylist.includes(formattedQuery)) {
    // Search by category
    url = `${BASE_URL}/filter.php?c=${encodeURIComponent(formattedQuery)}`;
  } else {
    //fallback search by meal name
    url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
  }

  const resp = await fetch(url);
  const data = await resp.json();

  return data.meals;
};

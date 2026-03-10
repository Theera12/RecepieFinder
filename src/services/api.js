const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

//fetching recipe categories list
export const loadCategories = async () => {
  let url;
  url = `${BASE_URL}/list.php?c=list`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.meals || [];
};

//load a single meal id for meal details component
export const loadMealById = async (id) => {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.meals[0] || null;
};

//fetching based on search query
export const searchRecipesByCategory = async (query, categorylist) => {
  let url;
  const formattedQuery = query.toLowerCase();
  const categoryNames = categorylist.map((cat) =>
    cat.strCategory.toLowerCase()
  );

  if (categoryNames.includes(formattedQuery)) {
    url = `${BASE_URL}/filter.php?c=${encodeURIComponent(formattedQuery)}`;
  } else if (query.trim().length >= 3) {
    url = `${BASE_URL}/search.php?s=${encodeURIComponent(formattedQuery)}`;
  } else {
    return [];
  }

  const resp = await fetch(url);
  const data = await resp.json();

  return data.meals || [];
};

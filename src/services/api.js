const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php';

export const searchRecepiesByCategory = async (query) => {
  const resp = await fetch(`${BASE_URL}?c=${encodeURIComponent(query)}`);
  const data = await resp.json();

  return data.meals;
};

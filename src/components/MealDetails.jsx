import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MealDetails() {
  const { MealId } = useParams();

  const [mealDetails, setMealDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const MealData = async () => {
      try {
        setDetailsLoading(true);
        const mealDataById = await loadMealById(MealId);
        setMealDetails(mealDataById);
      } catch (err) {
        setError('Failed to load...');
      } finally {
        setDetailsLoading(false);
      }
    };

    MealData();
  }, [MealId]);

  if (detailsLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {mealDetails && (
        <div>
          <h2>{mealDetails.strMeal}</h2>
          <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
          <h5>{mealDetails.strMealThumb}</h5>
          <p>{mealDetails.strInstructions}</p>
          <video>
            <source src={mealDetails.strYoutube} type="video/mp4"></source>
            <source src={mealDetails.strYoutube} type="video/webm"></source>
            <source src={mealDetails.strYoutube} type="video/ogg"></source>
          </video>
        </div>
      )}
    </>
  );
}

export default MealDetails;

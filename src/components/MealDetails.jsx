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
      <h2>Meal Details</h2>
      {mealDetails && <p>{mealDetails.strInstructions}</p>}
    </>
  );
}

export default MealDetails;

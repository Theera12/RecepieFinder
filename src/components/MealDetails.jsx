import { loadMealById } from '../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MealDetails() {
  let { MealId } = useParams();

  const [mealDetails, setMealDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);

  useEffect(() => {
    const MealData = async () => {
      try {
        setDetailsLoading(true);

        const mealDataById = await loadMealById(MealId);
        setMealDetails(mealDataById);
        console.log(mealDetails[0].strMeal);
      } catch (err) {
        <p> 'Failed to load...'</p>;
      } finally {
        setDetailsLoading(false);
      }
    };

    MealData();
  }, [MealId]);
  useEffect(() => {
    console.log({ mealDetails });
  }, [MealId]);

  return (
    <>
      <p>hi</p>
    </>
  );
}
export default MealDetails;

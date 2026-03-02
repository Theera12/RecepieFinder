import { useState, useEffect } from 'react';
import RecipeForm from '../features/NewRecipeForm';
import RecipeList from '../features/RecipeList';

function MyRecipe() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes'));
    if (savedRecipes) {
      setMyRecipes(savedRecipes);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('myRecipes', JSON.stringify(myRSecipes));
  }, [myRecipes]);

  // Add or Update Recipe
  const handleSaveRecipe = (myRecipe) => {
    if (editRecipe) {
      const updatedRecipes = myRecipes.map((item) =>
        item.id === editRecipe.id ? myRecipe : item
      );
      setMyRecipes(updatedRecipes);
      setEditRecipe(null);
    } else {
      setMyRecipes([...myRecipes, { ...myRecipe, id: Date.now() }]);
    }
  };

  // Delete Recipe
  const handleDelete = (id) => {
    const filtered = myRecipes.filter((myRecipe) => myRecipe.id !== id);
    setMyRecipes(filtered);
  };

  // Edit Recipe
  const handleEdit = (myRecipe) => {
    setEditRecipe(myRecipe);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Recipe Page</h2>

      <RecipeForm onSave={handleSaveRecipe} editRecipe={editRecipe} />

      <RecipeList
        myRecipes={myRecipes}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default MyRecipe;

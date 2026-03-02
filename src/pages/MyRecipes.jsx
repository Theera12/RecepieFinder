import { useState, useEffect } from 'react';
import RecipeForm from '../features/NewRecipeForm';
import RecipeList from '../features/RecipeList';

function MyRecipe() {
  const [editRecipe, setEditRecipe] = useState(null);

  const [myRecipes, setMyRecipes] = useState(() => {
    const saved = localStorage.getItem('myRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
  }, [myRecipes]);

  // Add or Update Recipe
  const handleSaveRecipe = (myRecipe) => {
    if (editRecipe) {
      const updatedRecipes = myRecipes.map((item) =>
        item.id === editRecipe.id ? { ...myRecipe, id: editRecipe.id } : item
      );
      setMyRecipes(updatedRecipes);
      setEditRecipe(null);
    } else {
      setMyRecipes((prev) => [...prev, { ...myRecipe, id: Date.now() }]);
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
    <div>
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

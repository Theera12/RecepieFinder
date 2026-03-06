import { useState, useEffect } from 'react';
import RecipeForm from '../features/NewRecipeForm';
import RecipeList from '../features/RecipeList';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  justify-content: center;
  font-family: 'Inconsolata', monospace;
  padding-left: 4rem;
  button {
    padding: 10px 15px;
    background-color: rgb(209, 68, 68);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: rgb(145, 135, 135);
    box-shadow: 0 1px 2px rgb(145, 135, 135);
  }
  input,
  textarea {
    border: none;
    border-bottom: 2px solid #ccc;
    margin: 15px;
    box-shadow: 0px 8px 15px rgb(133, 128, 128);
    padding: 5px;
    border-radius: 20px;
    width: 200px;
    letter-spacing: 1px;
  }
  input:focus,
  textare:focus {
    outline: none;
    border-bottom: 2px solid #787070;
  }
  textarea {
    height: 100px;
  }
`;
const AddButton = styled.button`
  width: 250px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgb(224, 214, 214);
  font-size: 50px;
  padding: 10px;
  margin-left: 15px;
  transform: scale(1.05);
`;

function MyRecipe() {
  const [editRecipe, setEditRecipe] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  //lazy loading to avoid two renders due to strictmode
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
    setIsAdding(false);
  };

  // Delete Recipe
  const handleDelete = (id) => {
    const filtered = myRecipes.filter((myRecipe) => myRecipe.id !== id);
    setMyRecipes(filtered);
  };

  // Edit Recipe
  const handleEdit = (myRecipe) => {
    setEditRecipe(myRecipe);
    setIsAdding(true);
  };

  //Add New Recipe
  const onAddClick = () => {
    setIsAdding(true);
  };
  return (
    <Container>
      <h1>MY RECIPES</h1>

      {isAdding ? (
        <RecipeForm onSave={handleSaveRecipe} editRecipe={editRecipe} />
      ) : (
        <AddButton type="button" onClick={onAddClick}>
          +
        </AddButton>
      )}

      <RecipeList
        myRecipes={myRecipes}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Container>
  );
}

export default MyRecipe;

import RecipeItem from './RecipeItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px;
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
  p {
    text-align: center;
    margin-top: 40px;
    opacity: 0.8;
  }
`;
function RecipeList({ myRecipes, onDelete, onEdit }) {
  return myRecipes.length === 0 ? (
    <p>No Recipes Yet... Add New...</p>
  ) : (
    <Wrapper>
      {myRecipes.map((myRecipe) => (
        <RecipeItem
          key={myRecipe.id}
          myRecipe={myRecipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Wrapper>
  );
}

export default RecipeList;

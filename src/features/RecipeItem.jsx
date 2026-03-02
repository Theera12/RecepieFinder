import styled from 'styled-components';

const Card = styled.div`
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgb(224, 214, 214);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  h2 {
    align-self: center;
  }
`;
function RecipeItem({ myRecipe, onDelete, onEdit }) {
  return (
    <Card>
      <h2>{myRecipe.name}</h2>
      <p>{myRecipe.instruction}</p>
      <button onClick={() => onEdit(myRecipe)}>Edit</button>
      <button onClick={() => onDelete(myRecipe.id)}>Delete</button>
    </Card>
  );
}
export default RecipeItem;

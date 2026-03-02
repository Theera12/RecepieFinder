import styled from 'styled-components';
const Card = styled.div`
  width: 250px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgb(224, 214, 214);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;

  h2 {
    align-self: center;
    margin: 0;
  }

  p {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  button {
    cursor: pointer;
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

function RecipeItem({ myRecipe, onDelete, onEdit }) {
  return (
    <div>
      <h3>{myRecipe.name}</h3>
      <p>{myRecipe.instruction}</p>
      <button onClick={() => onEdit(myRecipe)}>Edit</button>
      <button onClick={() => onDelete(myRecipe.id)}>Delete</button>
    </div>
  );
}
export default RecipeItem;

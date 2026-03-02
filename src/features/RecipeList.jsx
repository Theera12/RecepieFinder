import RecipeItem from './RecipeItem';
function RecipeList(myRecipes, onDelete, onEdit) {
  if (myRecipes.length === 0) {
    return <p>No Receipes Yet...Add New...</p>;
  }
  return (
    <div>
      {myRecipes.map((myRecipe) => {
        <RecipeItem
          key={myRecipe.id}
          myRecipe={myRecipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />;
      })}
    </div>
  );
}
export default RecipeList;

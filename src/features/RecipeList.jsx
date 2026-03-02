import RecipeItem from './RecipeItem';

function RecipeList({ myRecipes, onDelete, onEdit }) {
  return myRecipes.length === 0 ? (
    <p>No Recipes Yet... Add New...</p>
  ) : (
    <div>
      {myRecipes.map((myRecipe) => (
        <RecipeItem
          key={myRecipe.id}
          myRecipe={myRecipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeList;

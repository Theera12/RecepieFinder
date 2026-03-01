import useState from 'react';

function NewRecipeForm() {
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeInstruction, setNewRecipeInstruction] = useState('');

  const handleNewTitle = (e) => {
    setNewRecipeTitle(e.target.value);
  };

  const handleNewInstruction = (e) => {
    setNewRecipeInstruction(e.target.value);
  };

  const handleNewRecipeForm = (e) => {
    e.preventDefault();
    const newRecipe = { newRecipeTitle, newRecipeInstruction };
  };

  return (
    <div>
      <form type="submit" onChange={handleNewRecipeForm}>
        <input
          type="text"
          placeholder="Enter RecipeName.."
          onChange={handleNewTitle}
          value={newRecipeTitle}
        />
        <input
          type="textrea"
          placeholder="Enter Instructions..."
          onChange={handleNewInstruction}
          value={newRecipeInstruction}
        />
        <button>Save</button>
      </form>
    </div>
  );
}
export default NewRecipeForm;

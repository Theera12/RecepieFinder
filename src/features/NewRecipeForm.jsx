import { useState, useEffect } from 'react';

function NewRecipeForm({ editRecipe, onSave }) {
  const [name, setName] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    if (editRecipe) {
      setName(editRecipe.name);
      setInstruction(editRecipe.instruction);
    }
  }, [editRecipe]);

  const handleTitle = (e) => {
    setName(e.target.value);
  };

  const handleInstruction = (e) => {
    setInstruction(e.target.value);
  };

  const handleRecipeForm = (e) => {
    e.preventDefault();
    onSave({
      id: editRecipe?.id,
      name,
      instruction,
    });

    setName('');
    setInstruction('');
  };

  return (
    <div>
      <form type="submit" onSubmit={handleRecipeForm}>
        <input
          type="text"
          placeholder="Enter RecipeName.."
          onChange={handleTitle}
          value={name}
        />
        <br />
        <br />
        <input
          type="textrea"
          placeholder="Enter Instructions..."
          onChange={handleInstruction}
          value={instruction}
        />
        <br />
        <br />
        <button>Add Recipe</button>
      </form>
    </div>
  );
}
export default NewRecipeForm;

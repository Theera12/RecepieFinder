import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.div`
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
  button {
    width: 250px;
  }
`;
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
    <Form>
      <form type="submit" onSubmit={handleRecipeForm}>
        <input
          type="text"
          placeholder="Enter RecipeName.."
          onChange={handleTitle}
          value={name}
        />
        <br />
        <br />
        <textarea
          type="text"
          placeholder="Enter Instructions..."
          onChange={handleInstruction}
          value={instruction}
        />
        <br />
        <br />
        <button>Add Recipe</button>
      </form>
    </Form>
  );
}
export default NewRecipeForm;

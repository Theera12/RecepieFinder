import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const ShoppingList = styled.div`
  width: 350px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgb(224, 214, 214);
  display: flex;
  flex-direction: column;
  padding: 10px;

  align-self: center;
  ul {
    list-style-type: none;
    padding: 10px;
  }
  button {
    padding: 5px 10px;
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
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;
const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
function MyShopping() {
  const [shoppingList, setShoppingList] = useState([]);

  //gets the stored value from local storage
  useEffect(() => {
    const savedList = localStorage.getItem('list');
    if (savedList) {
      setShoppingList(JSON.parse(savedList));
    }
  }, []);

  //delete the list
  const handleDeleteList = (id) => {
    const updatedList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
  };

  return (
    <Outer>
      <h1>My SHOPPING LIST</h1>
      <ShoppingList>
        {shoppingList.length === 0 ? (
          <p>No items added</p>
        ) : (
          <ul>
            {shoppingList.map((item) => (
              <li key={item.id}>
                {item.ingredient} - {item.measure}
                <button onClick={() => handleDeleteList(item.id)}>
                  {' '}
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}
      </ShoppingList>
    </Outer>
  );
}

export default MyShopping;

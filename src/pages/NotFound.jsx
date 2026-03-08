import { NavLink } from 'react-router';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px;
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
`;
function NotFound() {
  return (
    <Box>
      <h2>OOPS!!! Page Not Found...</h2>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
    </Box>
  );
}
export default NotFound;

import styled from 'styled-components';

const Foot = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 15px;
  a {
    font-size: 10px;
    color: black;
  }
`;
function Footer() {
  return (
    <Foot>
      <footer>
        <a href="https://www.flaticon.com/free-icons" title=" cart icons">
          Smart icons created by Freepik - Flaticon
        </a>
      </footer>
    </Foot>
  );
}
export default Footer;

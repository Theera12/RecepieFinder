import { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import bookIcon from '../assets/book.png';

function Navbar() {
  const [navbarIcon, setNavbarIcon] = useState(false);

  const handleIcon = () => {
    setNavbarIcon((prev) => !prev);
  };
  return (
    <div className={styles.navbarContainer}>
      <h1>
        C<span>OO</span>KB<span>OO</span>K
      </h1>
      <NavLink to="/">
        <img src={bookIcon} alt="book icon" className={styles.bookImage}></img>
      </NavLink>
      <button onClick={handleIcon} className={styles.hamburger}>
        <GiHamburgerMenu />
      </button>

      <div
        className={`${styles.navlinksContainer} ${
          navbarIcon ? styles.showMenu : ''
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/myrecipes"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          My Recipes
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Favourites
        </NavLink>
        <NavLink
          to="/myshopping"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          My Shopping
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;

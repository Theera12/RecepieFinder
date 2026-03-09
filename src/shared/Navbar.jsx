import { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import bookIcon from '../assets/book.png';
import trolley from '../assets/trolley.png';
import heart from '../assets/smile.png';
import home from '../assets/home.png';
import chef from '../assets/chef.png';

function Navbar() {
  const [navbarIcon, setNavbarIcon] = useState(false);

  const handleIcon = () => {
    setNavbarIcon((prev) => !prev);
  };
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.headIcon}>
        <NavLink to="/">
          <img
            src={bookIcon}
            alt="book icon"
            className={styles.bookImage}
          ></img>
        </NavLink>
        <h1>
          C<span>OO</span>KB<span>OO</span>K
        </h1>
      </div>
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
          <img src={home} alt="home icon" className={styles.trolleyIcon}></img>
          <span className={styles.iconNav}>Home</span>
        </NavLink>
        <NavLink
          to="/myrecipes"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <img src={chef} alt="my recipe" className={styles.trolleyIcon} />
          <span className={styles.iconNav}>Recipes</span>
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <img src={heart} alt="favourite" className={styles.trolleyIcon} />
          <span className={styles.iconNav}>Favourites</span>
        </NavLink>
        <NavLink
          to="/myshopping"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          <img
            src={trolley}
            alt="shopping list"
            className={styles.trolleyIcon}
          />
          <span className={styles.iconNav}>Shopping</span>
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;

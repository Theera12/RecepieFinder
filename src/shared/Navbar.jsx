import styles from './Navbar.module.css';
import { NavLink } from 'react-router';
function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <h1>
        C<span>OO</span>KB<span>OO</span>K
      </h1>
      <div className={styles.navlinksContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          About
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Favourites
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;

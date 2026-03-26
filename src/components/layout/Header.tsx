import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to={ROUTES.home} className={styles.logo}>
        <span className={styles.logoIcon}>&#x1F680;</span>
        <span>Launch Pad</span>
      </Link>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES.home}
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Next Launch
        </NavLink>
        <NavLink
          to={ROUTES.launches}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          All Launches
        </NavLink>
      </nav>
    </header>
  );
}

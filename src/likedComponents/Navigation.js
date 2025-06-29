import { NavLink } from "react-router-dom";
import styles from '../likedComponents/Navigation.module.css'

function Navigation() {
    return (
        <nav className={styles.navigation}>
            <ul className="links">
                <li>
                    <NavLink to="." end className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>Favorites</NavLink>
                </li>

                <li>
                    <NavLink to="library" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>Library</NavLink>
                </li>

                <li>
                    <NavLink to="custombook" className={({isActive}) => `${styles.links} ${isActive ? styles.active : ""}`}>Add Book</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
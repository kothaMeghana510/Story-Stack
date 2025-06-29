import {  NavLink } from "react-router-dom";
import Logo from "./Logo";

function NavLinks() {
    return (
        <div>
            <nav className="nav">
                <Logo />
                <ul className="links">
                    <li>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/explore" className="nav-link">Explore</NavLink>
                    </li>

                    <li>
                        <NavLink to="/likedbooks" className="nav-link">Favorites</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavLinks;
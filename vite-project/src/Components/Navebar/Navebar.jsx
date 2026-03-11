import { NavLink } from "react-router-dom";
import "./Navebar.css";

export function Navebar() {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <div className="logo">
                    React & Vite
                </div>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/gallery" className="nav-link">
                            Gallery
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/card" className="nav-link">
                            Card
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/footer" className="nav-link">
                            Footer
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                    </li>
                </ul>

            </div>

        </nav>
    );
}
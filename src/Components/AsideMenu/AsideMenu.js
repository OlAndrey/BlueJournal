import React from "react";
import { Link } from "react-router-dom";
import "./AsideMenu.css";

const AsideMenu = (props) =>{
    return(
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/profile" className="nav-link">
                    Profile
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/users" className="nav-link">
                    Users
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/likes" className="nav-link">
                    Likes
                </Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link">
                    Posts
                </Link>
            </li>
        </ul>
    )
}

export default AsideMenu;
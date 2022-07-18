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
                <Link to="/my-posts" className="nav-link">
                    My Posts
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
        </ul>
    )
}

export default AsideMenu;
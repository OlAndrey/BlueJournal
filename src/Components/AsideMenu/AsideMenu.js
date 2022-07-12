import React from "react";
import { Link } from "react-router-dom";
import "./AsideMenu.css";

const AsideMenu = (props) =>{
    return(
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to={"/home"}  className="nav-link">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    About
                </a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    Photos
                </a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    Likes
                </a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link">
                    Posts
                </a>
            </li>
        </ul>
    )
}

export default AsideMenu;
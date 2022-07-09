import React from "react";
import { Link } from "react-router-dom";
import "./AsideMenu.css";

const AsideMenu = (props) =>{
    return(
        <ul className="aside-menu">
            <li className="aside__item">
                <Link to={"/home"}  className="aside__link">
                    Home
                </Link>
            </li>
            <li className="aside__item">
                <a href="#" className="aside__link">
                    About
                </a>
            </li>
            <li className="aside__item">
                <a href="#" className="aside__link">
                    Photos
                </a>
            </li>
            <li className="aside__item">
                <a href="#" className="aside__link">
                    Likes
                </a>
            </li>
            <li className="aside__item">
                <a href="#" className="aside__link">
                    Posts
                </a>
            </li>
        </ul>
    )
}

export default AsideMenu;
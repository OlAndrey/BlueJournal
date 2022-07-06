import React from "react";
import "./HeaderMenu.css";

const HeaderMenuItem = (props) =>{
    return(
        <li className="navmenu__item">
            <a href="#" className="navmenu__link">
                {props.name}
            </a>
        </li>
    )
}

export default HeaderMenuItem;
import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderMenu.css";

const HeaderMenuItem = (props) =>{
    return(
        <li className="navmenu__item">
            <NavLink to={"/" + props.name.toLowerCase()}  className="navmenu__link">
                {props.name}
            </NavLink>
        </li>
    )
}

export default HeaderMenuItem;
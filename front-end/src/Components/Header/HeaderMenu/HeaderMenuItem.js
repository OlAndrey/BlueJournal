import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderMenu.css";

const HeaderMenuItem = (props) =>{
    return(
        <li className="navbar-item p-2 flex-fill">
            {
                (props.name === "LogOut")?
                <div onClick={props.logOut}  className="nav-link">
                    {props.name}
                </div>
                :<NavLink to={"/" + props.name.toLowerCase()}  className="nav-link">
                    {props.name}
                </NavLink>
            }
        </li> 
    )   
}

export default HeaderMenuItem;
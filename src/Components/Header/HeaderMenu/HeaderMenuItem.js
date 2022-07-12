import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderMenu.css";

const HeaderMenuItem = (props) =>{
    return(
        <li className="nav-item p-2 flex-fill">
            {
                (props.name === "LogOut")?
                <NavLink to="/login" onClick={() => props.auth.signOut()}  className="nav-link">
                    {props.name}
                </NavLink>
                :<NavLink to={"/" + props.name.toLowerCase()}  className="nav-link">
                    {props.name}
                </NavLink>
            }
        </li> 
    )   
}

export default HeaderMenuItem;
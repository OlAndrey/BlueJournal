import React from "react";
import "./Header.css";
import HeaderMenuItem from "./HeaderMenu/HeaderMenuItem";

const Header = (props) =>{
    return (
        <header className="header">
        <div className="container">
            <div className="header__body">
                <div className="header__logo">
                    Network
                </div>
                <ul className="header__menu navmenu">
                    <HeaderMenuItem name="Page Home" />
                    <HeaderMenuItem name="Friends" />
                    <HeaderMenuItem name="Messages" />
                    <HeaderMenuItem name="Account" />
                </ul>
            </div>
        </div>
    </header>
    )
}

export default Header;
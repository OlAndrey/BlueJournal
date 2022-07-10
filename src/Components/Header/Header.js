import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../index";
import "./Header.css";
import HeaderMenuItem from "./HeaderMenu/HeaderMenuItem";

const Header = (props) =>{
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <header className="header">
        <div className="container">
            <div className="header__body">
                <div className="header__logo">
                    Network
                </div>
                {
                    user ?
                    <ul className="header__menu navmenu">
                        <HeaderMenuItem name="Home" />
                        <HeaderMenuItem name="Friends" />
                        <HeaderMenuItem name="Messages" />
                        <HeaderMenuItem name="LogOut" auth={auth} />
                    </ul>
                    :
                    <ul className="header__menu navmenu">
                        <HeaderMenuItem name="Login" />
                    </ul>    
                }
                
            </div>
        </div>
    </header>
    )
}

export default Header;
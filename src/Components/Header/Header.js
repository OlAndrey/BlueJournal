import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import HeaderMenuItem from "./HeaderMenu/HeaderMenuItem";

const Header = (props) =>{
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container d-flex justify-content-between">
                    <Link className="navbar-brand p-2 flex-grow-1" to="#">Network</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">                
                    {
                    user ?
                        <ul className="navbar-nav mr-auto d-flex ">
                            <HeaderMenuItem name="Home" />
                            <HeaderMenuItem name="Friends" />
                            <HeaderMenuItem name="Messages" />
                            <HeaderMenuItem name="LogOut" auth={auth} />
                        </ul>
                        :
                        <ul className="navbar-nav mr-auto d-flex">
                            <HeaderMenuItem name="Login" />
                        </ul>    
                    }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
import React, { useContext, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import HeaderMenuItem from "./HeaderMenu/HeaderMenuItem";

const Header = (props) =>{
    let navigate = useNavigate();
    const ref = useRef()
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const logOut = () => {
        auth.signOut().then(() =>
            navigate("/login", { replace: true }))
    }

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                <div className="container d-flex justify-content-between">
                    <Link className="navbar-brand p-2 flex-grow-1" to="#">BlueJournal</Link>
                    <button className="navbar-toggler" type="button" onClick={() => ref.current.classList.toggle("show")}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" ref={ref} id="navbarSupportedContent">                
                    {
                    user ?
                        <ul className="navbar-nav mr-auto d-flex ">
                            <HeaderMenuItem name="Home" />
                            <HeaderMenuItem name="Friends" />
                            <HeaderMenuItem name="Dialogs" />
                            <HeaderMenuItem name="LogOut" logOut={logOut} />
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
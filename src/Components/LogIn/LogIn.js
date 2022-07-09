import React from "react";
import "./LogIn.css";

const LogIn = (props) => {
    return (
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                    <div className="login__body">
                        <input type="text" name="email" placeholder="Enter, your email" /><br />
                        <input type="password" name="password" placeholder="Enter, your password" /><br />
                        <button>Log-in</button>
                        <div className="login__text"><span>Or</span></div>
                        <button><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
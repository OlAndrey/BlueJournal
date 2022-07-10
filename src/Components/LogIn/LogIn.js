import React, { useState } from "react";
import "./LogIn.css";

const LogIn = (props) => {
    const [dissable, setDissable] = useState(false);
    const [email, setEmail] = useState({isCorrect: true, value: ""});
    const [password, setPassword] = useState({isCorrect: true, value: ""});
    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const testInput = (e) => {
        let name = e.target.attributes.name.value;
        if(name === "email"){
            if(!regularEmail.test(e.target.value)){
                setDissable(true);
                setEmail({...email, isCorrect: false})
            }
            else{
                setDissable(false);
                setEmail({...email, isCorrect: true})
            }
        }
        if(name === "password"){
            if(!regularPassword.test(e.target.value)){
                setPassword({...password, isCorrect: false})
                setDissable(true);
            }
            else{
                setPassword({...password, isCorrect: true})
                setDissable(false);
            }
        }
    }

    return (
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                    <div className="login__body">
                        <input className={(!email.isCorrect || props.isError) ? "incorrect" : ""} type="text" name="email" placeholder="Enter, your email" onChange={(e) => setEmail({...email, value: e.target.value})} onBlur={testInput} /><br />
                        <input className={(!password.isCorrect || props.isError) ? "incorrect" : ""} type="password" name="password" placeholder="Enter, your password" onChange={(e) => setPassword({...password, value: e.target.value})} onBlur={testInput} /><br />
                        {
                            (props.isError)
                            ?<div className="login__error">Email or password is incorrect!!!</div>
                            :""
                        }
                        <button onClick={() => props.authWithPassword(email.value, password.value)} disabled={props.dissableBtn || dissable}>Log-in</button>
                        <div className="login__text"><span>Or</span></div>
                        <button onClick={props.authWithGoogle} disabled={props.dissableBtn}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
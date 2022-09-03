import React, { useState } from "react";

const LogIn = (props) => {
    const [dissable, setDissable] = useState(false);
    const [email, setEmail] = useState({name: "email", isCorrect: true, value: "", isClicked: false});
    const [password, setPassword] = useState({name: "password", isCorrect: true, value: "", isClicked: false});
    const inputs = [email, password]
    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const testInput = (e) => {
        let name = e.target.attributes.name.value;
        if(name === "email"){
            setEmail({...email, isClicked: true})
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
            setPassword({...password, isClicked: true})
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
                <form className="row">
                        <div className="form-group col-sm-8 m-auto">
                            <div className="row">
                                <label htmlFor="email" className="col-sm-2 col-form-label text-left">Email:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={!email.isCorrect ? "incorrect" : ""} 
                                        type="email" 
                                        id="email"
                                        name="email" 
                                        placeholder="Enter, your email" 
                                        onChange={(e) => setEmail({...email, value: e.target.value})} 
                                        onBlur={testInput} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="pasword" className="col-sm-2 col-form-label text-left">Password:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={!password.isCorrect ? "incorrect" : ""} 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter, your password" 
                                        onChange={(e) => setPassword({...password, value: e.target.value})} 
                                        onBlur={testInput} />
                                </div>
                            </div>
                        </div>
                        {
                            (props.isError)
                            ?<div className="alert alert-danger" role="alert"><strong>Error!</strong>  Email or password is incorrect!!!</div>
                            :""
                        }
                        <div className="form-group row col-sm-10 m-auto">
                            <div className="col-sm-10 offset-sm-5">
                                <button 
                                    className="btn btn-primary m-right my-2" 
                                    onClick={() => props.authWithPassword(inputs)} 
                                    disabled={props.dissableBtn || dissable}
                                >Log-in</button>
                            </div>
                        </div>
                    </form>
                    <div className="login__text"><span>Or</span></div>
                    <button 
                        className="btn-img"
                        onClick={props.authWithGoogle} 
                        disabled={props.dissableBtn}
                    ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
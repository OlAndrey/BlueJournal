import React, { useRef, useState } from "react";
import ReCAPTCHA  from "react-google-recaptcha";
import { REACT_APP_SITE_KEY } from "../../utils/consts";

const Registration = (props) => {    
    const captchaRef = useRef(null)
    const [capchaError, setCapchaError] = useState(false)
    const [names, setNames] = useState({name: "names", value: "", isClicked: false});
    const [email, setEmail] = useState({name: "email", value: "", isClicked: false});
    const [password, setPassword] = useState({name: "password", value: "", isClicked: false});
    const inputs = [names, email, password]

    const testInput = (e) => {
        let name = e.target.attributes.name.value;
        if(name === "names"){
            setNames({...names, isClicked: true})
        }
        if(name === "email"){
            setEmail({...email, isClicked: true})
        }
        if(name === "password"){
            setPassword({...password, isClicked: true})
        }
        props.testIn(e)
    }

    const submitForm = (event) =>{
        event.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        if(!token)
            setCapchaError(true)
        else
            props.authWithPassword(inputs);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                    <h2 className="text-center">Registration</h2>
                    <form className="row mx-2" onSubmit={submitForm}>
                        <div className="form-group col-sm-8 m-auto">
                            <div className="row my-2">
                                <label htmlFor="name" className="col-sm-2 col-form-label text-left">Name:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={props.errors.names ? "incorrect" : ""}
                                        type="text" 
                                        id="name"
                                        name="names" 
                                        placeholder="Enter, your name" 
                                        onChange={(e) => setNames({...names, value: e.target.value})} 
                                        onBlur={testInput} />
                                </div>
                                {
                                    props.errors.names &&
                                    <div className="col-sm-8 pb-2 m-auto text-danger" role="alert">{props.errors.names}</div>
                                }
                            </div>
                            <div className="row my-2">
                                <label htmlFor="email" className="col-sm-2 col-form-label text-left">Email:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={(props.errors.email || props.isError) ? "incorrect" : ""} 
                                        type="email" 
                                        id="email"
                                        name="email" 
                                        placeholder="Enter, your email" 
                                        onChange={(e) => setEmail({...email, value: e.target.value})} 
                                        onBlur={testInput} />
                                </div>
                                {
                                    props.errors.email &&
                                    <div className="col-sm-8 pb-2 m-auto text-danger" role="alert">{props.errors.email}</div>
                                }
                            </div>
                            <div className="row my-2">
                                <label htmlFor="pasword" className="col-sm-2 col-form-label text-left">Password:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={props.errors.password ? "incorrect" : ""} 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter, your password" 
                                        onChange={(e) => setPassword({...password, value: e.target.value})} 
                                        onBlur={testInput} />
                                </div>
                                {
                                    props.errors.password &&
                                    <div className="col-sm-8 pb-2 m-auto text-danger" role="alert">{props.errors.password}</div>
                                }
                            </div>
                        </div>
                        {
                            (props.isError)
                            ?<div className="col-sm-8 m-auto alert alert-danger" role="alert"><strong>Error!</strong>  Email already in use by another account!!!</div>
                            :""
                        }
                        <p className="col-sm-8 py-3 m-auto">
                            Do you have account?
                            <button className="btn btn-link pt-0" onClick={() => props.registry(false)}>Click here!</button>
                        </p>

                        <div className="col-sm-8 my-3 px-0 m-auto">
                            <div className="capcha m-auto" onClick={() => setCapchaError(false)}>
                                <ReCAPTCHA
                                    onChange={() => setCapchaError(false)}
                                    sitekey={REACT_APP_SITE_KEY}
                                    ref={captchaRef}
                                />
                            </div>
                        {
                            capchaError && <div className="my-3 alert alert-danger capcha-error m-auto" role="alert"><strong>Error!</strong>  Captcha not passed!!!</div>
                        }
                       </div>
                        <div className="form-group row col-sm-8 m-auto">
                            <div className="col-sm-10 m-auto">
                                <button 
                                    className="btn btn-primary d-block m-auto" 
                                    disabled={props.dissableBtn}
                                    type='submit'
                                >Registration</button>
                            </div>
                        </div>
                    </form>  
                </div>
            </div>
        </div> 
    )
}


export default Registration;
import React, { useState } from "react";

const LogIn = (props) => {
    const [email, setEmail] = useState({name: "email", value: "", isClicked: false});
    const [password, setPassword] = useState({name: "password", value: "", isClicked: false});
    const inputs = [email, password]
    
    const testInput = (e) => {
        let name = e.target.attributes.name.value;
        if(name === "email"){
            setEmail({...email, isClicked: true})
        }
        if(name === "password"){
            setPassword({...password, isClicked: true})
        }
        props.testIn(e)
        console.log(inputs)
    }
    const submitForm = (event) =>{
        event.preventDefault();
        props.authWithPassword(inputs)
    }

    return (
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                <form className="row mx-2" onSubmit={submitForm}>
                        <div className="form-group col-sm-8 m-auto">
                            <div className="row pt-2">
                                <label htmlFor="email" className="col-sm-2 col-form-label text-left">Email:</label>
                                <div className="col-sm-10">
                                    <input 
                                        className={props.errors.email ? "incorrect" : ""} 
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
                                        className={props.errors.password ? "incorrect" : ""} 
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
                            ?<div className="col-sm-8 py-2 m-auto alert alert-danger" role="alert"><strong>Error!</strong>  Email or password is incorrect!!!</div>
                            :""
                        }
                        <p className="col-sm-8 py-3 m-auto">
                            Don't have an account?
                            <button className="btn btn-link pt-0" onClick={() => props.registry(true)}>Click here!</button>
                        </p>
                        <div className="form-group row col-sm-8 m-auto">
                            <div className="col-sm-10 m-auto">
                                <button 
                                    className="btn btn-primary d-block m-auto mb-2" 
                                    disabled={props.dissableBtn}
                                    type="submit"
                                >Log-in</button>
                            </div>
                        </div>
                    </form>
                    <div className="login__text"><span>Or</span></div>
                    <div className="row" role="group">
                        <div className="col-sm-8 m-auto d-flex justify-content-around">
                            <button 
                                className="btn-img"
                                onClick={props.authWithFacebook} 
                                disabled={props.dissableBtn}
                                type='button'
                            // eslint-disable-next-line jsx-a11y/alt-text
                            ><img src="https://p.kindpng.com/picc/s/271-2719932_transparent-facebook-round-logo-hd-png-download.png" />
                            </button>
                            <button 
                                className="btn-img"
                                onClick={props.authWithGoogle} 
                                disabled={props.dissableBtn}
                                type='button'
                            // eslint-disable-next-line jsx-a11y/alt-text
                            ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" />
                            </button>
                            <button 
                                className="btn-img"
                                onClick={props.authWithTwitter} 
                                disabled={props.dissableBtn}
                                type='button'
                            // eslint-disable-next-line jsx-a11y/alt-text
                            ><img src="https://freepngimg.com/thumb/twitter/2-2-twitter-png-file-thumb.png" />
                            </button>
                    </div></div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
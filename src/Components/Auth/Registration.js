import React, { useState } from "react";

const Registration = (props) => {    
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
        props.authWithPassword(inputs);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                    <form className="row mx-2" onSubmit={submitForm}>
                        <div className="form-group col-sm-8 m-auto">
                            <div className="row mt-2">
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
                            </div>
                            <div className="row">
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
                            ?<div className="col-sm-8 m-auto alert alert-danger" role="alert"><strong>Error!</strong>  Email already in use by another account!!!</div>
                            :""
                        }
                        <p className="col-sm-8 py-3 m-auto">
                            Do you have account?
                            <button className="btn btn-link pt-0" onClick={() => console.log(1)}>Click here!</button>
                        </p>
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
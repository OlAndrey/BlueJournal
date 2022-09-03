import React, { useContext, useState } from "react";
import "./LogIn.css";
import { Context } from "../../index";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addNewUser } from "../../API/FirestoreRequests";
import LogIn from "./LogIn";

const LogInContainer = (props) => {
    const {auth} = useContext(Context);
    const [dissableBtn, setDissableBtn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState({});
    const {firestore} = useContext(Context);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const testInput = (e) => {
        let name = e.target.attributes.name.value;
        if(name === "names"){
            if(e.target.value === ""){
                setDissableBtn(true);
                setErrors({...errors, [name]: true})
            }
            else{
                setDissableBtn(false);
                setErrors({...errors, [name]: false})
            }
        }
        if(name === "email"){
            if(!regularEmail.test(e.target.value)){
                setDissableBtn(true);
                setErrors({...errors, [name]: true})
            }
            else{
                setDissableBtn(false);
                setErrors({...errors, [name]: false})
            }
        }
        if(name === "password"){
            if(!regularPassword.test(e.target.value)){
                setDissableBtn(true);
                setErrors({...errors, [name]: true})
            }
            else{
                setDissableBtn(false);
                setErrors({...errors, [name]: false})
            }
        }
        console.log(errors)
    }

    const authWithPassword = (inputs) => {
        inputs.forEach((item) => {
            if(!item.isClicked && !item.value){
                setErrors({...errors, [item.name]: true})
                return undefined
            }
        })
        setIsError(false);
        setDissableBtn(true);
        firebase.auth().signInWithEmailAndPassword(inputs[0].value, inputs[1].value)
        .catch((error) => {
            setIsError(true);
        })
        .finally(() =>{
            setDissableBtn(false);
        });
    }

    const authWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        var userId = users.filter((val) => val.uid === user.uid);
        if (!userId.length){
            addNewUser(user)
        }
    }

    return (
        <LogIn authWithPassword={authWithPassword} authWithGoogle={authWithGoogle} testIn={testInput} errors={errors} isError={isError} dissableBtn={dissableBtn} />
    )
}

export default LogInContainer;
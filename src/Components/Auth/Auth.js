import React, { useContext, useState } from "react";
import "./Auth.css";
import { Context } from "../../index";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addNewUser } from "../../API/userApi";
import LogIn from "./LogIn";
import Registration from "./Registration";

const LogInContainer = (props) => {
    const {auth} = useContext(Context);
    const [isNewUser, setIsNewUser] = useState(false);
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
    }
    
    const checkForm = (inputs) => {
        inputs.forEach((item) => {
            if(!item.value){
                setErrors({...errors, [item.name]: true})
                return false
            }
        })
        return true
    }
    const registryWithPassword = async(inputs) => {
        if(checkForm(inputs)){
            setIsError(false);
            setDissableBtn(true);
            try{
                const dataFromServer = await auth.createUserWithEmailAndPassword(inputs[1].value, inputs[2].value)
                if (dataFromServer.user) {
                    dataFromServer.user.updateProfile({
                        displayName: inputs[0].value,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/R.jpg?alt=media&token=e1af4323-3e04-44ec-90cc-56eeaa43494e"
                    });
                    addNewUser(dataFromServer.user, inputs[0].value)
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setDissableBtn(false);
            }
        }
    }

    const authWithPassword = (inputs) => {
        if(checkForm(inputs)){
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
    }

    const authWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        var userId = users.filter((val) => val.uid === user.uid);
        if (!userId.length){
            addNewUser(user)
        }
    }
    
    const authWithFacebook = async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        var userId = users.filter((val) => val.uid === user.uid);
        if (!userId.length){
            addNewUser(user)
        }
    }
    
    const authWithTwitter = async () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
        console.log(user)
        var userId = users.filter((val) => val.uid === user.uid);
        if (!userId.length){
            addNewUser(user)
        }
    }

    return (
        <>
            {
                isNewUser
                    ?<Registration 
                        authWithPassword={registryWithPassword} 
                        registry={setIsNewUser}
                        testIn={testInput} 
                        errors={errors} 
                        isError={isError} 
                        dissableBtn={dissableBtn} />
                    :<LogIn 
                        authWithPassword={authWithPassword} 
                        authWithFacebook={authWithFacebook}
                        authWithTwitter={authWithTwitter}
                        authWithGoogle={authWithGoogle} 
                        registry={setIsNewUser}
                        testIn={testInput} 
                        errors={errors} 
                        isError={isError} 
                        dissableBtn={dissableBtn} />
            }
        </>
    )
}

export default LogInContainer;
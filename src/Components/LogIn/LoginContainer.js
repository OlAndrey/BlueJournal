import React, { useContext, useState } from "react";
import { Context } from "../../index";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addNewUser } from "../../API/FirestoreRequests";
import LogIn from "./LogIn";

const LogInContainer = (props) => {
    const {auth} = useContext(Context);
    const [dissableBtn, setDissableBtn] = useState(false);
    const [isError, setIsError] = useState(false);
    const {firestore} = useContext(Context);
    const [users] = useCollectionData(
        firestore.collection('users')
    )


    const authWithPassword = (email, password) => {
        setIsError(false);
        setDissableBtn(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
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
        var userId = users.filter((val) => val.uid === user.providerData[0].uid);
        if (!userId.length){
            addNewUser(user.providerData[0])
        }
    }

    return (
        <LogIn authWithPassword={authWithPassword} authWithGoogle={authWithGoogle} isError={isError} dissableBtn={dissableBtn} />
    )
}

export default LogInContainer;
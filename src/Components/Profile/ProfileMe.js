import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../index";
import Profile from "./Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import PreLoader from "../PreLoader/PreLoader";

const ProfileMe = (props) =>{
    const {auth} = useContext(Context);
    const {firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users, loading] = useCollectionData(
        firestore.collection('users')
    )

    if(loading)
        return <PreLoader />
    
    let me = getUserByID(users, user.uid)
    return (
        <Profile me={true} user={me} />
    )
}

export default ProfileMe;
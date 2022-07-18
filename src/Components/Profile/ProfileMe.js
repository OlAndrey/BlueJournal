import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../index";
import Profile from "./Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import PreLoader from "../PreLoader/PreLoader";

const ProfileMe = (props) =>{
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [postsData, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    if(loading)
        return <PreLoader />
    
        
    let me = getUserByID(users, user.uid)
    return (
        <Profile 
            me={true} 
            user={me} 
            postsData={
                postsData
                    .filter((val) => val.userId === me.uid)
                    .sort((a,b) => b.postId - a.postId)
                }
            />
    )
}

export default ProfileMe;
import React, { useContext } from "react";
import { Context } from "../../index";
import "./Profile.css";
import Profile from "./Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import { useParams } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";
import { useAuthState } from "react-firebase-hooks/auth";
import { Follow, unFollow } from "../../API/FirestoreRequests";

const ProfileOther = (props) =>{
    let params = useParams();
    const { firestore, auth } = useContext(Context);
    const [me] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [postsData, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    if(loading)
        return <PreLoader />

    let myProfile = getUserByID(users, me.uid)
    const FollowChange = (id) => {
        Follow(myProfile.path, myProfile.Follow, id)
    }

    const unFollowChange = (id) => {
        unFollow(myProfile.path, myProfile.Follow, id)
    }
    
    let user = getUserByID(users, params.uid)
    return (
        <Profile 
            me={false} 
            user={user} 
            isFollow={myProfile.Follow.includes(user.uid)}
            Follow={FollowChange} 
            unFollow={unFollowChange} 
            postsData={
                postsData
                    .filter((val) => val.userId === user.uid)
                    .sort((a,b) => b.postId - a.postId)
                }
            />
    )
}

export default ProfileOther;
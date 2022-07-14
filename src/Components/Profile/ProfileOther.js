import React, { useContext } from "react";
import { Context } from "../../index";
import "./Profile.css";
import Profile from "./Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import { useParams } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";

const ProfileOther = (props) =>{
    let params = useParams();
    const { firestore} = useContext(Context);
    const [users, loading] = useCollectionData(
        firestore.collection('users')
    )

    if(loading)
        return <PreLoader />
    
    let user = getUserByID(users, params.uid)
    return (
        <Profile me={false} wallpaper={user.wallpaperUrl} logo={user.photoUrl} user={user} />
    )
}

export default ProfileOther;
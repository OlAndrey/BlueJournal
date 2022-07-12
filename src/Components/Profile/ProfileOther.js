import React, { useContext, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { Context } from "../../index";
import "./Profile.css";
import Profile from "./Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import { useParams } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";

const ProfileOther = (props) =>{
    let params = useParams();
    const {database, firestore} = useContext(Context);
    const [users, loading] = useCollectionData(
        firestore.collection('users')
    )
    const [photoUrl, SetPhotoUrl] = useState(null);

    if(loading)
        return <PreLoader />
    
    let user = getUserByID(users, params.uid)
    // getDownloadURL(ref(database, `images/${params.uid}/wellpaper.jpeg`))
    //     .then((url) => {SetPhotoUrl(url)})
    return (
        <Profile me={false} wallpaper={photoUrl} user={user} />
    )
}

export default ProfileOther;
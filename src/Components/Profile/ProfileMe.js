import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { Context } from "../../index";
import Profile from "./Profile";

const ProfileMe = (props) =>{
    const {auth} = useContext(Context);
    const {database} = useContext(Context);
    const [user] = useAuthState(auth);
    const [photoUrl, SetPhotoUrl] = useState(null)
    getDownloadURL(ref(database, `images/${user.uid}/wellpaper.jpeg`))
        .then((url) => {SetPhotoUrl(url)})

    
    return (
        <Profile me={true} wallpaper={photoUrl} user={user} />
    )
}

export default ProfileMe;
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { Context } from "../../index";
import Profile from "./Profile";

const ProfileMe = (props) =>{
    const {auth} = useContext(Context);
    const {database} = useContext(Context);
    const [user] = useAuthState(auth);
    const [wallpaperUrl, setWallpaperUrl] = useState(null);
    const [logooUrl, setLogoUrl] = useState(null);
    getDownloadURL(ref(database, `images/wallpaper/${user.uid}`))
        .then((url) => {setWallpaperUrl(url)})
    getDownloadURL(ref(database, `images/logo/${user.uid}`))
        .then((url) => {setLogoUrl(url)})

    
    return (
        <Profile me={true} wallpaper={wallpaperUrl} logo={logooUrl} user={user} />
    )
}

export default ProfileMe;
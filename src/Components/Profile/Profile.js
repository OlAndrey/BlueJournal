import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { Context } from "../../index";
import NewPost from "../NewPost/NewPost";
import Posts from "../Posts/Posts";
import "./Profile.css";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Profile = (props) =>{
    const {auth} = useContext(Context);
    const {database} = useContext(Context);
    const [user] = useAuthState(auth);
    const [photoUrl, SetPhotoUrl] = useState(null)
    getDownloadURL(ref(database, `images/${user.uid}/wellpaper.jpeg`))
      .then((url) => {SetPhotoUrl(url)})
    return (
        <div className="profile">
            <div className="container">
                <div className="profile__header">
                    <div className="profile__image">
                        <img src={photoUrl} alt="Home image" />
                    </div>
                    <div className="profile__body">
                        <div className="profile__block">
                            <div className="profile__photo">
                                <img src={user.photoURL} alt="profile photo" />
                            </div>
                            <div className="profile__name">
                                {user.displayName}
                            </div>
                        </div>
                        
                        <div className="profile__edit">
                            Edit profile
                        </div>
                    </div>
                    <ProfileMenu />
                </div>
                <NewPost />
                <Posts />
            </div>
        </div>
    )
}

export default Profile;
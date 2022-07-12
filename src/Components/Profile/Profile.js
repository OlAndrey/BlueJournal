import React from "react";
import NewPost from "../NewPost/NewPost";
import Posts from "../Posts/Posts";
import "./Profile.css";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Profile = (props) =>{
    return (
        <div className="profile">
            <div className="container">
                <div className="profile__header">
                    <div className="profile__image">
                        {props.wallpaper
                            ?<img src={props.wallpaper} alt="Home image" />
                            :""
                        }
                        
                    </div>
                    <div className="profile__body">
                        <div className="profile__block">
                            <div className="profile__photo">
                                <img src={props.user.photoURL} alt="profile photo" />
                            </div>
                            <div className="profile__name">
                                {props.user.displayName}
                            </div>
                        </div>
                        {props.me
                        ?<div className="profile__edit">
                            Edit profile
                        </div>
                        :<div className="profile__edit">
                            Unfollow
                        </div>
                        }
                    </div>
                    <ProfileMenu />
                </div>
                {props.me
                ?<NewPost />
                :""}
                <Posts user={props.user} />
            </div>
        </div>
    )
}

export default Profile;
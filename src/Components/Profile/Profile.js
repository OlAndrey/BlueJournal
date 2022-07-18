import React from "react";
import MyPosts from "../MyPosts/MyPosts";
import Post from "../Post/Post";
import EditProfile from "./EditProfile/EditProfile";
import "./Profile.css";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Profile = ({me, user, postsData, isFollow, Follow, unFollow}) =>{
    return (
        <div className="profile">
            <div className="container">
                <div className="profile__header">
                    <div className="profile__image">
                        {user.wallpaperUrl
                            ?<img src={user.wallpaperUrl} alt="Home image" />
                            :""
                        }
                        
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
                        {me
                        ? <EditProfile user={user} />
                        :(isFollow
                            ?<div className="profile__edit" onClick={() => unFollow(user.uid)}>Unfollow</div>
                            :<div className="profile__edit" onClick={() => Follow(user.uid)}>Follow</div>)
                        }
                    </div>
                    <ProfileMenu />
                </div>
                {me && <MyPosts />}
                {postsData && postsData.length
                    ?postsData.map((item, i) => <Post key={i} {...item} myId={user.uid} user={user} />)
                    :<h3 className="text-center m-4">User don't have posts!</h3>
                }
            </div>
        </div>
    )
}

export default Profile;
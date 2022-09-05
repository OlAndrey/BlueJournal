import dayjs from "dayjs";
import React from "react";
import { avatarURL } from "../../images/imagesURL";
import MyPosts from "../MyPosts/MyPosts";
import Post from "../Post/Post";
import EditProfile from "./EditProfile/EditProfile";
import "./Profile.css";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Profile = ({me, user, postsData, isFollow, Follow, unFollow}) =>{
    const threeMinutes = 180000;
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
                                <img src={user.photoURL ?user.photoURL :avatarURL} alt="profile photo" />
                            </div>
                            
                        <div className="name-and-status">
                            <div className="name">{user.displayName}</div>
                            <div className="status">
                                {
                                user.lastOnlineDate
                                ?(user.lastOnlineDate.toMillis() + threeMinutes < new Date().getTime())
                                    ?"last seen " + dayjs(user.lastOnlineDate.toMillis()).calendar(null, {
                                        sameDay: '[at] h:mm A', 
                                        nextDay: '[tomorrow at] h:mm A'
                                    })
                                    :<><span className="circle-status" />Online</>
                                :"last seen recently"
                                }
                            </div>
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
                {postsData && (postsData.length
                    ?postsData.map((item, i) => <Post key={i} {...item} myId={user.uid} user={user} />)
                    :<h3 className="text-center m-4">User don't have posts!</h3>)
                }
            </div>
        </div>
    )
}

export default Profile;
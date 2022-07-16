import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import PreLoader from "../PreLoader/PreLoader";
import { getUserByID } from "../../utils/getter";
import { Follow, unFollow } from "../../API/FirestoreRequests";
import User from "./User/User";
import "./Users.css"

const Friends = (props) => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [messages, loading ] = useCollectionData(
      firestore.collection('dialogs')
    )

    if(loading)
        return <PreLoader />
    
    let me = getUserByID(users, user.uid);
    
    const FollowChange = (id) => {
        Follow(me.path, me.Follow, id)
    }

    const unFollowChange = (id) => {
        unFollow(me.path, me.Follow, id)
    }
    
    return (
        <div className="users">
            {users
                .filter((val) => val.uid !== user.uid && val.Follow.includes(user.uid) && me.Follow.includes(val.uid))
                .map((item, i) => <User 
                                        key={i} 
                                        {...item} 
                                        isFriend={true} 
                                        Follow={FollowChange} 
                                        dialogId={messages.filter(dialog => dialog.between.includes(user.uid) && dialog.between.includes(item.uid))[0]}
                                        unFollow={unFollowChange} />)}
        </div>
    )
}

export default Friends;
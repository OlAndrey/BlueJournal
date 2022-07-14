import React, { useContext } from "react";
import "./Users.css"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import PreLoader from "../PreLoader/PreLoader";
import User from "./User/User";
import { getUserByID } from "../../utils/getter";
import { Follow, unFollow } from "../../API/FirestoreRequests";

const Users = (props) => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users, loading] = useCollectionData(
        firestore.collection('users')
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
                .filter((val) => val.uid !== user.uid)
                .map((item, i) => <User key={i} {...item} isFollow={me.Follow.includes(item.uid)} Follow={FollowChange} unFollow={unFollowChange} />)}
        </div>
    )
}

export default Users;
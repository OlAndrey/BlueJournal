import React, { useContext, useEffect, useState } from "react";
import "./Users.css"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import PreLoader from "../PreLoader/PreLoader";
import User from "./User/User";
import { getUserByID } from "../../utils/getter";
import { Follow, unFollow } from "../../API/FirestoreRequests";
import Pagination from "../Pagination/Pagination";

const Users = (props) => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [messages, loading ] = useCollectionData(
      firestore.collection('dialogs')
    )
    const [portionUsers, setPortionUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, portionSize] = [5, 3];

    useEffect(() => {
        if(users)
            setPortionUsers(users.filter((val) => val.uid !== user.uid).slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }, [currentPage, users])

    if(loading)
        return <PreLoader />
    
    let me = getUserByID(users, user.uid);
    let usersCount = users.length;
    const FollowChange = (id) => {
        Follow(me.path, me.Follow, id)
    }

    const unFollowChange = (id) => {
        unFollow(me.path, me.Follow, id)
    }

    const onPageChanged = (page) => {
        setCurrentPage(page);
    }
    
    return (
        <div className="users">
            {portionUsers
                .map((item, i) => <User 
                                        key={i} 
                                        {...item} 
                                        isFollow={me.Follow.includes(item.uid)} 
                                        Follow={FollowChange} 
                                        dialogId={messages.filter(dialog => dialog.between.includes(user.uid) && dialog.between.includes(item.uid))[0]}
                                        unFollow={unFollowChange} />)}
                                        
            <Pagination currentPage={currentPage} totalItemCount={usersCount} pageSize={pageSize} portionSize={portionSize} onPageChanged={onPageChanged}  />
        </div>
    )
}

export default Users;
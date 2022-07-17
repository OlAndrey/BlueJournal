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
import SearchUsers from "../SearchUsers/SearchUsers";

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
    const [relultUsers, setRelultUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, portionSize] = [5, 3];

    useEffect(() => {
        if(relultUsers.length)
            setUsersCount(relultUsers.length);
        if(relultUsers.length && relultUsers.length < users.length)
            setPortionUsers(relultUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize))
        if(users && usersCount === users.length)
            setPortionUsers(users.filter((val) => val.uid !== user.uid).slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }, [currentPage, usersCount, relultUsers])

    if(loading)
        return <PreLoader />

    if(users && usersCount < 0)
        setUsersCount(users.length);

    if(relultUsers.length && usersCount !== relultUsers.length)
        setUsersCount(relultUsers.length);
    
    let me = getUserByID(users, user.uid);
    const FollowChange = (id) => {
        Follow(me.path, me.Follow, id)
    }

    const unFollowChange = (id) => {
        unFollow(me.path, me.Follow, id)
    }

    const onPageChanged = (page) => {
        setCurrentPage(page);
    }

    const onSearch = (value) =>{
        setRelultUsers(users.filter((val) => val.displayName.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    }
    return (
        <div className="users">
            <SearchUsers onSearch={onSearch} />
            {portionUsers
                .map((item, i) => {
                    return <User 
                                key={i} 
                                {...item} 
                                isFollow={me.Follow.includes(item.uid)} 
                                Follow={FollowChange} 
                                dialogId={messages.filter(dialog => dialog.between.includes(user.uid) && dialog.between.includes(item.uid))[0]}
                                unFollow={unFollowChange} 
                            />
                })
            }
            {currentPage === 1 && portionUsers.length < pageSize     
                ? null         
                : <Pagination currentPage={currentPage} totalItemCount={usersCount} pageSize={pageSize} portionSize={portionSize} onPageChanged={onPageChanged}  />
            }     
        </div>
    )
}

export default Users;
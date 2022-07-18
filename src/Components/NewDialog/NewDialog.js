import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Follow, unFollow } from "../../API/FirestoreRequests";
import { Context } from "../../index";
import { getUserByID } from "../../utils/getter";
import PreLoader from "../PreLoader/PreLoader";
import SearchUsers from "../SearchUsers/SearchUsers";
import Friends from "../Users/Friends";
import User from "../Users/User/User";

const NewDialog = (props) => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [users] = useCollectionData(
        firestore.collection('users')
    )
    const [messages, loading ] = useCollectionData(
      firestore.collection('dialogs')
    )    
    const [relultUsers, setRelultUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    if(loading)
        return <PreLoader />

    let me = getUserByID(users, user.uid);
    const FollowChange = (id) => {
        Follow(me.path, me.Follow, id)
    }

    const unFollowChange = (id) => {
        unFollow(me.path, me.Follow, id)
    }

    const onSearch = (value) =>{
        if(!value){
            setIsSearch(false)
            setRelultUsers([])
        }
        else{
            setIsSearch(true)
            setRelultUsers(users.filter((val) => val.displayName.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        }
    }

    return(
        <div className="users">
            <h2 className="text-center">Choise user for dialog</h2>
            <SearchUsers onSearch={onSearch} />
            {
                !isSearch

                ?<Friends forDialog={true}>
                    <SearchUsers onSearch={onSearch} /> 
                </Friends>

                :(relultUsers.length === 0
                    ?<div className="h-75 d-flex justify-content-center">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <h3>User is not found!</h3>
                        </div>
                    </div>
                    
                    :relultUsers
                    .slice(0, 10)
                    .map((item, i) => <User
                                        key={i} 
                                        {...item} 
                                        isFriend={true} 
                                        Follow={FollowChange} 
                                        dialogId={messages.filter(dialog => dialog.between.includes(user.uid) && dialog.between.includes(item.uid))[0]}
                                        unFollow={unFollowChange} />))
            }
        </div>
    )
}

export default NewDialog;
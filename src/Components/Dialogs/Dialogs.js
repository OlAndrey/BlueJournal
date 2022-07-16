import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import { getUserByID } from "../../utils/getter";
import PreLoader from "../PreLoader/PreLoader";
import DialogsItem from "./DialogsItem/DialogsItem";

const Dialogs = (props) => {
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

    const selectMessages = messages.filter(item => item.between.includes(user.uid));
    
    return (
        <div className="dialogs">
            <h2 className="text-center m-3">Dialogs</h2>
            {
                selectMessages
                    .sort((a,b) => b.lastMessage.id - a.lastMessage.id)
                    .map(item => <DialogsItem key={item.id} id={item.id} lastMessage={item.lastMessage} sender={getUserByID(users, item.between.filter(i => i !== user.uid)[0])} />)
            }
        </div>
    )
}

export default Dialogs;
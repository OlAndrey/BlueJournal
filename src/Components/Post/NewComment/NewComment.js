import React, { useContext, useState } from "react";
import "./NewComment.css";
import { Context } from "../../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { addNewComment, updatesCommentCount } from "../../../API/FirestoreRequests";
import { useAuthState } from "react-firebase-hooks/auth";

const NewComment = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [comments, loading] = useCollectionData(
        firestore.collection(`/post/${props.path}/comments`).orderBy("commentId")
    )

    const createNewComment = () => {
        if(value !== ""){
            let commentId = null;
            if(!comments[comments.length - 1])
                commentId = Math.floor(Math.random() * 200000)
            else
                commentId = comments[comments.length - 1].commentId + 1;
            
            addNewComment(`/post/${props.path}/comments`, value, commentId, user.uid)
            updatesCommentCount(props.path, comments.length + 1)
            setValue('')
        }
    }


    return (
        <div className="new-coment__form">
            <input 
                autoFocus
                type="text" 
                placeholder="Your comment"
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <button onClick={createNewComment}>Add comment</button>
        </div>
    )
}

export default NewComment;
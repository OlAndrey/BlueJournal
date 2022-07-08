import React, { useContext, useState } from "react";
import "./NewComment.css";
import { Context } from "../../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { addNewComment, updatesCommentCount } from "../../../API/FirestoreRequests";

const NewComment = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const [comments, loading] = useCollectionData(
        firestore.collection(`/post/${props.path}/comments`)
    )

    const createNewComment = () => {
        if(value !== ""){
            addNewComment(`/post/${props.path}/comments`, value)
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
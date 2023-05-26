import React, { useContext, useState } from "react";
import "./NewComment.css";
import { Context } from "../../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { addNewComment, updatesCommentCount } from "../../../API/postsAPI";
import { useAuthState } from "react-firebase-hooks/auth";

const NewComment = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [comments] = useCollectionData(
        firestore.collection(`${props.path}/comments`).orderBy("commentId")
    )

    const createNewComment = () => {
        if(value !== ""){
            addNewComment(`${props.path}/comments`, value, user.uid)
            updatesCommentCount(props.path, comments.length + 1)
            setValue('')
        }
    }


    return (
        <div className="input-group mt-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Your comment" 
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <div className="input-group-append">
                <button className="btn btn-secondary" type="button"  onClick={createNewComment}>Add comment</button>
            </div>
        </div>
    )
}

export default NewComment;
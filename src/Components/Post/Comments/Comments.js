import React, { useContext } from "react";
import "./Comments.css";
import { Context } from "../../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import PreLoader from "../../PreLoader/PreLoader";
import Comment from "./Comment/Comment";

const Comments = (props) => {
    const {firestore} = useContext(Context);
    const [comments, loading] = useCollectionData(
        firestore.collection(`/post/${props.path}/comments`).orderBy("commentId")
    )
    if(loading){
        return <PreLoader />
    }


    
    return (
        <div className="Comments">
            {
                comments.map((item, index) => <Comment key={index} date={(item.createdAt) ? item.createdAt.toDate() : null} comment={item.comment} uid={item.userId} users={props.users} />).reverse()
            }
        </div>
    )
}

export default Comments;
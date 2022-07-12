import React, { useState } from "react";
import "./Post.css";
import NewComment from "./NewComment/NewComment";
import { likesTogglePost } from "../../API/FirestoreRequests";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";
import PostBody from "./PostBody";

const Post = (props) => {    
    const [isVisible, SetVisible] = useState(false);
    const postBody = <PostBody createdAt={props.createdAt} postText={props.postText} autor={props.user} users={props.users} myId={props.myId} uid={props.userId} src={props.src} />;
    if(props.post && !isVisible) SetVisible(true);

    return (
        <div className="post">
            {
                (props.post)
                ? postBody
                :<Link to={"/post/" + props.id}>{postBody}</Link>
            }
            
            <div className="post__menu">
                <button className={(props.iLiked ? "button-active" : "")} type="button" onClick={() => likesTogglePost({...props})}>
                    {props.likesCount}  Like
                </button>
                {
                    (props.post)
                    ?<button type="button">
                        {props.commentCount}  Comment
                    </button>
                    :<button className={(isVisible ? "button-active" : "")}  type="button" onClick={() => SetVisible(!isVisible)}>
                        {props.commentCount}  Comment
                    </button>
                }
                <button type="button">
                    {props.returnCount}  Return
                </button>
            </div>
            {(isVisible) 
            ? <NewComment path={props.id} />
            : ""}
            {
                (props.post)
                ?<Comments path={props.id} users={props.users} />
                :""
            }
        </div>
    )
}



export default Post;
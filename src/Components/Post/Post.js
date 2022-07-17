import React, { useState } from "react";
import "./Post.css";
import NewComment from "./NewComment/NewComment";
import { likesTogglePost } from "../../API/FirestoreRequests";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";
import PostBody from "./PostBody";

const Post = (props) => {    
    const [isVisible, SetVisible] = useState(false);
    const postBody = <PostBody {...props} autor={props.user} uid={props.userId} />;
    const meLikes = props.whoLikes.includes(props.myId);
    if(props.post && !isVisible) SetVisible(true);

    return (
        <div className="post">
            {
                (props.post)
                ? postBody
                :<Link to={"../" + props.path}>{postBody}</Link>
            }
            
            <div className="post__menu">
                <button 
                    className={(meLikes ? "button-active" : "")} 
                    onClick={() => likesTogglePost(props.path, props.whoLikes, meLikes, props.myId)}
                    type="button" 
                >
                    {props.whoLikes.length}  Like
                </button>
                {
                    (props.post)
                    ?<button className="w-50" type="button">
                        {props.commentCount}  Comment
                    </button>
                    :<button className={(isVisible ? "button-active w-50" : "w-50")}  type="button" onClick={() => SetVisible(!isVisible)}>
                        {props.commentCount}  Comment
                    </button>
                }
                <button type="button">
                    {props.returnCount}  Return
                </button>
            </div>
            {(isVisible) 
            ? <NewComment path={props.path} />
            : ""}
            {
                (props.post)
                ?<Comments path={props.path} users={props.users} />
                :""
            }
        </div>
    )
}



export default Post;
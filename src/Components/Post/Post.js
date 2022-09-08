import React, { useState } from "react";
import "./Post.css";
import NewComment from "./NewComment/NewComment";
import { likesTogglePost, deletePost } from "../../API/postsAPI";
import Comments from "./Comments/Comments";
import PostBody from "./PostBody";

const Post = (props) => {    
    const [isVisible, SetVisible] = useState(false);
    const meLikes = props.whoLikes.includes(props.myId);
    if(props.post && !isVisible) SetVisible(true);

    return (
        <div className="post">
            <PostBody {...props} autor={props.user} uid={props.userId} deletePost={deletePost} />
            <div className="post__menu">
                <button 
                    className={meLikes ?"button-active" :""} 
                    onClick={() => likesTogglePost(props.path, props.whoLikes, meLikes, props.myId)}
                    type="button" 
                >
                    {props.whoLikes.length}  Like
                </button>
                {
                    (props.post)
                    ?<button type="button">
                        {props.commentCount}  Comment
                    </button>
                    :<button className={isVisible ?"button-active" :""}  type="button" onClick={() => SetVisible(!isVisible)}>
                        {props.commentCount}  Comment
                    </button>
                }
            </div>
            {(isVisible) && <NewComment path={props.path} />}
            {
                (props.post) && <Comments path={props.path} users={props.users} />
            }
        </div>
    )
}



export default Post;
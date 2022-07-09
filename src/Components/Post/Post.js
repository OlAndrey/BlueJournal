import React, { useState } from "react";
import "./Post.css";
import image from "../../cats1.jpg";
import img from "../../Nature.jpeg"
import NewComment from "./NewComment/NewComment";
import { likesTogglePost } from "../../API/FirestoreRequests";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";

const Post = (props) => {    
    const [isVisible, SetVisible] = useState(false);
    const postBody = <PostBody createdAt={props.createdAt} postText={props.postText} />;
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
                ?<Comments path={props.id} />
                :""
            }
        </div>
    )
}

const PostBody = (props) =>{
    const date = props.createdAt;
    return (
        <>
            <div className="post__title">
                <div className="post__logo">
                    <img src={image} alt="logo" />
                </div>
                <div className="post__data">
                    <div className="post__name">
                        Oleynik Andrey
                    </div>
                    <div className="post__date">
                        {(date) ? date.toDate().toUTCString() : "---, -- --- ---- --:--:--"}
                    </div>
                </div>
            </div>
            <div className="post__text">
                {props.postText}
            </div>
            <div className="post__image">
                <img src={img} alt="post" />
            </div>
        </>
    )
}

export default Post;
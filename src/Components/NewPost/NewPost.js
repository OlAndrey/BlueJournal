import React from "react";
import "./NewPost.css";

const NewPost = (props) => {
    return (
        <div className="new-post">
            <div className="new-post__form">
                <img className="new-post__image" src="#" alt="img" />
                <input type="text" placeholder="Who, news?" />
                <button type="submit">Add post</button>
            </div>
            <div className="new-post__block">
                <div className="new-post__multimedia">
                    Photo/Video
                </div>
                <div className="new-post__action">
                    Action
                </div>
            </div>
        </div>
    )
}

export default NewPost;
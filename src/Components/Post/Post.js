import React from "react";
import "./Post.css";
import image from "../../cats1.jpg";
import img from "../../Nature.jpeg"

const Post = (props) => {
    return (
        <div className="post">
            <div className="post__title">
                <div className="post__logo">
                    <img src={image} alt="logo" />
                </div>
                <div className="post__data">
                    <div className="post__name">
                        Oleynik Andrey
                    </div>
                    <div className="post__date">
                        {props.createdAt.toString()}
                    </div>
                </div>
            </div>
            <div className="post__text">
                {props.postText}
            </div>
            <div className="post__image">
                <img src={img} alt="post" />
            </div>
            <div className="post__menu">
                <button type="button">
                    {props.likesCount}  Like
                </button>
                <button type="button">
                    {props.comentCount}  Coment
                </button>
                <button type="button">
                    {props.returnCount}  Return
                </button>
            </div>
        </div>
    )
}

export default Post;
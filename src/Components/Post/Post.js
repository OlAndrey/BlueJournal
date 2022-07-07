import React from "react";
import "./Post.css";

const Post = (props) => {
    return (
        <div className="post">
            <div className="post__title">
                <div className="post__logo">
                    <img src="#" alt="logo" />
                </div>
                <div className="post__date">
                    <div className="post__name">
                        Oleynik Andrey
                    </div>
                    <div className="post__date">
                        17 June 2020 19:21
                    </div>
                </div>
            </div>
            <div className="post__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos deserunt libero perspiciatis iste, magnam molestias autem delectus, quasi ex, dignissimos debitis rem excepturi minus quibusdam harum unde reprehenderit laborum commodi!
            </div>
            <div className="post__image">
                <img src="#" alt="post" />
            </div>
            <div className="post__menu">
                <button type="button">
                    2.6k  Like
                </button>
                <button type="button">
                    36  Coment
                </button>
                <button type="button">
                    20  Return
                </button>
            </div>
        </div>
    )
}

export default Post;
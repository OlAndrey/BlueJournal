import React from "react";
import { Link } from "react-router-dom";
import { getUserByID } from "../../utils/getter";

const PostBody = (props) =>{
    const date = props.createdAt;
    let autorData = props.autor;
    if(!autorData)
        autorData = getUserByID(props.users, props.uid);
    return (
        <>
            <div className="post__title">
                {
                    (props.autor)
                    ?<div className="post__logo">
                        <img src={props.logo ?props.logo :autorData.photoURL} alt="logo" />
                    </div>
                    :<Link to={(props.myId === props.uid) ? "../profile" :"../profile/" + props.uid} className="post__logo">
                        <img src={props.logo ?props.logo :autorData.photoURL} alt="logo" />
                    </Link>
                }
                
                <div className="post__data">
                    {
                        (props.autor)
                        ?<div className="post__name">
                            {autorData.displayName}
                        </div>
                        :<Link to={(props.myId === props.uid) ? "../profile" :"../profile/" + props.uid} className="post__name">
                            {autorData.displayName}
                        </Link>
                    }
                    <div className="post__date">
                        {(date) ? date.toDate().toUTCString() : "---, -- --- ---- --:--:--"}
                    </div>
                </div>
            </div>
            <div className="post__text">
                {props.postText}
            </div>
            {(props.src)
            ?<div className="post__image">
                <img src={props.src} alt="post" />
            </div>
            :""}
        </>
    )
}

export default PostBody;
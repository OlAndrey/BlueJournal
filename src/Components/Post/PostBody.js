import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByID } from "../../utils/getter";

const PostBody = (props) =>{
    const ref = useRef();
    let navigate = useNavigate();
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
                        <img src={autorData.photoURL} alt="logo" />
                    </div>
                    :<Link to={(props.myId === props.uid) ? "../profile" :"../profile/" + props.uid} className="post__logo">
                        <img src={autorData.photoURL} alt="logo" />
                    </Link>
                }
                
                <div className="post__data w-100">
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
                {
                    (props.myId === props.uid || !props.post) && 
                        <div>
                            <button className="btn btn-primary dropdown-toggle" type="button" onClick={() => ref.current.classList.toggle("d-block")}>More</button>
                            <div className="dropdown-menu dropdown-menu-right" ref={ref}>
                                {!props.post && <Link className="dropdown-item"  to={"../" + props.path}>See post</Link>}
                                {(props.myId === props.uid) && <div className="dropdown-item delete"
                                    onClick={() => {
                                        props.deletePost(props.path)
                                        navigate("/home", { replace: true })
                                    }}>
                                Delete post</div>}
                            </div>
                        </div>
                }
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
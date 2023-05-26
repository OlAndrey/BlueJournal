import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
    return (
        <div className="user">
            <Link to={"../profile/" + props.uid} className="user__body">
                <div>
                    <img src={props.photoURL} className="user__photo" alt="photo" />
                </div>
                <div className="user__name">
                    {props.displayName}
                </div>
            </Link>
            <div className="block">
                {!props.isFriend
                    ?(props.isFollow
                        ? <div className="btn btn-outline-info" onClick={() => props.unFollow(props.uid)}>UnFollow</div>
                        : <div className="btn btn-outline-success" onClick={() => props.Follow(props.uid)}>Follow</div>)
                    :""
                }
                <Link to={props.dialogId ?"../dialog/" + props.dialogId.id : "../dialog/" + props.uid} className="btn btn-outline-warning">
                    Messages
                </Link>
            </div>
        </div>
    )
}

export default User;
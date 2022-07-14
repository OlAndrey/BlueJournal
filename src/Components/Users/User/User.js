import React from "react";
import { Link } from "react-router-dom";

const User = (props) => {
    return (
        <div class="user">
            <Link to={"../profile/" + props.uid} class="user__body">
                <div>
                    <img src={props.photoURL} class="user__photo" alt="photo" />
                </div>
                <div class="user__name">
                    {props.displayName}
                </div>
            </Link>
            <div>
                {
                    props.isFollow
                    ? <div class="btn btn-outline-info" onClick={() => props.unFollow(props.uid)}>UnFollow</div>
                    : <div class="btn btn-outline-success" onClick={() => props.Follow(props.uid)}>Follow</div>
                }
                <Link to={"../dialogs/"} class="btn btn-outline-warning">
                    Messages
                </Link>
            </div>
        </div>
    )
}

export default User;
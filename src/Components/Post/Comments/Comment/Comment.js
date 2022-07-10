import React from "react";
import { getUserByID } from "../../../../utils/getter";

const Comment = (props) => {
    const autorData = getUserByID(props.users, props.uid);
    return(
        <div className="Comment">
            <div className="Comment__wrapper">
                <div className="Comment__sender-logo">
                    <img src={autorData.photoURL} alt="sender" />
                </div>
                <div className="Comment__section">
                    <div className="Comment__body">
                        <div className="Comment__sender-name">
                            {autorData.displayName}
                        </div>
                        <div className="Comment__text">
                            {(props.comment) ? props.comment : ""}
                        </div>
                    </div>
                    <div className="Comment__date">
                        {(props.date) ? props.date.toUTCString() : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
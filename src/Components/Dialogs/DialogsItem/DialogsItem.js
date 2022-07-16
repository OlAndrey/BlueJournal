import React from "react";
import dayjs from "dayjs";
import "./DialogsItem.css";
import Calendar from "dayjs/plugin/calendar";
import { Link } from "react-router-dom";

dayjs.extend(Calendar);

const DialogsItem = ({id, sender, lastMessage}) => {
    return (
        <Link to={"/dialog/" + id} className="dialogs__item">
            <div className="dialogs__item-container">
                <div className="block">
                    <img src={sender.photoURL} className="logo" alt="logo" />
                    <div className="data">
                        <div className="name">
                            {sender.displayName}
                        </div>
                        <div className="message">
                            {lastMessage.is === sender.uid ? sender.displayName : "You"}
                            {": " + lastMessage.message}
                        </div>
                    </div>
                </div>
                
                <div className="date">
                    {dayjs(lastMessage.date).calendar(null, {
                        sameDay: "HH:mm",
                        lastDay: "[Yesterday]",
                        lastWeek: "DD MMMM",
                        sameElse: "DD MMMM YYYY",
                    })}
                </div>
            </div>
        </Link>
    )
}

export default DialogsItem;
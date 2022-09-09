import React from "react";
import dayjs from "dayjs";

import "./styles.css";
import { Link } from "react-router-dom";
import { avatarURL } from "../../../images/imagesURL";
import Icon from "../Icon";

const Item = ({ isReverse, messages, me, you, onDeleteMessage, unreadedMessages }) => {
  return (
  <div className={isReverse ?"item reverse removable" :"item"}>
      <Link to={isReverse ?'/profile' :'/profile/' + you.uid}>
        <img 
          src={isReverse 
            ? (me.photoURL ? me.photoURL: avatarURL)
            : you.photoURL
          } 
          className="avatar" 
          alt="Avatar" />
      </Link>
      
      <div className="list">
        {messages.map((item) => (
          <div className="list-item" key={item.id}>{
            item.isDeleted
              ?<div className="text text-deleted">{item.text}</div>
              :<div className={
                  (item.status === "sended" && !isReverse)
                  ?"text unreaded"
                  :"text"
                }
                data-target={item.id}
              >{item.text}</div>
            }
            <div className="time">{dayjs(item.date).format("HH:mm")}</div>
            {
              !item.isDeleted &&
              <Icon
                size={15}
                className="message-status"
                name={
                  item.status === "sended" ? "MessageSended" : "MessageReaded"
                }
              />
            }
            {isReverse && !item.isDeleted &&
            <div onClick={() => onDeleteMessage(item.path, unreadedMessages - 1)}>
              <Icon
                size={16}
                className="remove-message"
                name="MessageDelete"
              />
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};


export default Item;
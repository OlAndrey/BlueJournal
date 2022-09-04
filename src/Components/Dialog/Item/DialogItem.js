import React from "react";
import dayjs from "dayjs";

import "./styles.css";
import { Link } from "react-router-dom";
import { avatarURL } from "../../../images/imagesURL";

const Item = ({ isReverse, messages, me, you }) => {
  return (
  <div className={isReverse ?"item reverse removable" :"item"}>
      <Link to={isReverse ?'../profile' :'../profile/' + you.uid}>
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
          <div className="list-item" key={item.id}>
            <div className="text">{item.text}</div>
            <div className="time">{dayjs(item.date).format("HH:mm")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Item;
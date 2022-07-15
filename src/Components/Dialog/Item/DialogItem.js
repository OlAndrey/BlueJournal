import React from "react";
import dayjs from "dayjs";

import "./styles.css";

const Item = ({ isReverse, messages, avatar, onRemove }) => {
  const onRemoveHandle = (event) => {
    const { id } = event.currentTarget.dataset;
    onRemove(+id);
  };

  return (
  <div className=
    {
      isReverse
      ?"item reverse removable"
      :"item"
    }
    >
      <img src={avatar} className="avatar" alt="Avatar" />
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
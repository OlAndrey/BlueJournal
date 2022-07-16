import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const HeaderDialog = ({name, avatar, id}) => {
  return (
    <div className="dialog__header">
      <Link to={'../profile/' + id} className="user-info">
        <img src={avatar} className="avatar" alt="avatar" />
        <div className="name">{name}</div>
      </Link>
    </div>
  );
};

export default HeaderDialog;
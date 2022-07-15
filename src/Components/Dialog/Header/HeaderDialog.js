import React from "react";
import UserInfo from "./UserInfo/UserInfo";

import "./styles.css";

const HeaderDialog = () => {
  return (
    <div className="dialog__header">
      <UserInfo />
    </div>
  );
};

export default HeaderDialog;
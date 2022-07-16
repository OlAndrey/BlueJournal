import React from "react";

import Item from "./Item/DialogItem";
import Title from "./Title/DialogTitle";

import { normalizeDialog } from "./helpers";

import "./styles.css";

const Dialog = ({ messages, me, you }) => {

  const normalizedDialog = normalizeDialog(messages.messages, me.uid);

  return (
    <div className="dialog">
      <div className="overflow">
        {normalizedDialog.map((item) =>
          item.type === "message" ? (
            <Item {...item} me={me} you={you} key={item.id}  />
          ) : (
            <Title key={item.id} date={item.date} />
          )
        )}
      </div>
    </div>
  );
};

export default Dialog;
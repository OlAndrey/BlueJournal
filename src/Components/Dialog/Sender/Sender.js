import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Sender = ({ onAddMessage, onCreateDialog, dialog, uid, youId }) => {
  const [value, setValue] = useState("");
  let navigate = useNavigate();
  const onChange = (event) => setValue(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if(dialog.lastMessage)
      onAddMessage(dialog.path, value, dialog.unreadedMessages + 1, uid);
    else
      onCreateDialog(value, uid, youId).then(id => navigate("../dialog/" + id, { replace: true }))
    setValue("");
  };

  return (
    <form className="sender" onSubmit={onSubmit}>
      <input
        placeholder="Enter message"
        value={value}
        onChange={onChange}
        required
      />
      
      <button>Send</button>
    </form>
  );
};


export default Sender;
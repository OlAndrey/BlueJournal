import React, { useState } from "react";
import "./styles.css";

const Sender = ({ onAddMessage }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();

    onAddMessage({
      id: Date.now(),
      message: value,
      date: new Date().toISOString(),
      is: "118075614244432219769",
      status: "sended",
    });
    setValue("");
  };

  return (
    <form className="sender" onSubmit={onSubmit}>
      <input
        placeholder="Введите сообщение"
        value={value}
        onChange={onChange}
        required
      />
      <button>Отправить</button>
    </form>
  );
};


export default Sender;
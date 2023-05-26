import React from "react";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import "./styles.css";

dayjs.extend(Calendar);

const Title = ({ date, type }) => (
  <div className="title">
  {
    type === "title"
      ?dayjs(date).calendar(null, {
        sameDay: "[Сегодня]",
        lastWeek: "DD MMMM",
        sameElse: "DD MMMM YYYY",
      })
      :"Unread message"
  }
  </div>
);


export default Title;
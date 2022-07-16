import React from "react";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import "./styles.css";

dayjs.extend(Calendar);

const Title = ({ date }) => (
  <div className="title">
    {dayjs(date).calendar(null, {
      sameDay: "[Today]",
      lastWeek: "DD MMMM",
      sameElse: "DD MMMM YYYY",
    })}
  </div>
);


export default Title;
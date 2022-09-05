import React from "react";
import { Link } from "react-router-dom";
import { avatarURL } from "../../../images/imagesURL";
import Calendar from "dayjs/plugin/calendar";
import "./styles.css";
import dayjs from "dayjs";

dayjs.extend(Calendar);

const HeaderDialog = ({name, avatar, id, lastSeen}) => {
  const threeMinutes = 180000;
  
  return (
    <div className="dialog__header">
      <Link to={'../profile/' + id} className="user-info">
        <img src={avatar ?avatar :avatarURL} className="avatar" alt="avatar" />
        <div className="name-and-status">
          <div className="name">{name}</div>
          <div className="status">
            {
              lastSeen
              ?(lastSeen.toMillis() + threeMinutes < new Date().getTime())
                ?"last seen " + dayjs(lastSeen.toMillis()).calendar(null, {
                    sameDay: '[at] h:mm A', 
                    nextDay: '[tomorrow at] h:mm A'
                  })
                :<><span className="circle-status" />Online</>
              :"last seen recently"
            }
          </div>
        </div> 
      </Link>
    </div>
  );
};

export default HeaderDialog;
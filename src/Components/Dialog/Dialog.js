import React, { useRef, useContext } from "react";

import Item from "./Item/DialogItem";
import Title from "./Title/DialogTitle";

import { normalizeDialog } from "./helpers";

import "./styles.css";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUserByID } from "../../utils/getter";
import PreLoader from "../PreLoader/PreLoader";

const Dialog = ({ newMessage }) => {
  const dialogRef = useRef();
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [users] = useCollectionData(
      firestore.collection('users')
  )
  
  const [messages, loading ] = useCollectionData(
    firestore.collection('dialogs')
  )

  if(loading)
      return <PreLoader />
  
  let me = getUserByID(users, user.uid)
  // const [state, dispatch] = useReducer(reducer, {
  //   messages: data,
  // });

  // useEffect(() => {
  //   if (newMessage) {
  //     dispatch({
  //       type: "add-message",
  //       payload: newMessage,
  //     });

  //   }
  // }, [newMessage]);

  // const onRemove = (id) => {
  //   dispatch({
  //     type: "remove-message",
  //     payload: id,
  //   });
  // };

  console.log(messages)
  const normalizedDialog = normalizeDialog(messages[0].message, user.uid);
  console.log(normalizedDialog)

  return (
    <div className="dialog">
      <div className="overflow" ref={dialogRef}>
        {console.log(normalizedDialog)}
        {normalizedDialog.map((item) =>
          item.type === "message" ? (
            <Item {...item} avatar={me.photoURL} key={item.id}  />
          ) : (
            <Title key={item.id} date={item.date} />
          )
        )}
      </div>
    </div>
  );
};

export default Dialog;
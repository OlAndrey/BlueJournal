import { useContext } from "react";
import { Context } from "../../index";
import { addMessage, createDialog } from "../../API/FirestoreRequests";
import Dialog from "./Dialog";
import HeaderDialog from "./Header/HeaderDialog";
import Sender from "./Sender/Sender";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PreLoader from "../PreLoader/PreLoader";
import { getUserByID } from "../../utils/getter";
import { Link, useParams } from "react-router-dom";


const DialogIndex = () => {
    let params = useParams();
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

    let me = getUserByID(users, user.uid);
    let you = getUserByID(users, params.id);
    let selectMessages = messages.filter(item => item.id == params.id && item.between.includes(user.uid))[0];
    
    if(!selectMessages){
        if(you){
            selectMessages = {
                between: [
                    me.uid, you.uid
                ],
                messages: [],
                path: "dialogs"
            }
        }
        else
            return <div className="dialogs"><div className="h-75 d-flex justify-content-center">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <h3>Dialog not found!!!</h3>
                            <Link to={"/dialogs"} className="btn btn-primary text-center">Go to Dialogs</Link>
                        </div>
                    </div></div>
    }
    if(!you)
        you = getUserByID(users, selectMessages.between.filter(i => i !== user.uid)[0])
    
    return (
        <div className="dialogs">
            <div className="dialogs__container">
                <HeaderDialog name={you.displayName} id={you.uid} avatar={you.photoURL} />
                <Dialog messages={selectMessages} me={me} you={you} />
                <Sender messages={selectMessages.messages} path={selectMessages.path} onCreateDialog={createDialog} onAddMessage={addMessage} uid={user.uid} youId={you.uid} />
            </div>
        </div>
    );
};

export default DialogIndex;
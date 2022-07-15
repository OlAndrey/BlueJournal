import Dialog from "./Dialog";
import HeaderDialog from "./Header/HeaderDialog";
import Sender from "./Sender/Sender";


const DialogIndex = () => {
  return (
    <div className="dialogs">
        <div className="dialogs__container">
            <HeaderDialog />
            <Dialog />
            <Sender />
        </div>
    </div>
  );
};

export default DialogIndex;
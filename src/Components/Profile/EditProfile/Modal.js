import React from "react";

const Modal = ({ handleClose, handleSubmit, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

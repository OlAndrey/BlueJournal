import React from "react";
import "./PreLoader.css";

const PreLoader = (props) => {
    return(
        <div className="d-flex justify-content-center flex-grow-1">
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default PreLoader;
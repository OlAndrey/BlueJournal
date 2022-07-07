import React from "react";
import "./PreLoader.css";

const PreLoader = (props) => {
    return(
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default PreLoader;
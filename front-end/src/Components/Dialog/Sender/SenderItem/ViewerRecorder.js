import React from "react";
import Icon from "../../Icon";

const formatMinutes = (minutes) => {
    return minutes < 10 ? `0${minutes}` : minutes;
}

const formatSeconds = (seconds) => {
    return seconds < 10 ? `0${seconds}` : seconds;
}

const ViewerRecorded = ({ recorderState, cancelRecording }) => {
    const { recordingMinutes, recordingSeconds, initRecording } = recorderState;

    return (
    <div className="recorder-display">
        <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" onClick={cancelRecording}>
              <Icon size={30} name={'Cancel'} />
            </button>
          </div>
        )}
      </div> 
    )
}

export default ViewerRecorded
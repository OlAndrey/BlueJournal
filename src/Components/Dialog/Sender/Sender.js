import React, { useEffect, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import './styles.css'
import Icon from '../Icon'
import useRecorder from '../../../hooks/useRecording'
import ViewerAttachFiles from './SenderItem/ViewerAttach'
import ViewerRecorded from './SenderItem/ViewerRecorder'

const Sender = ({ submitForm, uploadImage }) => {
  const { recorderState, ...handlers } = useRecorder()
  const { audio, recordingSeconds, initRecording } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])

  useEffect(() => {
    if(audio){
      var reader = new window.FileReader();
      reader.readAsDataURL(audio[0]); 
      reader.onload = function(){
        uploadImage(reader.result)
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio])

  const changeFile = (e) => {
    const newFiles = e.target.form[1].files
    const testInsertFiles = []
    for (let index = 0; index < newFiles.length; index++) {
      const file = newFiles[index]
      if (!files.find((item) => item.name === file.name))
        testInsertFiles.push(file)
    }
    setFiles([...files, ...testInsertFiles])
  }

  const onChange = (text) => setText(text)
  const onSubmit = (event) => {
    event.preventDefault()
    submitForm(files, text)
    setText('')
    setFiles([])
  }

  return (
    <div className="prog">
      {files.length ? (
        <ViewerAttachFiles files={files} setFiles={setFiles} />
      ) : (
        ''
      )}

      {initRecording ? (
        <ViewerRecorded
          recorderState={recorderState}
          cancelRecording={cancelRecording}
        />
      ) : (
        ''
      )}

      <form className="sender" onSubmit={onSubmit}>
        <InputEmoji
          placeholder="Enter message"
          value={text}
          onChange={onChange}
        />

        <label>
          <input
            accept="video/*, image/*"
            name="media"
            type="file"
            multiple="multiple"
            onChange={changeFile}
          />

          <Icon size={30} name={'Attach'} />
        </label>

        {initRecording ? (
          <button
            className="mx-2"
            type="button"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <Icon size={30} name={'Send'} />
          </button>
        ) : (
          <button type="button" className="mx-2" onClick={startRecording}>
            <Icon size={30} name={'Microphone'} />
          </button>
        )}
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Sender

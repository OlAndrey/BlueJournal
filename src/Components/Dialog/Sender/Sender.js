import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputEmoji from 'react-input-emoji'
import './styles.css'
import Icon from '../Icon'

const Sender = ({ onAddMessage, onCreateDialog, dialog, uid, youId }) => {
  const [text, setText] = useState('')
  const [file, setFile] = useState([])
  let navigate = useNavigate()

  function changeFile(e) {
    for (let i = 0; i < e.target.form[1].files.length; i++) {
      const element = e.target.form[1].files[i]

      var reader = new FileReader()
      reader.readAsDataURL(element)
      reader.onload = function () {
        setFile([...file, reader.result])
      }
    }
  }

  const onChange = (text) => setText(text)
  const onSubmit = (event) => {
    event.preventDefault()
    if (text.trim() !== 0) {
      if (dialog.lastMessage)
        onAddMessage(dialog.path, text, dialog.unreadedMessages + 1, uid)
      else
        onCreateDialog(text, uid, youId).then((id) =>
          navigate('../dialog/' + id, { replace: true })
        )
      setText('')
    }
  }

  return (
    <div>
      {file.length
        ? file.map((media, i) => (
            <div key={i} className="progress prog-img">
              <img alt={'select photo ' + i} src={media} />
              <div className="progress-bar" role="progressbar" />
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setFile(file.filter((item, ind) => ind !== i))}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ))
        : ''}
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
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Sender

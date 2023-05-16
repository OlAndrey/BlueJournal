import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputEmoji from 'react-input-emoji'
import './styles.css'

const Sender = ({ onAddMessage, onCreateDialog, dialog, uid, youId }) => {
  const [text, setText] = useState('')
  let navigate = useNavigate()

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
    <form className="sender" onSubmit={onSubmit}>
      <InputEmoji
        placeholder="Enter message"
        value={text}
        onChange={onChange}
      />

      <button type="submit">Send</button>
    </form>
  )
}

export default Sender

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputEmoji from 'react-input-emoji'
import './styles.css'
import Icon from '../Icon'

const Sender = ({ onAddMessage, onCreateDialog, dialog, uid, youId, uploadImage }) => {
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  let navigate = useNavigate()

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const path = `message/${Date.now()}-${file.name}`
      var fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = () => {
        resolve({
          path,
          type: file.type,
          result: fr.result
        })
      }
      fr.onerror = reject
    })
  }

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
  const onSubmit = async (event) => {
    event.preventDefault()
    if (files.length) {
      const resultArr = await Promise.all(files.map((item) => readFile(item)))

      const data = await Promise.allSettled(
        resultArr.map((item) => uploadImage(item.path, item.result))
      )

      const filesSrc = data
          .filter(item => item.status === "fulfilled")
          .map((item, index) => ({
            type: resultArr[index].type,
            src: item.value
          }))

      if (dialog.lastMessage)
        onAddMessage(dialog.path, text, dialog.unreadedMessages + 1, uid, filesSrc)
      else
        onCreateDialog(text, uid, youId, filesSrc).then((id) =>
          navigate('../dialog/' + id, { replace: true })
        )
      setText('')
      setFiles([])
    } else if (text.trim() !== 0) {
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
      {files.length
        ? files.map((media, i) => {
            if (!media.type.includes('video')) {
              let reader = new FileReader()
              reader.readAsDataURL(media)
              reader.onload = function () {
                document.querySelector('#attach-img-' + i).src = reader.result
              }
            }
            return (
              <div key={i} className="progress prog-img">
                <img
                  id={'attach-img-' + i}
                  alt={media.name}
                  src={
                    media.type.includes('video')
                      ? 'https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/video-icon.svg?alt=media&token=6200ed4e-efa4-4316-b681-35358fda89b0'
                      : ''
                  }
                />
                <div className="progress-bar" role="progressbar" />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() =>
                    setFiles(files.filter((item, ind) => ind !== i))
                  }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          })
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

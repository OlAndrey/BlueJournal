import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sender from './Sender'

const SenderContainer = ({ onAddMessage, onCreateDialog, dialog, uid, youId, uploadImage }) => {
  let navigate = useNavigate()

  const readFile = (file) => {
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

  const onSubmit = async (files, text) => {
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
    } else if (text.trim() !== 0) {
      if (dialog.lastMessage)
        onAddMessage(dialog.path, text, dialog.unreadedMessages + 1, uid)
      else
        onCreateDialog(text, uid, youId).then((id) =>
          navigate('../dialog/' + id, { replace: true })
        )
    }
  }

  return  <Sender submitForm={onSubmit} />
}

export default SenderContainer

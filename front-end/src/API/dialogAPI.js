import 'firebase/compat/database'
import 'firebase/compat/app'
import firestore from '../firebase'

const createDialog = async (data) => {
  const { message, userId, otherId, files = null, audioSrc = null } = data
  const id = Date.now()

  const newDialogData = await firestore.collection('dialogs').add({
    id: id,
    between: [userId, otherId],
    lastMessage: {
      id: id + 1,
      message: message || 'File attached',
      date: new Date().toISOString(),
      is: userId,
      status: 'sended'
    },
    unreadedMessages: 0
  })

  await firestore.doc(newDialogData.path).update({
    path: newDialogData.path
  })

  const newMessageData = await firestore
    .collection(newDialogData.path + '/messages')
    .add({
      id: Date.now(),
      message: message,
      date: new Date().toISOString(),
      src: files,
      status: 'sended',
      audioSrc,
      is: userId
    })

  await firestore.doc(newMessageData.path).update({
    path: newMessageData.path
  })

  return id
}

const addMessage = async (data) => {
  const { path, message, num, userId, files = null, audioSrc = null } = data

  const newMessageData = await firestore.collection(path + '/message').add({})

  await firestore.doc(newMessageData.path).update({
    id: Date.now(),
    message: message,
    date: new Date().toISOString(),
    src: files,
    status: 'sended',
    audioSrc,
    is: userId,
    path: newMessageData.path
  })

  await firestore.doc(path).update({
    lastMessage: {
      id: Date.now(),
      message: message || 'File attached',
      date: new Date().toISOString(),
      status: 'sended',
      is: userId
    },
    unreadedMessages: num
  })
}

const updateMessageStatus = (path) => {
  try {
    firestore.doc(path).update({
      status: 'readed'
    })
    firestore.doc(path.split('/').slice(0, 2).join('/')).update({
      unreadedMessages: 0
    })
  } catch (e) {
    console.error(e)
  }
}

const deleteMessage = (path, num) => {
  firestore.doc(path).update({
    message: 'Message deleted',
    isDeleted: true
  })
  firestore.doc(path.split('/').slice(0, 2).join('/')).update({
    unreadedMessages: num
  })
}

export { createDialog, addMessage, updateMessageStatus, deleteMessage }

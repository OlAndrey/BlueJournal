import 'firebase/compat/database'
import 'firebase/compat/app'
import firestore from '../firebase'
import firebase from 'firebase/compat/app'

const addNewPost = async (newPost, uid) => {
  try {
    let url = null
    const response = await firestore.collection('post').add({
      postId: Date.now(),
      userId: uid,
      postText: newPost,
      src: null,
      commentCount: 0,
      whoLikes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    await firestore.doc(response.path).update({
      path: response.path
    })
    url = response.path
    return url
  } catch (error) {
    console.error(error)
  }
}

const addPhotoUrlForNewPost = (path, url) => {
  try {
    firestore.doc(path).update({
      src: url
    })
  } catch (error) {
    console.error(error)
  }
}

const likesTogglePost = (path, whoLikes, meLikes, myId) => {
  try {
    if (!meLikes) {
      firestore.doc(path).update({
        whoLikes: [...whoLikes, myId]
      })
    } else {
      firestore.doc(path).update({
        whoLikes: whoLikes.filter((id) => id !== myId)
      })
    }
  } catch (error) {
    console.error(error)
  }
}

const updatesCommentCount = (path, commentCount) => {
  try {
    firestore.doc(path).update({
      commentCount
    })
  } catch (error) {
    console.error(error)
  }
}

const addNewComment = (path, comment, uid) => {
  try {
    firestore.collection(path).add({
      commentId: Date.now(),
      userId: uid,
      comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    console.error(error)
  }
}

const deletePost = (path) => {
  try {
    firestore.doc(path).delete()
  } catch (error) {
    console.error(error)
  }
}

export {
  addNewPost,
  addPhotoUrlForNewPost,
  likesTogglePost,
  updatesCommentCount,
  addNewComment,
  deletePost
}

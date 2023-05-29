import 'firebase/compat/database'
import 'firebase/compat/app'
import firestore from '../firebase'
import firebase from 'firebase/compat/app'

const addNewUser = (userData, userName = userData.providerData[0].displayName) => {
  firestore
    .collection('users')
    .add({
      ...userData.providerData[0],
      Follow: [userData.uid],
      displayName: userName,
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/R.jpg?alt=media&token=e1af4323-3e04-44ec-90cc-56eeaa43494e',
      wallpaperUrl: null,
      lastOnlineDate: firebase.firestore.FieldValue.serverTimestamp(),
      uid: userData.uid
    })
    .then((response) =>
      firestore.doc(response.path).update({
        path: response.path
      })
    )
    .catch((e) => console.error(e))
}

const updateLastOnlineDate = (path) => {
  try {
    firestore.doc(path).update({
      lastOnlineDate: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    console.error(error)
  }
}

const updateUrlImageLogo = (path, url) => {
  try {
    firestore.doc(path).update({
      photoURL: url
    })
  } catch (error) {
    console.error(error)
  }
}

const updateUrlImageWallpaper = (path, url) => {
  try {
    firestore.doc(path).update({
      wallpaperUrl: url
    })
  } catch (error) {
    console.error(error)
  }
}

const Follow = (path, Follow, id) => {
  try {
    firestore.doc(path).update({
      Follow: [...Follow, id]
    })
  } catch (error) {
    console.error(error)
  }
}
const unFollow = (path, Follow, id) => {
  try {
    firestore.doc(path).update({
      Follow: Follow.filter((uid) => uid !== id)
    })
  } catch (error) {
    console.error(error)
  }
}

export {
  addNewUser,
  updateLastOnlineDate,
  updateUrlImageLogo,
  updateUrlImageWallpaper,
  Follow,
  unFollow
}

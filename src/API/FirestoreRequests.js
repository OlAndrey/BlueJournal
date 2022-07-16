import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage"; 

const addNewPost = async (newPost, uid) => {
    let url = null;
    const resolve = await firestore.collection('post').add({
        postId: Date.now(),
        userId: uid,
        postText: newPost,
        src: null,
        likesCount: 0,
        commentCount: 0,
        returnCount: 0,
        iLiked: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(response => {
        firestore.doc(response.path).update({
            path: response.path
        })
        url = response.path;
    })
    return url
}

const addPhotoUrlForNewPost = (path, url) => {
    return firestore.doc(path).update({
        src: url,
    });
}

const likesTogglePost = (path, likesCount, iLiked) => {
    if(!iLiked){
        firestore.doc(path).update({
            likesCount: likesCount + 1,
            iLiked: true
        })
    }else{
        firestore.doc(path).update({
            likesCount: likesCount - 1,
            iLiked: false
        })
    }
}

const updatesCommentCount = (path, commentCount) => {
    firestore.doc(path).update({
        commentCount,
    })
}

const addNewComment = (path, comment, uid) => {
    firestore.collection(path).add({
        commentId: Date.now(),
        userId: uid,
        comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

const addNewUser = (userData) => {
    firestore.collection("users").add({
        ...userData
    }).then(response => firestore.doc(response.path).update({
        path: response.path
    }))
}

const updateUrlImageLogo = (path, url) => {
    firestore.doc(path).update({
        photoURL: url,
    })
}

const updateUrlImageWallpaper = (path, url) => {
    firestore.doc(path).update({
        wallpaperUrl: url,
    })
}

const Follow = (path, Follow, id) => {
    firestore.doc(path).update({
        Follow: [...Follow, id],
    })
}
const unFollow = (path, Follow, id) => {
    firestore.doc(path).update({
        Follow: Follow.filter((uid) => uid !== id),
    })
}

const uploadImage = (path, file) => {
    const storage = getStorage()
    const reference = ref(storage, path)
   
    return uploadString(reference, file, 'data_url')
       .then(snapshot => {
         return getDownloadURL(snapshot.ref)
       }).catch(error =>{
         console.log(error)
       })
}

const createDialog = async (message, meId, youId) => {
    const id = Date.now();
    await firestore.collection("dialogs").add({
        id: id,
        between: [
            meId, youId
        ],
        messages: [{
            id: id + 1,
            message: message,
            date: new Date().toISOString(),
            is: meId,
        }],
        lastMessage: {
            id: id + 1,
            message: message,
            date: new Date().toISOString(),
            is: meId,
        },
    }).then(response => {
        firestore.doc(response.path).update({
            path: response.path
        })
    })
    return id;
}

const addMessage = (path, messages, message, uid) => {
    firestore.doc(path).update({
        messages: messages.concat({
            id: Date.now(),
            message: message,
            date: new Date().toISOString(),
            is: uid,
        }),
        lastMessage: {
            id: Date.now(),
            message: message,
            date: new Date().toISOString(),
            is: uid,
        },
    })
}



export { likesTogglePost, addNewPost, addPhotoUrlForNewPost, addNewComment,
    updatesCommentCount, addNewUser, uploadImage, updateUrlImageWallpaper,
     updateUrlImageLogo, Follow, unFollow, addMessage, createDialog }
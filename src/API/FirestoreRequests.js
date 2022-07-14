import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage"; 

const addNewPost = async (posts, newPost, uid) => {
    let url = null;
    const resolve = await firestore.collection('post').add({
        postId: posts[posts.length - 1].postId + 1,
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

const addNewComment = (path, comment, commentId, uid) => {
    firestore.collection(path).add({
        commentId,
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

export { likesTogglePost, addNewPost, addPhotoUrlForNewPost, addNewComment, updatesCommentCount, addNewUser, uploadImage, updateUrlImageWallpaper, updateUrlImageLogo }
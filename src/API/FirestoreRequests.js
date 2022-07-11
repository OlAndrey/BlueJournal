import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage"; 

const addNewPost = (posts, newPost, uid) => {
    return firestore.collection('post').add({
        postId: posts[posts.length - 1].postId + 1,
        userId: uid,
        postText: newPost,
        src: null,
        likesCount: 0,
        commentCount: 0,
        returnCount: 0,
        iLiked: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

const addPhotoUrlForNewPost = (path, url) => {
    return firestore.doc(path).update({
        src: url,
    });
}

const likesTogglePost = (date) => {
    if(!date.iLiked){
        firestore.collection('post').doc(date.id).update({
            likesCount: date.likesCount + 1,
            iLiked: true
        })
    }else{
        firestore.collection('post').doc(date.id).update({
            likesCount: date.likesCount - 1,
            iLiked: false
        })
    }
}

const updatesCommentCount = (path, commentCount) => {
    firestore.collection('post').doc(path).update({
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
    });
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

export { likesTogglePost, addNewPost, addPhotoUrlForNewPost, addNewComment, updatesCommentCount, addNewUser, uploadImage }
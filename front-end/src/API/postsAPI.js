import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';

const addNewPost = async (newPost, uid) => {
    let url = null;
    const resolve = await firestore.collection('post').add({
        postId: Date.now(),
        userId: uid,
        postText: newPost,
        src: null,
        commentCount: 0,
        whoLikes: [],
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

const likesTogglePost = (path, whoLikes, meLikes, myId) => {
    if(!meLikes){
        firestore.doc(path).update({
            whoLikes: [...whoLikes, myId]
        })
    }else{
        firestore.doc(path).update({
            whoLikes: whoLikes.filter(id => id !== myId)
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

const deletePost = (path) => {
    firestore.doc(path).delete()
}

export { addNewPost, addPhotoUrlForNewPost, likesTogglePost, updatesCommentCount, addNewComment, deletePost}
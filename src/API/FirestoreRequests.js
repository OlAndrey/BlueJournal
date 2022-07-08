import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';

const addNewPost = (posts, newPost) => {
    firestore.collection('post').add({
        postId: posts[posts.length - 1].postId + 1,
        userId: 1049,
        postText: newPost,
        likesCount: 0,
        commentCount: 0,
        returnCount: 0,
        iLiked: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
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

const addNewComment = (path, comment) => {
    firestore.collection(path).add({
        userId: 1049,
        comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}



export { likesTogglePost, addNewPost, addNewComment, updatesCommentCount }
import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';
import firebase from 'firebase/compat/app';

const addNewPost = (post, value) => {
    firestore.collection('post').add({
        postId: post[post.length - 1].postId + 1,
        userId: 1049,
        postText: value,
        likesCount: 0,
        comentCount: 0,
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



export { likesTogglePost, addNewPost }
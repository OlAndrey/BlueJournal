import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';

const createDialog = async (message, meId, youId) => {
    const id = Date.now();
    await firestore.collection("dialogs").add({
        id: id,
        between: [
            meId, youId
        ],
        lastMessage: {
            id: id + 1,
            message: message,
            date: new Date().toISOString(),
            is: meId,
            status: "sended",
        },
    }).then(response => {
        firestore.doc(response.path).update({
            path: response.path
        })
        firestore.collection(response.path + "/messages").add({
            id: Date.now(),
            message: message,
            date: new Date().toISOString(),
            status: "sended",
            is: meId,
        }).then(resp => {
            firestore.doc(resp.path).update({
                path: resp.path
            })
        })
    })
    return id;
}

const addMessage = (path, message, uid) => {
    firestore.collection(path + "/message")
        .add({})
        .then(response => {
            firestore.doc(response.path).update({
                id: Date.now(),
                message: message,
                date: new Date().toISOString(),
                status: "sended",
                is: uid,
                path: response.path
            })
            firestore.doc(path).update({
                lastMessage: {
                    id: Date.now(),
                    message: message,
                    date: new Date().toISOString(),
                    status: "sended",
                    is: uid,
                }
            })
    })
}

const updateMessageStatus = (path) => {
    try{
        firestore.doc(path).update({
            status: "readed",
        })
    }
    catch(e){
        console.error(e)
    } 
}

const deleteMessage = (path) => {
    firestore.doc(path).update({
        message: "Message deleted",
        isDeleted: true
    })
}

export { createDialog, addMessage, updateMessageStatus, deleteMessage}
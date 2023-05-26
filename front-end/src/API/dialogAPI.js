import 'firebase/compat/database';
import 'firebase/compat/app';
import firestore from '../firebase';

const createDialog = async (message, meId, youId, files = null, audioSrc = null) => {
    const id = Date.now();
    await firestore.collection("dialogs").add({
        id: id,
        between: [
            meId, youId
        ],
        lastMessage: {
            id: id + 1,
            message: message || 'File attached',
            date: new Date().toISOString(),
            is: meId,
            status: "sended",
        },
        unreadedMessages: 0
    }).then(response => {
        firestore.doc(response.path).update({
            path: response.path
        })
        firestore.collection(response.path + "/messages").add({
            id: Date.now(),
            message: message,
            date: new Date().toISOString(),
            src: files,
            status: "sended",
            audioSrc,
            is: meId,
        }).then(resp => {
            firestore.doc(resp.path).update({
                path: resp.path
            })
        })
    })
    return id;
}

const addMessage = (path, message, num, uid, files = null, audioSrc = null) => {
    firestore.collection(path + "/message")
        .add({})
        .then(response => {
            firestore.doc(response.path).update({
                id: Date.now(),
                message: message,
                date: new Date().toISOString(),
                src: files,
                status: "sended",
                audioSrc,
                is: uid,
                path: response.path
            })
            firestore.doc(path).update({
                lastMessage: {
                    id: Date.now(),
                    message: message || 'File attached',
                    date: new Date().toISOString(),
                    status: "sended",
                    is: uid,
                },
                unreadedMessages: num
            })
    })
}

const updateMessageStatus = (path) => {
    try{
        firestore.doc(path).update({
            status: "readed",
        })
        firestore.doc(path.split('/').slice(0, 2).join('/')).update({
            unreadedMessages: 0
        })
    }
    catch(e){
        console.error(e)
    } 
}

const deleteMessage = (path, num) => {
    firestore.doc(path).update({
        message: "Message deleted",
        isDeleted: true
    })
    firestore.doc(path.split('/').slice(0, 2).join('/')).update({
        unreadedMessages: num
    })
}

export { createDialog, addMessage, updateMessageStatus, deleteMessage}
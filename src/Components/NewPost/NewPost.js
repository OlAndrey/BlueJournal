import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "./NewPost.css";
import image from "../../cats1.jpg";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from 'firebase/compat/app';
import PreLoader from "../PreLoader/PreLoader";

const NewPost = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("createdAt")
    )

    const createNewPost = () => {
        debugger
        firestore.collection('post').add({
            userId: 1049,
            postText: value,
            likesCount: 0,
            comentCount: 0,
            returnCount: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    if(loading){
        return <PreLoader />
    }

    return (
        <div className="new-post">
            <div className="new-post__form">
                <img className="new-post__image" src={image} alt="img" />
                <input 
                    type="text" 
                    placeholder="Who, news?"
                    onChange={(e) => setValue(e.target.value)} />
                <button onClick={createNewPost}>Add post</button>
            </div>
            <div className="new-post__block">
                <div className="new-post__multimedia">
                    Photo/Video
                </div>
                <div className="new-post__action">
                    Action
                </div>
            </div>
        </div>
    )
}

export default NewPost;
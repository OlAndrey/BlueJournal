import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "./NewPost.css";
import image from "../../cats1.jpg";
import {useCollectionData} from "react-firebase-hooks/firestore";
import PreLoader from "../PreLoader/PreLoader";
import { addNewPost } from "../../API/FirestoreRequests";

const NewPost = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("postId")
    )

    const createNewPost = () => {
        if(value !== ''){
            addNewPost(post, value)
            setValue('')
        }
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
                    value={value}
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
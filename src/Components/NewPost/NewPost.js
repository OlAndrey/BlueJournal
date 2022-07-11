import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "./NewPost.css";
import image from "../../cats1.jpg";
import {useCollectionData} from "react-firebase-hooks/firestore";
import PreLoader from "../PreLoader/PreLoader";
import { addNewPost, addPhotoUrlForNewPost, uploadImage } from "../../API/FirestoreRequests";
import { useAuthState } from "react-firebase-hooks/auth";

const NewPost = (props) => {
    const {firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const [file, setFile] = useState(0);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("postId")
    )
    
    const createNewPost = () => {
        if(value !== ''){
            addNewPost(post, value, user.uid).then(response =>{
                if(file){
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        uploadImage(response.path, reader.result).then(url => {
                            addPhotoUrlForNewPost(response.path, url)
                        }) 
                    };
                    
                    reader.onerror = function() {
                        console.log(reader.error);
                    };
                }
            })
            setValue('')
        }
    }

    if(loading){
        return <PreLoader />
    }

    return (
        <div className="new-post">
            <div className="new-post__form">
                <img className="new-post__image" src={user.photoURL} alt="img" />
                <input 
                    type="text" 
                    placeholder="Who, news?"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
                <button onClick={createNewPost}>Add post</button>
            </div>
            <div className="new-post__block">
                <div className="new-post__multimedia">
                    <form>
                        <label>
                            <input
                                accept="image/*"
                                name="customFile"
                                type="file"
                                onChange={(e) => setFile(e.target.form[0].files[0])}
                            />
                            Add Image
                        </label>
                    </form>
                </div>
                    {file 
                    ? <div className="new-post__img-data">
                        <img className="new-post__check" src="https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/Check_green_icon.svg.png?alt=media&token=56785392-f9f1-4f49-9f70-1c0e0dc170da" />
                        {file.name}
                    </div>
                    : <div>Not image</div>}
            </div>
        </div>
    )
}

export default NewPost;
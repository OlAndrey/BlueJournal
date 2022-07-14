import React, { useContext, useState } from "react";
import { Context } from "../../index";
import "./NewPost.css";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import PreLoader from "../PreLoader/PreLoader";
import { addNewPost, addPhotoUrlForNewPost, uploadImage } from "../../API/FirestoreRequests";
import { useAuthState } from "react-firebase-hooks/auth";

const NewPost = (props) => {
    const {database, firestore} = useContext(Context);
    const [value, setValue] = useState('');
    const [file, setFile] = useState(0);
    const [logooUrl, setLogoUrl] = useState(null);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [post, loading] = useCollectionData(
        firestore.collection('post').orderBy("postId")
    )
    getDownloadURL(ref(database, `images/logo/${user.uid}`))
        .then((url) => {setLogoUrl(url)})
    
    const createNewPost = () => {
        if(value !== ''){
            addNewPost(post, value, user.uid).then(path =>{
                if(file){
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        uploadImage(path, reader.result).then(url => {
                            addPhotoUrlForNewPost(path, url)
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
                <div className="input-group new-post__image">
                    <img id="new-post__image" src={logooUrl ?logooUrl :user.photoURL} alt="img" />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Who, news?" 
                        aria-describedby="basic-addon1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-primary h-100" type="button" onClick={createNewPost}>Add post</button>
                    </div>
                </div>
            </div>
            <div className="row new-post__block">
                <div className="new-post__multimedia col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3">
                    <form>
                        <label>
                            <input
                                accept="image/*"
                                name="customFile"
                                type="file"
                                onChange={(e) => setFile(e.target.form[0].files[0])}
                            />
                            Choose Image
                        </label>
                    </form>
                </div>
                {file 
                ? <div className="new-post__img-data col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3">
                    <img className="new-post__check" src="https://firebasestorage.googleapis.com/v0/b/network-bd4d1.appspot.com/o/Check_green_icon.svg.png?alt=media&token=56785392-f9f1-4f49-9f70-1c0e0dc170da" />
                    {file.name}
                </div>
                : <div className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-3 ">Not image</div>}
            </div>
        </div>
    )
}

export default NewPost;
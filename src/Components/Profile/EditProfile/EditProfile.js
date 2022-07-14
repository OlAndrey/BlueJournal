import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../index";
import { updateUrlImageLogo, updateUrlImageWallpaper, uploadImage } from "../../../API/FirestoreRequests";
import Modal from "./Modal";

import "./styles.css";
import { getUserByID } from "../../../utils/getter";

const EditProfile = (props) => {
    const {firestore} = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [fileLogo, setFileLogo] = useState(0);
    const [fileWallpaper, setFileWallpaper] = useState(0);
    const [modal, setModal] = useState(false);
    const refAvatar = useRef();
    const refWallpaper = useRef();

    useEffect(() => {
        let usersRef = firestore.collection('users')
        usersRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setUsersData(data)
            });
    }, [])

    const handleSubmit = () => {
        const user = getUserByID(usersData, props.user.uid);
        if(fileLogo){
            let reader = new FileReader();
            reader.readAsDataURL(fileLogo);
            reader.onload = function() {
                uploadImage(`images/logo/${props.user.uid}`, reader.result).then(url => {
                    updateUrlImageLogo (`users/${user.id}`, url)
                }) 
            };
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
        if(fileWallpaper){
            let reader = new FileReader();
            reader.readAsDataURL(fileWallpaper);
            reader.onload = function() {
                uploadImage(`images/wallpaper/${props.user.uid}`, reader.result).then(url => {
                    updateUrlImageWallpaper(`users/${user.id}`, url)
                }) 
            };
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
        modalClose();
    }


    const modalClose = () => {
        refAvatar.current.value = '';
        refWallpaper.current.value = '';
        setFileLogo(0);
        setFileWallpaper(0);
        setModal(false);
    }

    return (
        <div>
            <a href="javascript:;" onClick={() => setModal(true)} className="profile__edit">
                Edit profile
            </a>
            <Modal show={modal} handleClose={modalClose} handleSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={modalClose}>&times;</span>
                    </button>
                </div>
                <form className="form-group">
                    <label>Choise Avatar Image:</label>
                    <input
                        type="file"
                        name="File-logo"
                        ref={refAvatar}
                        onChange={e => setFileLogo(e.target.form[0].files[0])}
                        className="form-control"
                    />
                    <label>Choise Wallpaper Image:</label>
                    <input
                        type="file"
                        name="File-wallpaper"
                        ref={refWallpaper}
                        onChange={e => setFileWallpaper(e.target.form[1].files[0])}
                        className="form-control"
                    />
                </form>
            </Modal>
        </div>
    );
}

export default EditProfile;


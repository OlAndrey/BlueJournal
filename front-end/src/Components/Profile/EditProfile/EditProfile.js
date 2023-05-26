import React, { useContext, useRef, useState } from 'react'
import { Context } from '../../../index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button, Modal } from 'react-bootstrap'
import {
  updateUrlImageLogo,
  updateUrlImageWallpaper
} from '../../../API/userApi'
import { uploadImage } from '../../../API/FirestoreRequests'
import { getUserByID } from '../../../utils/getter'

const EditProfile = (props) => {
  const { firestore } = useContext(Context)
  const [fileLogo, setFileLogo] = useState(0)
  const [fileWallpaper, setFileWallpaper] = useState(0)
  const refAvatar = useRef()
  const refWallpaper = useRef()
  const [modal, setModal] = useState(false)
  const [users] = useCollectionData(firestore.collection('users'))

  const changeFile = (path, file, user, callback) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      uploadImage(path, reader.result).then((url) => {
        callback(user.path, url)
      })
    }
    reader.onerror = function () {
      console.log(reader.error)
    }
  }

  const handleSubmit = () => {
    const user = getUserByID(users, props.user.uid)
    if (fileLogo) {
      const path = `images/logo/${props.user.uid}`
      changeFile(path, fileLogo, user, updateUrlImageLogo)
    }
    if (fileWallpaper) {
      const path = `images/wallpaper/${props.user.uid}`
      changeFile(path, fileWallpaper, user, updateUrlImageWallpaper)
    }
    modalClose()
  }

  const modalClose = () => {
    refAvatar.current.value = ''
    refWallpaper.current.value = ''
    setFileLogo(0)
    setFileWallpaper(0)
    setModal(false)
  }

  return (
    <div>
      <div onClick={() => setModal(true)} className="profile__edit">
        Edit profile
      </div>
      <Modal show={modal} onHide={() => setModal(false)} size="lg" centered>
        <Modal.Header closeButton>Edit Profile</Modal.Header>
        <Modal.Body>
          <form className="form-group">
            <label className="d-block text-center">Choise Avatar Image:</label>
            <input
              type="file"
              accept="image/*"
              name="File-logo"
              ref={refAvatar}
              onChange={(e) => setFileLogo(e.target.form[0].files[0])}
              className="form-control mb-4"
            />
            <label className="d-block text-center">Choise Wallpaper Image:</label>
            <input
              type="file"
              accept="image/*"
              name="File-wallpaper"
              ref={refWallpaper}
              onChange={(e) => setFileWallpaper(e.target.form[1].files[0])}
              className="form-control mb-4"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProfile

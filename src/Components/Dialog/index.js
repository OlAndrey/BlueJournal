import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../../index'
import Dialog from './Dialog'
import HeaderDialog from './Header/HeaderDialog'
import SenderContainer from './Sender/SenderContainer'
import PreLoader from '../PreLoader/PreLoader'
import { getUserByID } from '../../utils/getter'
import { addMessage, createDialog } from '../../API/dialogAPI'
import { uploadImage } from '../../API/FirestoreRequests'

const DialogIndex = () => {
  let params = useParams()
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [users] = useCollectionData(firestore.collection('users'))
  const [messages, loading] = useCollectionData(firestore.collection('dialogs'))

  if (loading) return <PreLoader />

  let me = getUserByID(users, user.uid)
  let you = getUserByID(users, params.id)
  let selectDialog = messages.find(item => item.id == params.id && item.between.includes(user.uid))

  if (!selectDialog) {
    if (you) {
      selectDialog = {
        between: [me.uid, you.uid],
        messages: [],
        unreadedMessages: 0,
        path: 'dialogs'
      }
    } else
      return (
        <div className="dialogs">
          <div className="h-75 d-flex justify-content-center">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <h3>Dialog not found!!!</h3>
              <Link to={'/dialogs'} className="btn btn-primary text-center">
                Go to Dialogs
              </Link>
            </div>
          </div>
        </div>
      )
  }
  if (!you)
    you = getUserByID(
      users,
      selectDialog.between.find((i) => i !== user.uid)
    )

  return (
    <div className="dialogs">
      <div className="dialogs__container">
        <HeaderDialog
          name={you.displayName}
          id={you.uid}
          avatar={you.photoURL}
          lastSeen={you.lastOnlineDate}
        />
        <div className="dialog">
          <div className="overflow">
            {selectDialog.lastMessage ? (
              <Dialog dialog={selectDialog} me={me} you={you} />
            ) : (
              ''
            )}
          </div>
        </div>
        <SenderContainer
          dialog={selectDialog}
          onCreateDialog={createDialog}
          onAddMessage={addMessage}
          uploadImage={uploadImage}
          uid={user.uid}
          youId={you.uid}
        />
      </div>
    </div>
  )
}

export default DialogIndex

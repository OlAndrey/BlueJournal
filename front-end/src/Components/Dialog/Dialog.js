import React, { memo, useContext, useEffect, useMemo, useRef } from 'react'

import Item from './Item/DialogItem'
import Title from './Title/DialogTitle'

import { normalizeDialog } from './helpers'

import './styles.css'
import { deleteMessage, updateMessageStatus } from '../../API/dialogAPI'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '../../index'
import PreLoader from '../PreLoader/PreLoader'

const Dialog = ({ dialog, me, you, setDataModal }) => {
  const dialogRef = useRef(false)
  const messageLength = useRef(0)
  const { firestore } = useContext(Context)
  const [messages, loading] = useCollectionData(
    firestore.collection(dialog.path + '/message').orderBy('id')
  )

  messageLength.current = messages ? messages.length : 0

  const scrollHandler = () => {
    if (messages) {
      let links = document.querySelectorAll('.unreaded')
      try {
        var wt = document.querySelector('.overflow').scrollTop
        var wh = document.querySelector('.overflow').offsetHeight
      } catch {
        console.error("Don't find dialog block")
      }
      for (let i = 0; i < links.length; i++) {
        var eh = links[i].offsetHeight
        var et = links[i].offsetTop
        if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
          const id = links[i].dataset.target
          for (let j = 0; j < messages.length; j++) {
            if (String(messages[j].id) === id) {
              updateMessageStatus(messages[j].path)
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    const overflow = document.querySelector('.overflow')
    overflow.removeEventListener('scroll', scrollHandler)
    overflow.scrollTop = overflow.scrollHeight
    overflow.addEventListener('scroll', scrollHandler)
    scrollHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageLength.current])

  const normalizedDialog = normalizeDialog(messages, me.uid)

  const dialogValue = useMemo(() => {
    try {
      if (!dialogRef.current) {
        dialogRef.current = normalizedDialog
        return normalizedDialog
      }

      const dialogLength = dialogRef.current.length - 1
      const normalizedLength = normalizedDialog.length
      if (
        dialogRef.current.length === normalizedLength + 2 ||
        (dialogRef.current.length === normalizedLength + 1 &&
          !normalizedDialog[normalizedLength - 1].isReverse)
      ) {
        const newLastMessages = dialogRef.current[dialogLength].messages.map(
          (item) => {
            return { ...item, status: 'readed' }
          }
        )
        return dialogRef.current.slice(0, dialogLength).concat({
          ...dialogRef.current[dialogLength],
          messages: newLastMessages
        })
      }

      dialogRef.current = normalizedDialog
      return normalizedDialog
    } catch (error) {
      console.error(error)
      return { error: 'Something went wrong!' }
    }
  }, [normalizedDialog])

  if (loading) return <PreLoader />
  
  return (
    <>
      {Array.isArray(dialogValue) ? (
        dialogValue.map((item) =>
          item.type === 'message' ? (
            <Item
              {...item}
              me={me}
              you={you}
              key={item.id}
              onDeleteMessage={deleteMessage}
              unreadedMessages={dialog.unreadedMessages}
              setDataModal={setDataModal}
            />
          ) : (
            <Title key={item.id} date={item.date} type={item.type} />
          )
        )
      ) : (
        <div className="h-75 d-flex justify-content-center">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3>{dialogValue.error}</h3>
            <p>Please reload the page.</p>
          </div>
        </div>
      )}
    </>
  )
}

const DialogContainer = memo(Dialog)
export default DialogContainer

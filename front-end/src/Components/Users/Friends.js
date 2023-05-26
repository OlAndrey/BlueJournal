import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '../../index'
import PreLoader from '../PreLoader/PreLoader'
import { getUserByID } from '../../utils/getter'
import { Follow, unFollow } from '../../API/userApi'
import User from './User/User'
import './Users.css'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'

const Friends = (props) => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [users] = useCollectionData(firestore.collection('users'))
  const [messages, loading] = useCollectionData(firestore.collection('dialogs'))
  const [relultUsers, setRelultUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersCount, setUsersCount] = useState(-1)
  const [pageSize, portionSize] = [5, 3]
  let me = null
  if (users && !me) me = getUserByID(users, user.uid)

  useEffect(() => {
    if (me)
      setRelultUsers(
        users.filter(
          (val) =>
            val.uid !== user.uid &&
            val.Follow.includes(user.uid) &&
            me.Follow.includes(val.uid)
        )
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, me])

  if (loading || !me) return <PreLoader />

  if (users && usersCount < 0) setUsersCount(relultUsers.length)

  const FollowChange = (id) => {
    Follow(me.path, me.Follow, id)
  }

  const unFollowChange = (id) => {
    unFollow(me.path, me.Follow, id)
  }

  const onPageChanged = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={props.forDialog ? 'div' : 'users'}>
      {props.forDialog || <h2 className="text-center">Friends</h2>}
      {relultUsers.length ? (
        relultUsers
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((item, i) => (
            <User
              key={i}
              {...item}
              isFriend={true}
              Follow={FollowChange}
              dialogId={
                messages.filter(
                  (dialog) =>
                    dialog.between.includes(user.uid) &&
                    dialog.between.includes(item.uid)
                )[0]
              }
              unFollow={unFollowChange}
            />
          ))
      ) : (
        <div className="h-75 d-flex justify-content-center">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3>You don't have friends</h3>
            <Link to={'../users'} className="btn btn-primary text-center">
              Find Friends
            </Link>
          </div>
        </div>
      )}
      {relultUsers.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalItemCount={usersCount}
          pageSize={pageSize}
          portionSize={portionSize}
          onPageChanged={onPageChanged}
        />
      )}
    </div>
  )
}

export default Friends

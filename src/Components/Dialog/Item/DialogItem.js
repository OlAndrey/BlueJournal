import React from 'react'
import dayjs from 'dayjs'

import './styles.css'
import { Link } from 'react-router-dom'
import { avatarURL } from '../../../images/imagesURL'
import Icon from '../Icon'

const ImageList = ({ title, list, openModel }) => {
  return (
    <div className={`media-list-row-${list.length >= 3 ? 3 : list.length}`}>
      {list.map((item, i) => (
        <div key={i} className="media-list-item">
          {
            item.type.includes('video')
            ?<video width='100%' height='auto' controls>
              <source src={item.src}/>
               Your browser does not support the video tag.
            </video>
            :<img 
              src={item.src} 
              alt={title}
              onClick={() => openModel({show: true, mediaFiles: list, title, selectMedia: i})} 
            />
          }
          
        </div>
      ))}
    </div>
  )
}

const Item = ({
  isReverse,
  me,
  you,
  messages,
  onDeleteMessage,
  unreadedMessages,
  setDataModal
}) => {
  return (
    <div className={isReverse ? 'item reverse removable' : 'item'}>
      <Link to={isReverse ? '/profile' : '/profile/' + you.uid}>
        <img
          src={
            isReverse ? (me.photoURL ? me.photoURL : avatarURL) : you.photoURL
          }
          className="avatar"
          alt="Avatar"
        />
      </Link>

      <div className="list">
        {messages.map((item) => (
          <div className="list-item" key={item.id}>
            {item.isDeleted ? (
              <div className="text text-deleted"
              >{item.text}</div>
            ) : (
              item.audioSrc
              ?<audio 
                controls
                className={item.status === 'sended' && !isReverse ?'unreaded' :''} 
                preload="metadata" 
                data-target={item.id}
              >
                <source src={item.audioSrc} />
                Your browser does not support the audio element.
              </audio>
              :<div
                className={
                  item.status === 'sended' && !isReverse
                    ? 'text unreaded'
                    : 'text'
                }
                data-target={item.id}
              >
                {item.text}
                {item.src 
                  ? <ImageList list={item.src} title={item.text} openModel={setDataModal} /> 
                  : ''
                }
              </div>
            )}
            <div className="time">{dayjs(item.date).format('HH:mm')}</div>
            {!item.isDeleted && (
              <Icon
                size={15}
                className="message-status"
                name={
                  item.status === 'sended' ? 'MessageSended' : 'MessageReaded'
                }
              />
            )}
            {isReverse && !item.isDeleted && (
              <div
                onClick={() => onDeleteMessage(item.path, unreadedMessages - 1)}
              >
                <Icon
                  size={16}
                  className="remove-message"
                  name="MessageDelete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Item

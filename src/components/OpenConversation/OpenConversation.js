import React, { useState, useCallback } from 'react'
import './OpenConversation.sass'
import { IoSend } from 'react-icons/io5'
import { useConversations } from '../../contexts/ConversationsProvider'
import { TiThMenu } from 'react-icons/ti'

const OpenConversation = ({ recipients }) => {
  const [text, setText] = useState('')
  const setRef = useCallback((node) => {
    //when message renders it will trigger scrollIntoView
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    sendMessage(
      recipients.map((recipient) => recipient.id),
      text
    )
    setText('')
  }

  return (
    <div className='conversation-content'>
      <div className='conversation-header'>
        <button
          className='toggle-menu'
          onClick={() => document.body.classList.remove('menu-hidden')}
          style={{ color: '#fff' }}
        >
          <TiThMenu />
        </button>
        <h2>{recipients.map((recipient) => recipient.name).join(', ')}</h2>
      </div>
      <div className='conversation-messages'>
        <div className='content'>
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index
            return (
              //if this is a last sent message of conversation it will trigger useCallback
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className='message'
                style={
                  message.fromMe
                    ? {
                        alignSelf: 'flex-end',
                        background: '#46e5cf',
                        color: '#101c22',
                      }
                    : {}
                }
              >
                <div
                  style={
                    message.fromMe
                      ? {
                          textAlign: 'right',
                          color: '#760db7',
                        }
                      : { color: '#00bfa5' }
                  }
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
                <div>{message.text}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='conversation-send-message'>
        <form onSubmit={handleSubmit} className='form-send-message'>
          <div className='form-send-message-group'>
            <textarea
              required
              value={text}
              onChange={handleChange}
              placeholder='Type a message...'
            />
            <button type='submit' className='btn btn-send-message'>
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OpenConversation

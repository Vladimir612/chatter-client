import React from 'react'
import './Conversations.sass'
import { useConversations } from './../../contexts/ConversationsProvider'

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations()

  function handleClick(index) {
    selectConversationIndex(index)
    document.body.classList.add('menu-hidden')
  }

  return (
    <div className='conversations-container'>
      <ul className='conversations-list'>
        {conversations.map((conversation, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={conversation.selected ? 'conversation-selected' : null}
          >
            {conversation.recipients.map((r) => r.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Conversations

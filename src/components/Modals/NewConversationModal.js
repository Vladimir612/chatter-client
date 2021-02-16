import React, { useState } from 'react'
import './Modal.sass'
import { useContacts } from '../../contexts/ContactsProvider'
import { useConversations } from '../../contexts/ConversationsProvider'

const NewConversationModal = ({ close }) => {
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const [selectedContactIds, setSelectedContactIds] = useState([]) //we need this so we know who will be in conversation except us and to change values of checkboxes

  const handleCheckChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return prevId !== contactId
        }) // case when we uncheck
      } else {
        return [...prevSelectedContactIds, contactId]
      } // case when we check
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createConversation(selectedContactIds)
    close()
  }
  return (
    <div className='modal-container'>
      <p style={{ color: '#000', paddingLeft: '1rem' }}>New Conversation</p>
      <span className='close-modal' onClick={close}>
        x
      </span>
      <div className='modal-form-container'>
        <form onSubmit={handleSubmit} className='modal-form conversations-form'>
          {contacts.map((contact) => (
            // <h6 key={contact.id}>{contact.name}</h6>
            <div
              key={contact.id}
              className='form-group conversations-form-group'
            >
              <div className='form-check'>
                <input
                  type='checkbox'
                  id={contact.id}
                  checked={selectedContactIds.includes(contact.id)}
                  className='form-check-input'
                  onChange={() => handleCheckChange(contact.id)}
                />
                <label htmlFor={contact.id} className='form-check-label'>
                  {contact.name}
                </label>
              </div>
            </div>
          ))}
          <button
            type='submit'
            className='btn submit-modal conversation-submit'
          >
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewConversationModal

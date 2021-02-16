import React, { useState } from 'react'
import './Sidebar.sass'
import Conversations from './../Conversations/Conversations'
import Contacts from './../Contacts/Contacts'
import NewConversationModal from '../Modals/NewConversationModal'
import NewContactModal from '../Modals/NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY) //initially conversation tab will be open

  const [modalOpen, setModalOpen] = useState(false)

  //im adding class to body when modal is open so i can disable all pointer events in that case
  const closeModal = () => {
    document.body.classList.remove('modal-open')
    setModalOpen(false)
  }

  const openModal = () => {
    document.body.classList.add('modal-open')
    setModalOpen(true)
  }

  //this is for button new Conversation/Contact
  const conversationsOpen = activeKey === CONVERSATIONS_KEY ? true : false
  return (
    <>
      <div className='sidebar'>
        <div className='nav nav-tabs'>
          <div
            className={
              activeKey === CONVERSATIONS_KEY ? 'nav-item active' : 'nav-item'
            }
            onClick={() => setActiveKey(CONVERSATIONS_KEY)}
          >
            <p>Conversations</p>
          </div>
          <div
            className={
              activeKey === CONTACTS_KEY ? 'nav-item active' : 'nav-item'
            }
            onClick={() => setActiveKey(CONTACTS_KEY)}
          >
            <p>Contacts</p>
          </div>
        </div>
        <div className='tab-content'>
          {activeKey === CONVERSATIONS_KEY ? <Conversations /> : <Contacts />}
          <button onClick={openModal} className='btn btn-primary'>
            New {conversationsOpen ? 'Conversation' : 'Contact'}
          </button>
        </div>

        <div className='your-id'>
          Your id: <span>{id}</span>
        </div>
      </div>
      {modalOpen ? (
        conversationsOpen ? (
          <NewConversationModal close={closeModal} />
        ) : (
          <NewContactModal close={closeModal} />
        )
      ) : null}
    </>
  )
}

export default Sidebar

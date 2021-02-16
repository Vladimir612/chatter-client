import React from 'react'
import './Dashboard.sass'
import OpenConversation from '../OpenConversation/OpenConversation'
import Sidebar from '../Sidebar/Sidebar'
import { useConversations } from './../../contexts/ConversationsProvider'

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversations()

  return (
    <div className='dashboard'>
      <Sidebar id={id} />
      {selectedConversation && (
        <OpenConversation recipients={selectedConversation.recipients} />
      )}
    </div>
  )
}

export default Dashboard

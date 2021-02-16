import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from './../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export const useConversations = () => {
  return useContext(ConversationsContext)
} //thanks to this function which ever component calls it it will have data from ConversationsContext

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []) //initial value is empty array

  const [selectedConversationIndex, setSelectedConversationIndex] = useState()

  const { contacts } = useContacts() //line 24 - explanation

  const socket = useSocket()

  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }] //adding new conversation to current conversations
    })
  }

  //this has to work in 2 scenarios (when you send a message, and when someone send you the message)
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false
        const newMessage = { sender, text }

        const newConversations = prevConversations.map((conversation) => {
          //we are checking if our new recipients are matching some of the old recipients
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true
            return {
              ...conversation, //all conversations stay there
              //all messages from current conversation stay there
              messages: [...conversation.messages, newMessage], //adding new message to the conversation
            }
          }

          return conversation
        })

        if (madeChange) {
          //if we haven't made change that means we started new conversation
          return newConversations
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }]
        }
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message') //removing the event listener so we don't have multiples of them
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    //from each conversation we will get certain recipients
    const recipients = conversation.recipients.map((recipient) => {
      //we will have only id-s from recipients so we need contacts to have their names
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })

      const name = (contact && contact.name) || recipient //if we don't have their name, name will be his id

      return { id: recipient, name }
    })

    //formatting messages so it displays their name from our contacts or id if we don't have it and fromMe will be true if it's from us
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex

    return { ...conversation, messages, recipients, selected }
  })

  const value = {
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    conversations: formattedConversations,
    createConversation,
    sendMessage,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}

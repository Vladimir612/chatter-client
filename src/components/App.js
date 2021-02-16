import React from 'react'
import './GlobalStyles.sass'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import useLocalStorage from './../hooks/useLocalStorage'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  //wrapping Dashboard component in contacts and conversations provider
  const dashboard = (
    <SocketProvider id={id}>
      {/*Connection to socket.io */}

      <ContactsProvider>
        {/* conversation must have id from us who send the message */}

        <ConversationsProvider id={id}>
          {/*You have to know what is your id*/}

          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return id ? dashboard : <Login onIdSubmit={setId} />
}

export default App

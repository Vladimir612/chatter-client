import React from 'react'
import './Contacts.sass'
import { useContacts } from './../../contexts/ContactsProvider'

const Contacts = () => {
  const { contacts } = useContacts()

  return (
    <div className='contacts-container'>
      <ul className='contacts-list'>
        {contacts.map((contact) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Contacts

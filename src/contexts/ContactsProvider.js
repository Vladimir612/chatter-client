import React, { useContext } from 'react'
import useLocalStorage from './../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export const useContacts = () => {
  return useContext(ContactsContext)
} //thanks to this function which ever component calls it it will have data from ContactsProvider

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []) //initial value is empty array

  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }] //adding new contact to current contacts
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

import React, { useRef } from 'react'
import './Modal.sass'
import { useContacts } from './../../contexts/ContactsProvider'

const NewContactModal = ({ close }) => {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  const handleSubmit = (e) => {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value) //writing contact in local storage using ContactsContext
    close()
  }
  return (
    <div className='modal-container'>
      <p style={{ color: '#000', paddingLeft: '1rem' }}>New Contact</p>
      <span className='close-modal' onClick={close}>
        x
      </span>
      <div className='modal-form-container'>
        <form onSubmit={handleSubmit} className='modal-form'>
          <div className='modal-form-group'>
            <label className='modal-form-label'>Enter ID</label>
            <input
              type='text'
              ref={idRef}
              required
              className='modal-form-control'
            />
          </div>
          <div className='modal-form-group'>
            <label className='modal-form-label'>Enter Name</label>
            <input
              type='text'
              ref={nameRef}
              required
              className='modal-form-control'
            />
          </div>
          <button type='submit' className='btn submit-modal'>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewContactModal

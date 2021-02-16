import React, { useRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import './Login.sass'

const Login = ({ onIdSubmit }) => {
  const idRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  const createNewId = () => {
    onIdSubmit(uuidV4()) //random uid generated from library
  }

  return (
    <div className='container login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
          <label className='form-label'>Enter Your ID</label>
          <input type='text' ref={idRef} required className='form-control' />
        </div>
        <button type='submit' className='btn form-submit'>
          Login
        </button>
        <button
          type='button'
          onClick={createNewId}
          className='btn new-id-button'
        >
          Create A New Id
        </button>
      </form>
    </div>
  )
}

export default Login

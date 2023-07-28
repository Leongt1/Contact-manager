import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function DeleteContact() {

  const location = useLocation();
  const {name, email} = location.state.contact

  return (
    <div className='main'>
      <div className='ui card centered'>
        <div className='header'>
          <h2>Are you Sure you want to delete the contact?</h2>
        </div>
        <div className='content'>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
        <div className='ui centered'>
          <Link to='/'>
            <button className='ui button gray centered'>NO</button>
          </Link>
          <Link to=''>
          <button className='ui button red centered'>YES</button>
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default DeleteContact
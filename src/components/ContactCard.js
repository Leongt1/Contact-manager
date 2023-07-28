import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

function ContactCard(props) {
  const {name, email, id} = props.contact
  return (
    <div className='item'>
      <img className='ui avatar image' src={user} alt='user' />
      <div className='content'> 
        <Link 
          to={`/contact/${id}`}
          state={{contact: props.contact}} //data to pass
        >
          <div className='header'>{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      {/* <Link 
        to={`contact/delete/${id}`}
        state={{contact: props.contact}}
      > */}
      <i 
        className='trash alternate outline icon' 
        style={{color: 'red', marginTop: '7px', marginLeft:'10px'}}  
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link 
          to={`/edit`}
          state={{contact: props.contact}} //data to pass
        >
        <i 
          className='edit alternate outline icon' 
          style={{color: 'blue', marginTop: '7px'}}  
        ></i>
      </Link>
      {/* </Link> */}
    </div>
  )
}

export default ContactCard
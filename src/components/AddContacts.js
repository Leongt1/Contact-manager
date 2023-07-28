import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'

function AddContacts(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const add = (e) => {
    e.preventDefault()
    if(name === '' || email === '') {
      alert('All fields are required')
      return
    }
    props.addContactHandler({name, email})
    setName('')
    setEmail('')
    // this.setState({name: '', email: ''})
    // console.log(this.props)
    navigate('/')
  }

    return (
      <div className='ui main'>
        <h2>
          Add Contact
          <Link to={'/'}>
            <button className='ui button blue right'>Contact List</button>
          </Link>
        </h2>
        <form className='ui form' onSubmit={e => add(e)}>
          <div className='field'>
            <label>Name</label>
            <input 
              type='text' 
              name='name' 
              placeholder='Name' 
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </div>
          <div className='field'>
            <label>Email</label>
            <input type='email' 
              name='email' 
              placeholder='Email' 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
           <button className='ui button blue'>Add</button>
        </form>
      </div>
    )
}

export default AddContacts
import React, {useState} from 'react'
import { Link, useLocation, useNavigate  } from 'react-router-dom'

function EditContact(props) {

  const navigate = useNavigate()
  const location = useLocation()

  const oldDetails = location.state.contact

  console.log(oldDetails)
  const [id, setId] = useState(oldDetails.id)
  const [name, setName] = useState(oldDetails.name)
  const [email, setEmail] = useState(oldDetails.email)

  const update = (e) => {
    e.preventDefault()
    if(name === '' || email === '') {
      alert('All fields are required')
      return
    }
    props.updateContactHandler({id, name, email})
    setName('')
    setEmail('')
    // this.setState({name: '', email: ''})
    // console.log(this.props)
    navigate('/')
  }

    return (
      <div className='ui main'>
        <h2>
          Edit Contact
          <Link to={'/'}>
            <button className='ui button blue right'>Contact List</button>
          </Link>
        </h2>
        <form className='ui form' onSubmit={e => update(e)}>
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
           <button className='ui button blue'>Update</button>
        </form>
      </div>
    )
}

export default EditContact
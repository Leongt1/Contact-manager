import React, { Component } from 'react'
import { Link, useNavigate  } from 'react-router-dom'

class AddContacts extends Component {
  state = {
    name: '',
    email: ''
  }

  add = (e) => {
    e.preventDefault()
    if(this.state.name === '' || this.state.email === '') {
      alert('All fields are required')
      return
    }
    this.props.addContactHandler(this.state)
    this.setState({name: '', email: ''})
    // console.log(this.props)
    // navigate('/')
  }

  render() {
    return (
      <div className='ui main'>
        <h2>
          Add Contact
          <Link to={'/'}>
            <button className='ui button blue right'>Contact List</button>
          </Link>
        </h2>
        <form className='ui form' onSubmit={this.add}>
          <div className='field'>
            <label>Name</label>
            <input 
              type='text' 
              name='name' 
              placeholder='Name' 
              value={this.state.name}
              onChange={(e) => {this.setState({name: e.target.value})}}
            />
          </div>
          <div className='field'>
            <label>Email</label>
            <input type='email' 
              name='email' 
              placeholder='Email' 
              value={this.state.email}
              onChange={(e) => {this.setState({email: e.target.value})}}
            />
          </div>
           <button className='ui button blue'>Add</button>
        </form>
      </div>
    )
  }
}

export default AddContacts
import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

class ShowContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [ {} ],
      jwt: this.props.location.state.jwt
    }
    this.postAndFetchData('contacts')
  }

  postAndFetchData = (path) => {
    fetch('http://localhost:3000/' + path , {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then((response) => {
      return response.text()
    })
    .then((data) => {
      let parsed = JSON.parse(data)
      this.setState({result: parsed.contacts})
    })
    .catch(() => {
      console.log('didnt post')
    })
  }

  mapContacts = () => {
    return this.state.result.map((contact) => 
      <div>
        <li>Full Name: {contact.name}</li>
        <li>Phone Number: {contact.number}</li>
        <li>Email Address: {contact.email}</li>
        <li></li>
      </div>
    )
  }

  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Contacts</h1>
        <div style={styling.outerDiv}>
          <div>
          </div>
          <div>
            <ul>{this.mapContacts()}</ul>
            <Link to={{
              pathname: '/users/dashboard',
              state: { jwt: this.state.jwt }
            }}><Button style={styling.buttons}>Dashboard</Button></Link>
          </div>
        </div>
      </div>
    )
  }
}

const styling = {
  formDiv: {
    width: '50%',
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8%'
  },
  buttons: {
    justifyContent: 'center',
    margin: '8%'


  }
}

export default ShowContact;
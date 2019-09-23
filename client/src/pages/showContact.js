import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'
import allcontacts from './images/contacts.png'
import dashbutton from './images/dashboard.png'


console.log(allcontacts);
console.log(dashbutton);

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
    fetch('http://localhost:5000/' + path , {
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
        <li>Email Address: {contact.email}</li><br>
        </br>
        <li></li>
      </div>
    )
  }

  render() {
    return(
      <div >
        <div> <img src={allcontacts} width = "700"/> </div>
        <div style={styling.outerDiv}>
          <div>
          </div>
          <div>
            <ul>{this.mapContacts()}</ul>
            <Link to={{
              pathname: '/users/dashboard',
              state: { jwt: this.state.jwt }
            }}> <img src={dashbutton} width = "200"/> </Link>
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

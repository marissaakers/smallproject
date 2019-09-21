import React, { Component } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap/'
import { Button } from 'react-bootstrap/'
import { Link, Redirect } from 'react-router-dom'

class AddContactConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.location.state.name,
      jwt: this.props.location.state.jwt,
      redirect: false,
      showName: false
    }
    console.log(this.state.name)
  }
  
  render() {
    return(
      <div >
        <h1 style={{margin: '5%'}}>Add Contact</h1>
        <div styling={styling.para}>
          <p>{this.state.name + ' created...'}</p>
        </div>
        <div style={styling.outerDiv}>
          <Link to={{
                pathname: '/contacts/create-contact',
                state: { jwt: this.state.jwt }
          }}><Button style={styling.addcontact}>Add Contact</Button></Link>
          <Link to={{
                pathname: '/users/dashboard',
                state: { jwt: this.state.jwt }
          }}><Button style={styling.dash}>Dashboard</Button></Link>
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
  dash: {
    justifyContent: 'center',
    margin: '15%'
  },
  para: {
    justifyContent: 'center',
    margin: '8%'
  },
  addcontact: {
    justifyContent: 'center',
    margin: '15%'
  }
}

export default AddContactConfirmation;
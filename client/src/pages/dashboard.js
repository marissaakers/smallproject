import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state)
    this.state = {
      jwt: this.props.location.state.jwt
    }
    console.log(this.state.jwt)
  }
  render() {
    return(
      <div style={styling.mainDiv} >
      <h1 style={{margin: '5%'}} >Dashboard</h1>
      <div style={styling.buttonDiv}>
        <Link to={{
          pathname: '/contacts',
          state: { jwt: this.state.jwt }
        }}><Button style={styling.cont}>Contacts</Button></Link> 

        <Link to={{
          pathname: '/contacts/create-contact',
          state: { jwt: this.state.jwt }
        }}><Button style={styling.add}>Add Contact</Button></Link>

        <Link to={{
          pathname: '/contacts/search',
          state: { jwt: this.state.jwt }
        }}><Button style={styling.sea}>Search</Button></Link>
      </div>
    </div>
    )
  }
}

const styling = {
  mainDiv: {
    textAlign: 'center'
  },
  add: {
    marginLeft: '50%',
    padding: '20%'
  },
  cont: {
    marginRight: '50%',
    padding: '20%'
  },
  sea: {
    marginLeft: '130%',
    padding: '20%'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    // border: '1px solid black'
  }
}

export default Dashboard;
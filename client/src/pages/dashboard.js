import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state)
    this.state = {
      jwt: this.props.jwt
    }
    //console.log(this.state.jwt)
  }
  render() {
    return(
      <div style={styling.mainDiv} >
      <h1 style={{margin: '5%'}} >Dashboard</h1>
      <div style={styling.buttonDiv}>
        <Link to="/contacts"><Button style={styling.signup}>Contacts</Button></Link> 
        <Link to='/contacts/create-contact'><Button style={styling.buttons}>Add Contact</Button></Link>
        <Link to='/contacts/search'><Button style={styling.buttons}>Search</Button></Link>
        <p>{this.state.jwt}</p>
      </div>
    </div>
    )
  }
}

const styling = {
  mainDiv: {
    textAlign: 'center'
  },
  buttons: {
    margin: '25%',
    padding: '40%'
  },
  signup: {
    
    marginRight: '30%'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    // border: '1px solid black'
  }
}

export default Dashboard;
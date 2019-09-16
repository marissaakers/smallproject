import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >
      <h1 style={{margin: '5%'}} >Dashboard</h1>
      <div style={styling.buttonDiv}>
        <Link to="/users/signup"><Button style={styling.signup}>Sign Up</Button></Link> 
        <Link to='/users/login'><Button style={styling.buttons}>Login</Button></Link>
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
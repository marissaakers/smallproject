import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >
        <h1>RYBAMA</h1>
        <Button style={styling.buttons} >Sign Up</Button>
        <Button>Login</Button>
      </div>
    )
  }
}

const styling = {
  mainDiv: {
    textAlign: 'center'
  },
  buttons: {
    margin: '50px'
  }
}

export default Landing;
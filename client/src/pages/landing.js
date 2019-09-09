import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >
        <h1 style={{margin: '5%'}} >RYBAMA</h1>
        <div style={styling.buttonDiv}>
          <Button  style={styling.buttons}>Sign Up</Button>
          <Button style={styling.buttons} >Login</Button>
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
    margin: '13%'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    
  }
}

export default Landing;
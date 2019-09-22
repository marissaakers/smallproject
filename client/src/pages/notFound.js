import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >
      <h1 style={{margin: '5%'}} >404 - Not Found</h1>
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

export default NotFound;
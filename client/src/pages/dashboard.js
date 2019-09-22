import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import plus from './images/addround.png'
import showcontacts from './images/list.png'
import magnifier from './images/search.png'
import logo from './images/rybamatransparent.png'

console.log(plus);
console.log(showcontacts);
console.log(magnifier);
console.log(logo);


class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state)
    this.state = {
      jwt: this.props.location.state.jwt
    }
  }
  render() {
    return(
      <div style={styling.mainDiv} >
      <div> <img src={logo} width = "800"/> </div>
      <div style={styling.buttonDiv}>
        <Link to={{
          pathname: '/contacts',
          state: { jwt: this.state.jwt }
        }}><input type="image" src={showcontacts} width = "400"/></Link>

        <Link to={{
          pathname: '/contacts/create-contact',
          state: { jwt: this.state.jwt }
        }}><input type="image" src={plus} width = "400"/></Link>

        <Link to={{
          pathname: '/contacts/search',
          state: { jwt: this.state.jwt }
        }}><input type="image" src={magnifier} width = "400"/></Link>
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

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import logo from './images/rybamatransparent.png'; // Tell Webpack this JS file uses this image
import signuplogo from './images/signupdim.png';
import loginlogo from './images/logindim.png';
import signuplit from './images/signup_lit.png'
import loginlit from './images/loginlit.png'

console.log(logo);
console.log(loginlogo);
console.log(signuplogo);
console.log(signuplit);
console.log(loginlit);

class Landing extends Component {
  render() {
    return(
      <div style={styling.mainDiv} >

      <div> <img src={logo} width = "800"/> </div>

      <div style={styling.buttonDiv}>
        <Link to="/users/signup"><input type="image" src={signuplogo} width = "700"/></Link>
        <Link to="/users/login"><input type="image" src={loginlogo} width = "700"/></Link>
      </div>
    </div>
    )
  }
}

const styling = {
  mainDiv: {
    background: '#0f0524',
    textAlign: 'center'
  },
  buttons: {


  },
  signup: {

    marginRight: '30%'
  },
  buttonDiv: {


    justifyContent: 'center',

  }
}

export default Landing;
